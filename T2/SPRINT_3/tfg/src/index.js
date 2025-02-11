// Language: JavaScript (JSX)
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import NotificationSystem from './components/Shared/NotificationSystem.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationSystem>
    <App />
  </NotificationSystem>
);