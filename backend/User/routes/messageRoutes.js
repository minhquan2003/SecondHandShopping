import express from 'express';
import { sendMessageCon, getMessages } from '../controllers/messageController.js';

const messageRouter = express.Router();

// Route gửi tin nhắn
messageRouter.post('/send', sendMessageCon);

// Route nhận tất cả tin nhắn giữa hai người dùng
messageRouter.get('/:userId1/:userId2', getMessages);

export default messageRouter;