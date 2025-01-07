import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5555');

const ListMessage = ({ userId }) => {
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState([]); // Mảng để lưu thông tin người dùng
    const navigate = useNavigate();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/conversations/${userId}`);
                setConversations(response.data);

                // Lấy thông tin người dùng cho từng cuộc hội thoại
                const participantIds = response.data.map(conversation => 
                    conversation.participant1 === userId ? conversation.participant2 : conversation.participant1
                );

                // Gọi API để lấy thông tin người dùng
                const userPromises = participantIds.map(id => axios.get(`http://localhost:5555/users/${id}`));
                const userResponses = await Promise.all(userPromises);

                // Lưu thông tin người dùng vào mảng
                const usersData = userResponses.map(userResponse => userResponse.data);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
        socket.on("newMessage", fetchConversations());
    }, [userId]);

    const handleSelectConversation = (conversation) => {
        // Chuyển hướng đến đường dẫn mới với mã cuộc trò chuyện
        navigate(`/message/${userId}/${conversation._id}`);
    };

    return (
        <div style={{ width: '300px', borderRight: '1px solid #ccc', padding: '10px' }}>
            <h2>Danh Sách Cuộc Hội Thoại</h2>
            {conversations.map((conversation, index) => {
                const participantId = conversation.participant1 === userId ? conversation.participant2 : conversation.participant1;
                const user = users[index]; // Lấy thông tin người dùng từ mảng

                return (
                    <div 
                        key={conversation._id} 
                        className="conversation" 
                        onClick={() => handleSelectConversation(conversation)} // Gửi cuộc hội thoại khi chọn
                        style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px' }}
                    >
                        <p>{user ? user.name : participantId}</p>
                        <span>
                            <p>{conversation.lastMessage || 'Không có tin nhắn'}</p>
                            <p>{conversation.lastMessageTimestamp ? formatDate(conversation.lastMessageTimestamp) : 'Chưa có tin nhắn'}</p>
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default ListMessage;