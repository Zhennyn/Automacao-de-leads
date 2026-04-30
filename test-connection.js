const { Client } = require('pg')

// Try different connection formats
const formats = [
  'postgresql://postgres:Matheus1610@db.jitciokolmuhmsrshdhv.supabase.co:5432/postgres',
  'postgresql://postgres:Matheus1610@jitciokolmuhmsrshdhv.supabase.co:5432/postgres',
  'postgres://postgres:Matheus1610@db.jitciokolmuhmsrshdhv.supabase.co:5432/postgres',
]

async function test() {
  for (const connStr of formats) {
    console.log('Trying:', connStr.replace(/:[^:@]+@/, ':***@'))
    try {
      const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } })
      await client.connect()
      console.log('SUCCESS with format!')
      await client.end()
      return connStr
    } catch (err) {
      console.log('Failed:', err.message)
    }
  }
  console.log('All formats failed')
}

test()
