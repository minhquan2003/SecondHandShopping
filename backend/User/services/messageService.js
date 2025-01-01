import Messages from '../models/Messages.js';

// Gửi tin nhắn
const sendMessage = async (content, senderId, receiverId) => {
  const message = new Messages({ content, senderId, receiverId });
  await message.save();
  return message;
};

// Lấy tất cả tin nhắn giữa hai người dùng
const getMessagesByUser = async (userId1, userId2) => {
  return await Messages.find({
    $or: [
      { senderId: userId1, receiverId: userId2 },
      { senderId: userId2, receiverId: userId1 }
    ]
  }).sort({ createdAt: 1 }); // Sắp xếp theo thời gian tạo
};

export {sendMessage, getMessagesByUser}