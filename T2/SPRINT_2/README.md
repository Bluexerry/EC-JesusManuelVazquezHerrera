# Resumen del Proyecto

## Análisis
Este proyecto es una tienda en línea enfocada en la venta de videojuegos de segunda mano. Está desarrollada con React utilizando Create React App como base. La aplicación permite a los usuarios navegar por un catálogo de productos, filtrar según diferentes criterios, gestionar un carrito de compras y realizar acciones de autenticación como registro, inicio de sesión y recuperación de contraseña.

## Requerimientos Funcionales

### Componentes Principales

- **Navbar.jsx**: Barra de navegación que incluye enlaces a diferentes secciones como Inicio, Catálogo, Ofertas, Contacto, Iniciar Sesión y Registrarse, además de una barra de búsqueda.
- **Footer.jsx**: Pie de página con enlaces a Términos y Condiciones, Política de Privacidad y redes sociales.
- **HeroSection.jsx**: Sección principal destacada con un mensaje promocional y un botón para ver ofertas.
- **ProductFilter.jsx**: Componente para filtrar productos por categoría, rango de precio, marca y calificación.
- **ProductList.jsx**: Lista de productos que muestra múltiples `ProductCard.jsx`.
- **ProductCard.jsx**: Tarjeta individual de producto que muestra la imagen, nombre, precio y acciones como agregar al carrito, abrir chat o configurador.
- **CartPreview.jsx**: Vista previa del carrito de compras que muestra los productos agregados y el total.
- **LoginForm.jsx**: Formulario de inicio de sesión con validaciones y manejo de errores.
- **RegisterForm.jsx**: Formulario de registro de nuevos usuarios con validaciones en tiempo real.
- **ForgotPasswordForm.jsx**: Formulario para la recuperación de contraseña mediante correo electrónico.
- **NotificationSystem.jsx**: Sistema de notificaciones para mostrar mensajes de éxito o error.
- **ValidationSystem.jsx**: Funciones de validación para formularios de autenticación.

## Diseño

## Bibliografía

- [Create React App Documentation](https://create-react-app.dev/docs/getting-started)
- [React Router Documentation](https://reactrouter.com/)
- [React Icons Documentation](https://react-icons.github.io/react-icons/)
- [Jest Testing Framework](https://jestjs.io/)
- [Testing Library for React](https://testing-library.com/)

## Preguntas Generadas por IA

- **Navbar.jsx**: ¿Cómo manejar la navegación en diferentes rutas utilizando `react-router-dom`?
- **Footer.jsx**: ¿Cómo agregar enlaces dinámicos a redes sociales en el pie de página?
- **HeroSection.jsx**: ¿Cómo implementar animaciones en la sección principal para mejorar la experiencia del usuario?
- **ProductFilter.jsx**: ¿Cómo optimizar los filtros para manejar grandes volúmenes de datos de productos?
- **ProductCard.jsx**: ¿Cuál es la mejor manera de gestionar acciones múltiples (agregar al carrito, abrir chat) en una tarjeta de producto?
- **CartPreview.jsx**: ¿Cómo sincronizar el estado del carrito con el almacenamiento local para mantener la persistencia?
- **LoginForm.jsx**: ¿Cómo implementar recordatorio de sesión utilizando `localStorage` y `sessionStorage`?
- **RegisterForm.jsx**: ¿Qué estrategias de validación en tiempo real pueden mejorar la experiencia de registro de usuarios?
- **ForgotPasswordForm.jsx**: ¿Cómo asegurar la seguridad en el proceso de recuperación de contraseña?
- **NotificationSystem.jsx**: ¿Cómo personalizar las notificaciones para diferentes tipos de mensajes (éxito, error)?
- **ValidationSystem.jsx**: ¿Cómo mantener un sistema de validación escalable para futuros formularios?

## Pruebas Funcionales

### ✅ Prueba: Comprobación de elementos mínimos y específicos
- **Definición**: Navegar a la pantalla de Home y verificar que se muestran todos los elementos mínimos y específicos definidos, como la barra de navegación, sección principal, lista de productos y el pie de página.
- **GIF**:  
  ![Prueba](./Recursos/Ejercicio%201/1.1.gif)

### ✅ Prueba 1: Inicio de Sesión Correcto
- **Definición**:
  1. Ingresar un correo y contraseña válidos.
  2. Hacer clic en Iniciar Sesión.
  3. Verificar que el usuario es redirigido al panel principal.
  4. Confirmar notificación de éxito.
- **GIF**:  
  ![Prueba - 1](./Recursos/Ejercicio%202/2.1.gif)

### ❌ Prueba 2: Error en Inicio de Sesión
- **Definición**:
  1. Ingresar credenciales incorrectas.
  2. Verificar que aparece una notificación de error.
- **GIF**:  
  ![Prueba - 2](./Recursos/Ejercicio%202/2.2.gif)

### 🆕 Prueba 3: Registro con Validaciones
- **Definición**:
  1. Ingresar datos inválidos (correo incorrecto, contraseñas que no coinciden).
  2. Verificar que se muestran mensajes de error en tiempo real.
  3. Corregir los datos y completar el registro.
  4. Verificar notificación de éxito y redirección al login.
- **GIF**:  
  ![Prueba - 3](./Recursos/Ejercicio%202/2.3.gif)

### 🔐 Prueba 4: Recuperación de Contraseña
- **Definición**:
  1. Ingresar un correo registrado.
  2. Verificar que se envía un correo de recuperación.
  3. Probar con un correo no registrado y verificar el mensaje de error.
- **GIF**:  
  ![Prueba - 4](./Recursos/Ejercicio%202/2.4.gif)

## Diagramas de flujo

### Arquitectura de la API REST
Este diagrama describe la estructura y organización general de la API REST utilizada en el proyecto.

![Arquitectura de la API REST](./Recursos//General//Diagrama%20sin%20título.drawio.png)

### Flujo del Proceso de Usuario
Representa las interacciones y decisiones principales que realiza un usuario en el sistema.

![Flujo del Proceso de Usuario](./Recursos/General/Diagrama%20de%20flujo.draw.drawio.png)