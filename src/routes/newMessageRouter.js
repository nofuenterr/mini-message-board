import { Router } from 'express'

import { createMessage, getNewMessageForm, validateUser } from '../controllers/newMessageController.js';

const newMessageRouter = Router()


newMessageRouter.get('/', getNewMessageForm);

newMessageRouter.post('/', validateUser, createMessage)

export default newMessageRouter