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

const isProduction = process.env.DATABASE_URL;

const connectionConfig = isProduction
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DB_PORT || 5432,
    };

async function main() {
  console.log("seeding...");
  const client = new Client(connectionConfig);
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();