import { messages } from '../db.js';

export async function getMessage(req, res) {
  const { index } = req.params

  if (!messages[index]) {
    throw new CustomNotFoundError('Message not found')
  }

  res.render("message", { message: messages[index] });
};
