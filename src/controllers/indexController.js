import { getAllMessages } from "../db/queries.js";

export async function getMessages(req, res) {
  const messages = await getAllMessages();

  if (!messages) {
    throw new CustomNotFoundError('Messages not found')
  }

  res.render("index", { title: "Mini Messageboard", messages: messages });
};
