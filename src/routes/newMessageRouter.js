import { Router } from 'express'

import { createMessage, getNewMessageForm, validateAuthor } from '../controllers/newMessageController.js';

const newMessageRouter = Router()


newMessageRouter.get('/', getNewMessageForm);

newMessageRouter.post('/', validateAuthor, createMessage)

export default newMessageRouter