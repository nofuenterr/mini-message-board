import { messages } from '../db.js';

import { body, validationResult, matchedData } from 'express-validator';

// const alphaErr = "must only contain letters.";
const messageUserMaxLength = 15;
const messageTextMaxLength = 80;
const userLengthErr = `must be between 1 and ${messageUserMaxLength} characters.`;
const textLengthErr = `must be between 1 and ${messageTextMaxLength} characters.`;

function buildErrorObject(errors) {
  const errorObj = {};

  errors.array().forEach((err) => {
    errorObj[err.path] = err.msg;
  });

  return errorObj;
}

export async function getNewMessageForm(req, res) {
  res.render("form", {
    values: {},
    errors: {}
  });
};

export const validateUser = [
  body("messageUser").trim()
    .isLength({ min: 1, max: messageUserMaxLength }).withMessage(`Message user ${userLengthErr}`),
  body("messageText").trim()
    .isLength({ min: 1, max: messageTextMaxLength }).withMessage(`Message text ${textLengthErr}`),
];

export async function createMessage(req, res) {
  const errors = validationResult(req);
  const { messageText, messageUser } = matchedData(req);
  const errorObj = buildErrorObject(errors);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      values: { messageText, messageUser },
      errors: errorObj,
    });
  }

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
}