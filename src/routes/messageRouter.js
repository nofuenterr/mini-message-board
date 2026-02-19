import { Router } from 'express'
import { messages } from '../db.js';

const messageRouter = Router()

messageRouter.get("/:index", (req, res) => {
  const { index } = req.params
  res.render("message", { message: messages[index] });
});

export default messageRouter