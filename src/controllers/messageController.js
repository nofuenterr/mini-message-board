import { messages } from '../db.js';

export async function getMessage(req, res) {
  const { index } = req.params
  res.render("message", { message: messages[index] });
};
