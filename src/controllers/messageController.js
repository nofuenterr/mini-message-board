import { getMessageById } from '../db/queries.js';

export async function getMessage(req, res) {
  const { id } = req.params
  const [message] = await getMessageById(id)

  if (!message) {
    throw new CustomNotFoundError('Message not found')
  }

  res.render("message", { message: message });
};
