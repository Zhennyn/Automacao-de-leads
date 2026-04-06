import argparse
import csv
import datetime as dt
import os
import re
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set, Tuple
from urllib.parse import urljoin, urlparse

import requests

try:
    from dotenv import load_dotenv
except ImportError:  # Optional dependency for local runs.
    load_dotenv = None

EMAIL_REGEX = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
DEFAULT_OUTPUT_DIR = Path("output")
GOOGLE_TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
GOOGLE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"


@dataclass
class Lead:
    company_name: str
    category: str
    city_query: str
    address: str
    website: str
    google_maps_url: str
    phone: str
    rating: float
    total_reviews: int
    primary_email: str
    all_emails: str
    score: int
    source: str = "google_places"


def env_int(name: str, default: int) -> int:
    value = os.getenv(name)
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default


def env_float(name: str, default: float) -> float:
    value = os.getenv(name)
    if value is None:
        return default
    try:
        return float(value)
    except ValueError:
        return default


def normalize_list(raw_value: str) -> List[str]:
    return [chunk.strip() for chunk in raw_value.split(",") if chunk.strip()]


def text_search_places(api_key: str, query: str, max_results: int, timeout_s: int) -> List[Dict]:
    places: List[Dict] = []
    page_token: Optional[str] = None

    while len(places) < max_results:
        params = {"query": query, "key": api_key}
        if page_token:
            params["pagetoken"] = page_token

        response = requests.get(GOOGLE_TEXT_SEARCH_URL, params=params, timeout=timeout_s)
        response.raise_for_status()
        payload = response.json()

        status = payload.get("status")
        if status not in {"OK", "ZERO_RESULTS"}:
            # INVALID_REQUEST can happen when next_page_token is not ready yet.
            if status == "INVALID_REQUEST" and page_token:
                time.sleep(2)
                continue
            print(f"[WARN] Query '{query}' returned status: {status}")
            break

        results = payload.get("results", [])
        places.extend(results)

        page_token = payload.get("next_page_token")
        if not page_token:
            break

        # Google requires a short delay before next_page_token becomes valid.
        time.sleep(2)

    return places[:max_results]


def place_details(api_key: str, place_id: str, timeout_s: int) -> Dict:
    params = {
        "place_id": place_id,
        "fields": "website,url,formatted_phone_number",
        "key": api_key,
    }
    response = requests.get(GOOGLE_DETAILS_URL, params=params, timeout=timeout_s)
    response.raise_for_status()
    payload = response.json()
    result = payload.get("result", {})
    return {
        "website": result.get("website", ""),
        "google_maps_url": result.get("url", ""),
        "phone": result.get("formatted_phone_number", ""),
    }


def candidate_contact_urls(website: str) -> List[str]:
    if not website:
        return []

    parsed = urlparse(website)
    base = f"{parsed.scheme}://{parsed.netloc}"
    suffixes = ["", "/contato", "/contact", "/about", "/fale-conosco"]
    return [urljoin(base + "/", suffix.lstrip("/")) for suffix in suffixes]


def scrape_emails_from_url(url: str, timeout_s: int) -> Set[str]:
    try:
        response = requests.get(
            url,
            timeout=timeout_s,
            headers={"User-Agent": "LeadAutomationBot/1.0"},
        )
        response.raise_for_status()
    except requests.RequestException:
        return set()

    emails = set(EMAIL_REGEX.findall(response.text))
    filtered = {email for email in emails if not email.lower().endswith("@example.com")}
    return filtered


def enrich_emails(website: str, timeout_s: int) -> Tuple[str, str]:
    all_emails: Set[str] = set()
    for url in candidate_contact_urls(website):
        all_emails.update(scrape_emails_from_url(url, timeout_s=timeout_s))

    if not all_emails:
        return "", ""

    sorted_emails = sorted(all_emails)
    return sorted_emails[0], ";".join(sorted_emails)


def score_lead(raw_place: Dict, details: Dict, primary_email: str, min_rating: float) -> int:
    score = 0
    rating = float(raw_place.get("rating", 0.0) or 0.0)
    reviews = int(raw_place.get("user_ratings_total", 0) or 0)

    if rating >= max(min_rating, 4.0):
        score += 30
    elif rating >= max(min_rating, 3.5):
        score += 20
    elif rating >= min_rating:
        score += 10

    if reviews >= 100:
        score += 25
    elif reviews >= 30:
        score += 15
    elif reviews > 0:
        score += 5

    if details.get("website"):
        score += 15

    if details.get("phone"):
        score += 10

    if primary_email:
        score += 20

    return score


