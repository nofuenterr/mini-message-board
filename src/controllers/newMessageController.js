import { body, validationResult, matchedData } from 'express-validator';
import { insertMessage } from '../db/queries.js';

// const alphaErr = "must only contain letters.";
const messageAuthorMaxLength = 15;
const messageTextMaxLength = 80;
const authorLengthErr = `must be between 1 and ${messageAuthorMaxLength} characters.`;
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

export const validateAuthor = [
  body("messageAuthor").trim()
    .isLength({ min: 1, max: messageAuthorMaxLength }).withMessage(`Message author ${authorLengthErr}`),
  body("messageText").trim()
    .isLength({ min: 1, max: messageTextMaxLength }).withMessage(`Message text ${textLengthErr}`),
];

export async function createMessage(req, res) {
  const errors = validationResult(req);
  const { messageText, messageAuthor } = matchedData(req);
  const errorObj = buildErrorObject(errors);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      values: { messageText, messageAuthor },
      errors: errorObj,
    });
  }

  await insertMessage({
    author: messageAuthor,
    text: messageText,
  })

  res.redirect("/");
}