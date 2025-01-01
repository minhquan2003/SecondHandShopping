import {sendMessage, 
    getMessagesByUser} from '../services/messageService.js';

// Gửi tin nhắn
const sendMessageCon = async (req, res) => {
  const { content, senderId, receiverId } = req.body;
  try {
    const message = await sendMessage(content, senderId, receiverId);
    res.status(201).json(message); // Trả về tin nhắn đã gửi
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Nhận tin nhắn giữa hai người dùng
const getMessages = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await getMessagesByUser(userId1, userId2);
    res.status(200).json(messages); // Trả về danh sách tin nhắn
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {sendMessageCon, getMessages}