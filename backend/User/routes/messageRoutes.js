import express from 'express';
import { sendMessage, getMessagesByConversation } from '../controllers/messageController.js';

const messageRouter = express.Router();

// Gửi tin nhắn
messageRouter.post('/', sendMessage);

// Lấy tin nhắn theo cuộc hội thoại
messageRouter.get('/:conversationId', getMessagesByConversation);

export default messageRouter;