import { Router } from 'express'
import { getMessage } from '../controllers/messageController.js';

const messageRouter = Router()

messageRouter.get("/:index", getMessage);

export default messageRouter