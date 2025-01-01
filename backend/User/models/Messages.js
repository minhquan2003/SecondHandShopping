import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Messages = mongoose.model('Messages', messageSchema);
export default Messages;