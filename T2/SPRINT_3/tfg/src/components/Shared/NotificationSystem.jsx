// src/components/Shared/NotificationSystem.jsx
import React, { createContext, useContext, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import '../../styles/home.css';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationSystem = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (type, message) => {
    const id = Date.now();
    setNotifications([...notifications, { id, type, message }]);
    setTimeout(() => {
      setNotifications(notifications.filter(notif => notif.id !== id));
    }, 3000);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return null;
    }
  };

  const handleClose = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <div className="notification-container">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            <span className="icon">{getIcon(notif.type)}</span>
            <span className="message">{notif.message}</span>
            <button className="close-btn" onClick={() => handleClose(notif.id)} aria-label="Cerrar Notificación">
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationSystem;