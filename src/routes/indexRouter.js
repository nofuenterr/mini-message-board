import { Router } from 'express'
import { messages } from '../db.js';

const indexRouter = Router()

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

export default indexRouter