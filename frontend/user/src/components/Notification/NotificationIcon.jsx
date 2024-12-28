import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBell } from 'react-icons/fi';
import NotificationPopup from './NotificationPopup.jsx'; // Đường dẫn đến NotificationPopup

const NotificationIcon = ({ userId }) => {
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (userId) {
            fetchNotifications(userId);

            // Đặt interval để load lại thông báo mỗi giây
            const intervalId = setInterval(() => {
                fetchNotifications(userId);
            }, 1000);

            // Dọn dẹp interval khi component unmount
            return () => clearInterval(intervalId);
        } else {
            setNotifications([]);
            setUnreadCount(0);
        }
    }, []);

    const fetchNotifications = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5555/notifications/user/${userId}`);
            const data = response.data;

            // Sắp xếp thông báo theo thứ tự gần nhất
            const sortedNotifications = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotifications(sortedNotifications);

            const unread = sortedNotifications.filter(notification => !notification.readed).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setNotifications([]);
            setUnreadCount(0);
        }
    };

    return (
        <div className="relative">
            <span className="cursor-pointer" onClick={togglePopup}>
                <FiBell className="h-5 w-5" />
                {userInfo && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1">
                        {unreadCount}
                    </span>
                )}
            </span>

            {isOpen && userInfo && (
                <NotificationPopup 
                    notifications={notifications} 
                    onClose={togglePopup} 
                />
            )}
        </div>
    );
};

export default NotificationIcon;