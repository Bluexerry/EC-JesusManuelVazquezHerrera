// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../../services/auth_API.js';
import { useNotification } from '../Shared/NotificationSystem.jsx';
import {
  validateEmail,
  validateNotEmpty,
} from '../Shared/ValidationSystem.jsx'; // Importa las funciones de validación
import { useNavigate, Link } from 'react-router-dom'; // Para redirecciones
import '../../styles/home.css';

const LoginForm = () => {
  const showNotification = useNotification();
  const navigate = useNavigate(); // Hook para la navegación

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    const validationErrors = {};
    if (!validateEmail(email)) {
      validationErrors.email = 'Correo electrónico inválido.';
    }
    if (!validateNotEmpty(password)) {
      validationErrors.password = 'La contraseña no puede estar vacía.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const user = await login(email, password);
      showNotification('success', `Bienvenido, ${user.username}!`);
      
      // Manejar "Recordarme" usando localStorage
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      // Redirigir al panel principal
      navigate('/'); // Asegúrate de tener una ruta para '/dashboard'
    } catch (error) {
      showNotification('error', error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="login-email">Correo Electrónico</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (email && !validateEmail(email)) {
                setErrors((prev) => ({ ...prev, email: 'Correo electrónico inválido.' }));
              } else {
                setErrors((prev) => {
                  const { email, ...rest } = prev;
                  return rest;
                });
              }
            }}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Contraseña</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => {
              if (password && !validateNotEmpty(password)) {
                setErrors((prev) => ({ ...prev, password: 'La contraseña no puede estar vacía.' }));
              } else {
                setErrors((prev) => {
                  const { password, ...rest } = prev;
                  return rest;
                });
              }
            }}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group remember-me">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Recordarme</label>
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿Olvidaste tu contraseña? <Link to="/forgot-password">Recuperarla</Link>
      </p>
    </div>
  );
};

export default LoginForm;