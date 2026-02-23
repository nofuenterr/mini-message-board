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
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT || 5432}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();