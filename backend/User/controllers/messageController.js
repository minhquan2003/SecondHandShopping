import Conversations from '../models/Conversations.js';
import Messages from '../models/Messages.js';

// Gửi tin nhắn
const sendMessage = async (req, res) => {
    const { conversationId, senderId, receiverId, content } = req.body;

    try {
        const newMessage = new Messages({
            conversationId,
            senderId,
            receiverId,
            content,
        });

        await newMessage.save();

        // Cập nhật cuộc hội thoại với tin nhắn mới
        await Conversations.findByIdAndUpdate(conversationId, {
            lastMessage: content,
            lastMessageTimestamp: new Date(),
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

// Lấy tin nhắn theo cuộc hội thoại
const getMessagesByConversation = async (req, res) => {
    const conversationId = req.params.conversationId;

    try {
        const messages = await Messages.find({ conversationId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
};

export { sendMessage, getMessagesByConversation };