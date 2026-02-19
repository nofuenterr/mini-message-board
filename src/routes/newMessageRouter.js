import { Router } from 'express'
import { messages } from '../db.js';

const newMessageRouter = Router()

newMessageRouter.get('/', (req, res) => {
  res.render("form");
})
newMessageRouter.post('/', (req, res) => {
  const messageText = req.body.messageText
  const messageUser = req.body.messageUser

  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/')
})

export default newMessageRouter