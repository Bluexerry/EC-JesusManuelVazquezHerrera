// src/services/auth_API.js

// Datos mock de usuarios
const mockUsers = [
    {
      id: 1,
      username: 'usuario1',
      email: 'usuario1@example.com',
      password: '4dA1Ts_2425', // Contraseña por defecto válida
    },
    // Puedes agregar más usuarios según sea necesario
  ];
  
  /**
   * Simula una llamada a la API para iniciar sesión.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Resolución con el usuario si las credenciales son correctas.
   */
  export const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          resolve({ id: user.id, username: user.username, email: user.email });
        } else {
          reject(new Error('Credenciales inválidas.'));
        }
      }, 1000); // Simula un retardo de 1 segundo
    });
  };
  
  /**
   * Simula una llamada a la API para registrar un nuevo usuario.
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Resolución con el nuevo usuario registrado.
   */
  export const register = (username, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(
          (u) => u.email === email || u.username === username
        );
        if (existingUser) {
          reject(new Error('El correo electrónico o el nombre de usuario ya están en uso.'));
        } else {
          const newUser = {
            id: mockUsers.length + 1,
            username,
            email,
            password,
          };
          mockUsers.push(newUser);
          resolve({ id: newUser.id, username: newUser.username, email: newUser.email });
        }
      }, 1000); // Simula un retardo de 1 segundo
    });
  };
  
  /**
   * Simula una llamada a la API para la recuperación de contraseña.
   * @param {string} email
   * @returns {Promise<string>} Resolución con un mensaje de éxito.
   */
// src/services/auth_API.js

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email);
      if (user) {
        console.log(`Enviando enlace de recuperación a ${email}`);
        resolve('Enlace de recuperación enviado exitosamente.');
      } else {
        reject(new Error('El correo electrónico no está registrado.'));
      }
    }, 1000); // Simula un retardo de 1 segundo
  });
};