#! /usr/bin/env node

import { Client } from "pg";
import 'dotenv/config';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO messages (author, text) 
VALUES
  ('Gehrman', 'I am the World'),
  ('Merlin', 'What''s your wish?'),
  ('Sherlock', 'I''m on the case');
`;

async function main() {
  const dbUrl = process.argv[2];

  let connectionConfig;

  if (dbUrl) {
    connectionConfig = {
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    };
  } else {
    connectionConfig = {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DB_PORT || 5432,
    };
  }

  try {
    console.log("Seeding database...");
    const client = new Client(connectionConfig);
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("✅ Done");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
}

main();