def build_leads(api_key: str, keywords: Iterable[str], cities: Iterable[str], max_results: int, min_rating: float, timeout_s: int) -> List[Lead]:
    leads: List[Lead] = []
    seen_place_ids: Set[str] = set()

    for keyword in keywords:
        for city in cities:
            query = f"{keyword} in {city}"
            places = text_search_places(api_key, query=query, max_results=max_results, timeout_s=timeout_s)
            print(f"[INFO] Query '{query}' returned {len(places)} candidates")

            for raw_place in places:
                place_id = raw_place.get("place_id")
                if not place_id or place_id in seen_place_ids:
                    continue
                seen_place_ids.add(place_id)

                rating = float(raw_place.get("rating", 0.0) or 0.0)
                if rating < min_rating:
                    continue

                details = place_details(api_key, place_id=place_id, timeout_s=timeout_s)
                primary_email, all_emails = enrich_emails(details.get("website", ""), timeout_s=timeout_s)

                lead = Lead(
                    company_name=raw_place.get("name", ""),
                    category=keyword,
                    city_query=city,
                    address=raw_place.get("formatted_address", ""),
                    website=details.get("website", ""),
                    google_maps_url=details.get("google_maps_url", ""),
                    phone=details.get("phone", ""),
                    rating=rating,
                    total_reviews=int(raw_place.get("user_ratings_total", 0) or 0),
                    primary_email=primary_email,
                    all_emails=all_emails,
                    score=score_lead(raw_place, details, primary_email, min_rating=min_rating),
                )
                leads.append(lead)

    leads.sort(key=lambda item: item.score, reverse=True)
    return leads


def save_leads_csv(leads: List[Lead], output_dir: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    timestamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = output_dir / f"leads_{timestamp}.csv"

    with output_file.open("w", newline="", encoding="utf-8") as fp:
        writer = csv.DictWriter(fp, fieldnames=list(asdict(leads[0]).keys()) if leads else list(Lead.__annotations__.keys()))
        writer.writeheader()
        for lead in leads:
            writer.writerow(asdict(lead))

    return output_file


def send_to_webhook(leads: List[Lead], webhook_url: str, timeout_s: int) -> None:
    for lead in leads:
        payload = asdict(lead)
        try:
            response = requests.post(webhook_url, json=payload, timeout=timeout_s)
            if response.status_code >= 300:
                print(f"[WARN] Webhook failed for {lead.company_name}: {response.status_code}")
        except requests.RequestException as exc:
            print(f"[WARN] Webhook error for {lead.company_name}: {exc}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Lead generation automation using Google Places API")
    parser.add_argument("--keywords", type=str, default=os.getenv("LEAD_KEYWORDS", ""), help="Comma-separated list")
    parser.add_argument("--cities", type=str, default=os.getenv("LEAD_CITIES", ""), help="Comma-separated list")
    parser.add_argument("--max-results", type=int, default=env_int("MAX_RESULTS_PER_QUERY", 40))
    parser.add_argument("--min-rating", type=float, default=env_float("MIN_RATING", 0.0))
    parser.add_argument("--output-dir", type=str, default=str(DEFAULT_OUTPUT_DIR))
    return parser.parse_args()


def main() -> None:
    if load_dotenv:
        load_dotenv()

    args = parse_args()
    api_key = os.getenv("GOOGLE_MAPS_API_KEY", "").strip()
    timeout_s = env_int("REQUEST_TIMEOUT_SECONDS", 12)
    webhook_url = os.getenv("CRM_WEBHOOK_URL", "").strip()

    if not api_key:
        raise SystemExit("GOOGLE_MAPS_API_KEY is required. Configure .env first.")

    keywords = normalize_list(args.keywords)
    cities = normalize_list(args.cities)
    if not keywords or not cities:
        raise SystemExit("You must provide at least one keyword and one city.")

    leads = build_leads(
        api_key=api_key,
        keywords=keywords,
        cities=cities,
        max_results=args.max_results,
        min_rating=args.min_rating,
        timeout_s=timeout_s,
    )

    if not leads:
        print("[INFO] No leads found for the current filters.")
        return

    output_path = save_leads_csv(leads, output_dir=Path(args.output_dir))
    print(f"[INFO] Saved {len(leads)} leads to {output_path}")

    if webhook_url:
        send_to_webhook(leads, webhook_url=webhook_url, timeout_s=timeout_s)
        print(f"[INFO] Sent leads to webhook: {webhook_url}")


if __name__ == "__main__":
    main()
