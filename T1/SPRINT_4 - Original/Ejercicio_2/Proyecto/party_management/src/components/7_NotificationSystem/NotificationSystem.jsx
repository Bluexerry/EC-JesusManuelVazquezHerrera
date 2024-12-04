import './NotificationSystem.css';

const NotificationSystem = ({ notifications, removeNotification }) => {
    return (
        <div className="notification-system">
            {notifications.map(notification => (
                <div key={notification.id} className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            ))}
        </div>
    );
};

export default NotificationSystem;