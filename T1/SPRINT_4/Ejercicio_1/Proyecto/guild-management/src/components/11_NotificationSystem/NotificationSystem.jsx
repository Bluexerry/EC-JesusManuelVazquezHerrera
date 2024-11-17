import React, { useState, useEffect } from "react";
import "./NotificationSystem.css";

const NotificationSystem = ({ notifications }) => {
    const [visibleNotifications, setVisibleNotifications] = useState([]);

    useEffect(() => {
        if (notifications.length > 0) {
            setVisibleNotifications([notifications[0]]);
        }
    }, [notifications]);

    const handleClose = () => {
        setVisibleNotifications([]);
    };

    return (
        <div className="notification-system">
            {visibleNotifications.map((notification, index) => (
                <div key={index} className={`notification ${notification.type}`}>
                    <span>{notification.message}</span>
                    <button onClick={handleClose}>X</button>
                </div>
            ))}
        </div>
    );
};

export default NotificationSystem;