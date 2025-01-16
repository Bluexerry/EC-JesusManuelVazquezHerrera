// src/components/Auth/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { forgotPassword } from '../../services/auth_API.js';
import { useNotification } from '../Shared/NotificationSystem.jsx';
import { validateEmail } from '../Shared/ValidationSystem.jsx'; // Importa la función de validación
import { useNavigate, Link } from 'react-router-dom'; // Para redirecciones
import '../../styles/home.css';

const ForgotPasswordForm = () => {
  const showNotification = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    const validationErrors = {};
    if (!validateEmail(email)) {
      validationErrors.email = 'Correo electrónico inválido.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const message = await forgotPassword(email);
      showNotification('success', message);
      // Redirigir al formulario de login
      navigate('/login');
      console.log(message);
    } catch (error) {
      showNotification('error', error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="forgot-email">Correo Electrónico</label>
          <input
            type="email"
            id="forgot-email"
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

        <button type="submit">Enviar Enlace de Recuperación</button>
      </form>
      <p>
        <Link to="/login">Volver al Inicio de Sesión</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;