import { messages } from '../db.js';

export async function getMessages(req, res) {
  if (!messages) {
    throw new CustomNotFoundError('Messages not found')
  }

  res.render("index", { title: "Mini Messageboard", messages: messages });
};
