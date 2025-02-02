# Resumen del Proyecto  

El proyecto es una aplicación web para la venta y compra de videojuegos de segunda mano que integra funciones de comercio electrónico, interacción social y servicios adicionales. Incluye funcionalidades para consultar el clima, comparar productos, configurar opciones personalizadas y gestionar autenticaciones de usuario, lo que permite a los usuarios explorar ofertas, recibir notificaciones y participar en encuestas o votaciones sobre productos.  

---

# Análisis  

La aplicación utiliza React para construir interfaces de usuario interactivas y componentes reutilizables. Se emplea un enfoque modular en el que cada funcionalidad (por ejemplo, filtrado, comparación, configuración) está encapsulada en componentes separados. La integración con APIs externas, como la de predicción meteorológica de AEMET, añade un valor añadido al usuario. Además, se implementa un sistema de autenticación y validación que permite el registro, login y recuperación de contraseña, garantizando una experiencia de compra segura y personalizada.  

---

# Requerimientos Funcionales  

- **Catálogo Dinámico**: Permite listar, filtrar y buscar productos en función de categorías, precios, marcas y valoraciones.  
- **Carrito de Compras**: Visualiza y gestiona una lista de productos seleccionados para la compra, con resumen de precios y proceso de pago.  
- **Comparación y Encuestas**: Facilita la selección y comparación de productos, realzando diferencias clave, y permite a los usuarios votar o calificar productos, afectando la clasificación global.  
- **Configurador de Productos**: Ofrece herramientas para configurar productos mediante opciones personalizables de color, motor y rendimiento, y gestiona filtros globales basados en dichas configuraciones.  
- **Servicio Meteorológico**: Consulta y despliega los datos del clima (temperatura, estado, velocidad del viento) actual y pronosticado para una provincia, usando información de la API de AEMET.  
- **Autenticación y Notificaciones**: Incorpora mecanismos de autenticación con registro, login y recuperación de contraseñas. Además, el sistema notifica al usuario ante acciones o errores relevantes.  

---

# Componentes Principales  

### Interfaz de Usuario  

- Navbar y Footer para navegación y presentación.  
- HeroSection que introduce la oferta del sitio.  
- Componentes de visualización de productos como `ProductList`, `ProductCard` y funcionalidades avanzadas como `ProductComparator` y `ProductConfigurator`.  

### Gestión de Carrito y Configuraciones  

- `CartPreview` para mostrar el estado del carrito.  
- Funcionalidades para gestionar configuraciones de productos y aplicar filtros globales basados en las preferencias del usuario.  

### Autenticación  

- Formularios para `LoginForm`, `RegisterForm` y `ForgotPasswordForm` junto con servicios simulados en `auth_API.js`.  

### Servicios Externos  

- `apiClient.js` que gestiona la conexión con la API meteorológica.  

### Sistema de Notificaciones y Validaciones  

- `NotificationSystem` para informar al usuario.  
- `ValidationSystem.jsx` para asegurar la integridad de los datos ingresados.  

---

# Diseño  

El diseño sigue un esquema _responsive_ y basado en componentes. Se utilizan hojas de estilo específicas (`layout.css`, `home.css` y `product.css`) para modularizar la presentación. La interfaz se caracteriza por una buena usabilidad, con botones y controles interactivos que ofrecen transiciones suaves y respuestas inmediatas. Además, se implementa un sistema de notificaciones flotantes para dar feedback en tiempo real y un diseño visual coherente a lo largo de toda la aplicación.  

---

# Bibliografía  

- Documentación de React para la creación de interfaces complejas y manejo de estado.  
- Guías de integración de APIs RESTful, en especial la de AEMET, para la consulta de datos meteorológicos.  
- Recursos sobre patrones de diseño en aplicaciones SPA y mejores prácticas en validación y autenticación de usuarios.  
- Estándares y recomendaciones en diseño de UI/UX para aplicaciones de comercio electrónico.  

---

# Preguntas Generadas por IA  

1. ¿Cómo se integran las llamadas a la API meteorológica en el flujo general del sitio?  
2. ¿Qué criterios de filtrado y votación se aplican en la visualización del catálogo?  
3. ¿Cómo se gestiona el estado global de la aplicación para sincronizar configuraciones y votaciones?  
4. ¿Qué mecanismos de seguridad se aplican en la autenticación y validación de datos?  
5. ¿Cómo se manejan los errores de conexión con servicios externos como la API de AEMET?  
6. ¿Qué estrategias se implementan para garantizar la escalabilidad del catálogo dinámico ante miles de productos?  
7. ¿Cómo se optimiza el rendimiento del configurador de productos con múltiples opciones personalizables?  
8. ¿De qué manera se asegura la coherencia visual entre componentes desarrollados por distintos equipos?  
9. ¿Qué herramientas se usan para medir la efectividad de las notificaciones en tiempo real?  
10. ¿Cómo se aborda la accesibilidad en el diseño responsive para usuarios con discapacidades?  

---

# Pruebas Funcionales  

### ✅ Prueba 1.1: Consulta de provincia y visualización de datos actuales  

- Ingresar **Sevilla** en el filtro de provincia.  
- Verificar que se muestra la temperatura, el estado del clima (lluvioso, soleado o nublado) y la velocidad del viento actual.  
- Asegurarse de que se visualizan de manera correcta los datos meteorológicos pronosticados para al menos las siguientes 48 horas.  
- Ingresar **Madrid** en el filtro de provincia.  
- Verificar la correcta visualización tanto de los datos actuales como de la predicción meteorológica para las próximas 48 horas.  
![GIF Prueba 1.1](./Recursos/Ejercicio%201/)  

### ✅ Prueba 1.2: Cambio entre unidades de temperatura  

- Cambiar de **Celsius** a **Fahrenheit** mediante las opciones disponibles.  
- Confirmar que los valores se actualizan correctamente en toda la interfaz.  
![GIF Prueba 1.2](./Recursos//Ejercicio%201/)  

### ✅ Prueba 2.1: Comparación de productos  

- Seleccionar al menos dos productos para comparar en el componente comparador.  
- Verificar que las diferencias clave entre productos se destacan claramente, facilitando la toma de decisiones.  
![GIF Prueba 2.1](./Recursos/Ejercicio%202/Ejercicio2.1.gif)  

### ✅ Prueba 2.2: Encuestas y votaciones  

- Completar una encuesta de satisfacción o realizar votos sobre productos.  
- Validar que los votos se registran correctamente y se reflejan en la clasificación de productos.  
![GIF Prueba 2.2](./Recursos/Ejercicio%202/Ejercicio2.2.gif)  

### ✅ Prueba 2.3: Simulación de decisión de compra  

- Configurar un producto utilizando distintos parámetros en el configurador de productos.  
- Verificar que las recomendaciones y el filtrado global son coherentes con la configuración elegida, ayudando a orientar la decisión de compra.  
![GIF Prueba 2.3](./Recursos/Ejercicio%202/Ejercicio2.3.gif)  

---

## Diagramas de flujo

### Arquitectura de la API REST

Este diagrama describe la estructura y organización general de la API REST utilizada en el proyecto.

![Arquitectura de la API REST](./Recursos//General//Diagrama%20sin%20título.drawio.png)

### Flujo del Proceso de Usuario

Representa las interacciones y decisiones principales que realiza un usuario en el sistema.

![Flujo del Proceso de Usuario](./Recursos/General/Diagrama%20de%20flujo.draw.drawio.png)
