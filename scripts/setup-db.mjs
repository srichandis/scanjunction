// Run: node scripts/setup-db.mjs

import fs from "fs";
import { neon } from "@neondatabase/serverless";

// Read .env.local manually (no dotenv dependency needed)
const envContent = fs.readFileSync(".env.local", "utf8");
const match = envContent.match(/DATABASE_URL=(.+)/);
const databaseUrl = match ? match[1].trim() : process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL not found in .env.local");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function setup() {
  try {
    console.log("Creating contact_submissions table...");

    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        service TEXT[] DEFAULT '{}',
        quantity INTEGER NOT NULL DEFAULT 0,
        address TEXT NOT NULL,
        message TEXT DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        source VARCHAR(50) DEFAULT 'website'
      );
    `;

    console.log("✅ Table 'contact_submissions' created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create table:", error);
    process.exit(1);
  }
}

setup();
