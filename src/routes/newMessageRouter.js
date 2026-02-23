import { Router } from 'express'
import { messages } from '../db.js';

import { body, validationResult, matchedData } from 'express-validator';

const newMessageRouter = Router()

// const alphaErr = "must only contain letters.";
const messageUserMaxLength = 15;
const messageTextMaxLength = 80;
const userLengthErr = `must be between 1 and ${messageUserMaxLength} characters.`;
const textLengthErr = `must be between 1 and ${messageTextMaxLength} characters.`;

const validateUser = [
  body("messageUser").trim()
    .isLength({ min: 1, max: messageUserMaxLength }).withMessage(`Message user ${userLengthErr}`),
  body("messageText").trim()
    .isLength({ min: 1, max: messageTextMaxLength }).withMessage(`Message text ${textLengthErr}`),
];

newMessageRouter.get('/', (req, res) => {
  res.render("form", {
    values: {},
    errors: {}
  });
});

newMessageRouter.post('/', validateUser, (req, res) => {
  const errors = validationResult(req);
  const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
  const { messageText, messageUser } = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      values: { messageText, messageUser },
      errors: errorObj,
    });
  }
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/')
})

export default newMessageRouter