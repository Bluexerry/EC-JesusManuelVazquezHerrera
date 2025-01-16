// src/services/ValidationSystem.jsx
import '../../styles/home.css'; // Asegúrate de importar el CSS correcto

/**
 * Valida el formato del correo electrónico.
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };
  
  /**
   * Valida la contraseña según los criterios:
   * - Mínimo 8 caracteres
   * - Al menos una letra mayúscula
   * - Al menos un número
   * - Al menos un símbolo
   * @param {string} password
   * @returns {boolean}
   */
  export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  /**
   * Valida si la confirmación de la contraseña coincide con la contraseña original.
   * @param {string} password
   * @param {string} confirmPassword
   * @returns {boolean}
   */
  export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  /**
   * Valida que el campo no esté vacío.
   * @param {string} value
   * @returns {boolean}
   */
  export const validateNotEmpty = (value) => {
    return value.trim() !== '';
  };
  
  /**
   * Valida el nombre de usuario.
   * - Al menos 3 caracteres
   * - Solo letras y números
   * @param {string} username
   * @returns {boolean}
   */
  export const validateUsername = (username) => {
    const regex = /^[A-Za-z0-9]{3,}$/;
    return regex.test(username);
  };