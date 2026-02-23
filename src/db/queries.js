import pool from "./pool.js";

export async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [id]);
  return rows;  
}

export async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;  
}

export async function insertMessage({ author, text }) {
  await pool.query("INSERT INTO messages (author, text) VALUES ($1, $2)", [author, text]);
}
