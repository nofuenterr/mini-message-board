import { messages } from '../db.js';

export async function getMessages(req, res) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
};
