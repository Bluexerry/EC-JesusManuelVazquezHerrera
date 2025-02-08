// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { register } from '../../services/auth_API.js';
import { useNotification } from '../Shared/NotificationSystem.jsx';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateNotEmpty,
  validateUsername,
} from '../Shared/ValidationSystem.jsx'; // Importa las funciones de validación
import { useNavigate, Link } from 'react-router-dom'; // Para redirecciones
import '../../styles/home.css';

const RegisterForm = () => {
  const showNotification = useNotification();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    const validationErrors = {};
    if (!validateNotEmpty(username)) {
      validationErrors.username = 'El nombre de usuario es obligatorio.';
    }
    if (!validateUsername(username)) {
      validationErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres y solo contener letras y números.';
    }
    if (!validateEmail(email)) {
      validationErrors.email = 'Correo electrónico inválido.';
    }
    if (!validatePassword(password)) {
      validationErrors.password =
        'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo.';
    }
    if (!validateConfirmPassword(password, confirmPassword)) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const newUser = await register(username, email, password);
      showNotification('success', 'Registro exitoso. Puedes iniciar sesión ahora.');
      // Redirigir al formulario de login
      navigate('/login');
      console.log('Usuario registrado:', newUser);
    } catch (error) {
      showNotification('error', error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="register-username">Nombre de Usuario</label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => {
              if (username && !validateNotEmpty(username)) {
                setErrors((prev) => ({ ...prev, username: 'El nombre de usuario es obligatorio.' }));
              } else if (username && !validateUsername(username)) {
                setErrors((prev) => ({
                  ...prev,
                  username: 'El nombre de usuario debe tener al menos 3 caracteres y solo contener letras y números.',
                }));
              } else {
                setErrors((prev) => {
                  const { username, ...rest } = prev;
                  return rest;
                });
              }
            }}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="register-email">Correo Electrónico</label>
          <input
            type="email"
            id="register-email"
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
          <label htmlFor="register-password">Contraseña</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => {
              if (password && !validatePassword(password)) {
                setErrors((prev) => ({
                  ...prev,
                  password:
                    'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo.',
                }));
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

        <div className="form-group">
          <label htmlFor="register-confirm-password">Confirmar Contraseña</label>
          <input
            type="password"
            id="register-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => {
              if (confirmPassword && !validateConfirmPassword(password, confirmPassword)) {
                setErrors((prev) => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden.' }));
              } else {
                setErrors((prev) => {
                  const { confirmPassword, ...rest } = prev;
                  return rest;
                });
              }
            }}
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
      </p>
    </div>
  );
};

export default RegisterForm;