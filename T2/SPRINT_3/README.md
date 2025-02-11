# Resumen del Proyecto

Este proyecto constituye una plataforma integral de venta de videojuegos, complementada con diversas secciones y funcionalidades que ofrecen una experiencia interactiva al usuario. Entre ellas destacan la búsqueda y filtrado de productos (videojuegos), un sistema de reseñas (valoraciones), una sección de preguntas y respuestas en tiempo real, la posibilidad de favoritos (lista de deseos), sistemas de comparación y votaciones de productos, y un mapa meteorológico interactivo que integra datos de diferentes fuentes. El objetivo principal es permitir al cliente explorar videojuegos, recibir información personalizada y tomar decisiones informadas antes de realizar la compra.

---

## Análisis

El sistema se basa en React y organiza sus componentes en distintas subcarpetas según su función (componentes para la interfaz principal, autenticación, servicios de API, etc.). La aplicación presenta una clara separación de responsabilidades, lo que mejora la mantenibilidad y escalabilidad. Se utiliza la Context API, tanto para manejar la lógica de notificaciones como para la gestión del tema (claroscuro). Por otro lado, se cuenta con servicios especializados (por ejemplo, `auth_API.js`, `products_API.js`, `apiClient.js`) que centralizan las peticiones y facilitan la comunicación con el backend o con ficheros de JSON locales.

---

## Requerimientos Funcionales

- **Gestión y visualización de productos**: Listar, filtrar, comparar y configurar videojuegos.
- **Carrito de compras y lista de deseos**: Añadir o eliminar juegos, previsualizar cantidades.
- **Autenticación y registro de usuarios**: Posibilidad de iniciar sesión, registrarse y restablecer contraseña.
- **Sistema de notificaciones**: Informar al usuario de acciones exitosas o errores.
- **Sistema de reseñas y valoraciones**: Añadir reseñas, puntuar productos, filtrar reseñas por relevancia.
- **Sistema de preguntas y respuestas**: Abrir un modal para que usuarios que puedan preguntar y cualquiera pueda responder.
- **Integración meteorológica**: Selección de una provincia, mostrando información del clima según mapas interactivos y filtros de localización.

---

## Componentes Principales

### Auth

- `LoginForm.jsx` – Formulario de inicio de sesión.
- `RegisterForm.jsx` – Formulario de registro.

### Home

- `HeroSection.jsx` – Sección principal de bienvenida.
- `ProductCard.jsx` – Tarjeta de presentación de producto.
- `ProductConfigurator.jsx` – Configurador y filtros de producto.
- `ProductFilter.jsx` – Filtros avanzados para productos.
- `ProductList.jsx` – Listado de productos.
- `CartPreview.jsx` – Vista previa del carrito.
- `VotingSystem.jsx` – Sistema de votaciones para productos.
- `ProductComparator.jsx` – Comparador de productos.

### Layout

- `Navbar.jsx` – Barra de navegación.
- `Footer.jsx` – Pie de página.

### HDU

- `ProductQA.jsx` – Módulo de preguntas y respuestas.
- `FavouritesList.jsx` – Lista de favoritos.

### Weather

- `WeatherSearch.jsx` – Búsqueda de condiciones meteorológicas.
- `DetailedWeatherSearch.jsx` – Predicción meteorológica detallada.
- `DetailedWeatherMap.jsx` – Mapa interactivo de predicción meteorológica.

### Tema y Notificaciones

- `ThemeContext.jsx` – Configuración de tema (claro/oscuro).
- `NotificationSystem.jsx` – Sistema de notificaciones.

---

## Bibliografía

- [Documentación oficial de React](https://react.dev)
- [Especificaciones de ECMAScript](https://tc39.es/ecma262/)
- Guías de estilo CSS y UX de proyectos conocidos de ecommerce
- Mapas y servicios meteorológicos (documentación de AEMET u otras APIs externas)

---

## Preguntas Generadas por IA

- ¿Cómo se integra el sistema de preguntas y respuestas en el flujo de compra del usuario?
- ¿Qué beneficios aporta tener un sistema de notificaciones centralizado frente a notificaciones manuales?
- ¿En qué momento el usuario recibe retroalimentación visual al añadir un producto a la lista de deseos?
- ¿Cuáles son las consideraciones de seguridad mínimas para un proceso de autenticación reactivo?
- ¿De qué manera se optimiza el renderizado de componentes en caso de abundantes listados de productos?
- ¿Cómo se puede implementar un sistema de caching efectivo en el consumo de APIs externas?
- ¿Qué estrategias se utilizan para manejar el estado global sin comprometer el rendimiento?
- ¿Qué metodologías de testing se recomiendan para asegurar la fiabilidad de las funcionalidades?
- ¿Cuál es la mejor forma de estructurar los estilos CSS para mantener la consistencia y escalabilidad?
- ¿Cómo se integran mejoras de accesibilidad en componentes críticos de la aplicación?
- ¿Qué técnicas de lazy loading se emplean para optimizar la carga de componentes en React?
- ¿Cómo se garantiza la sincronización en tiempo real entre el frontend y el backend?
- ¿Qué medidas se implementan para prevenir ataques de inyección de código en el sistema?
- ¿Cómo se podría potenciar la búsqueda predictiva en el componente ProductFilter?
- ¿Cuál es el impacto de la optimización de imágenes en la velocidad de carga y experiencia del usuario?
- ¿Qué mejoras en la experiencia de usuario se podrían implementar en el flujo de compra de videojuegos?
- ¿Cómo se gestionan de manera amigable los errores de red en la interfaz de usuario?
- ¿Cuándo es más adecuado utilizar Context API frente a Redux u otros gestores de estado?
- ¿Qué ventajas ofrece el uso de variables CSS en la gestión de temas (claro/oscuro)?
- ¿Cómo se adaptaría el sistema para soportar múltiples idiomas sin reiniciar la aplicación?
- ¿Qué desafíos presenta la integración de APIs externas para obtener datos meteorológicos?
- ¿Cómo se estructuran los tests unitarios para garantizar la robustez del módulo ProductQA?

---

# Historias de Usuario

## 1. Reseñas y Valoraciones de Productos

### ✏️ Título: Reseñas y Valoraciones

### 📝 Descripción

"Como comprador, quiero poder dejar y consultar reseñas y valoraciones de los juegos para tomar decisiones de compra basadas en la experiencia de otros usuarios."

### 🔸 Criterios de Aceptación

1. **Dado** que el usuario ha adquirido o visitado la página de un juego, **cuando** acceda a la sección de reseñas, **entonces** deberá ver un listado de reseñas con valoraciones numéricas y comentarios, garantizando que se actualice en tiempo real.
2. **Dado** que el usuario quiere enviar una reseña, **cuando** intente enviarla, **entonces** el formulario validará que se complete el comentario y se otorgue un valor de 1 a 5 estrellas, mostrando un mensaje de confirmación al enviarla.
3. **Dado** que existen reseñas para un producto, **cuando** un usuario consulte ese juego, **entonces** se deberá mostrar la media de valoraciones y un resumen de comentarios destacados, facilitando la comparación de opiniones.

### 🔸 Diseño

- Se añadirá una nueva sección en la página de detalles del producto que muestre reseñas y valoraciones en forma de listado y resumen (tarjetas o bloques).
- Se implementará un formulario modal o integrado para escribir reseñas.
- Se reutilizarán componentes de notificación ya existentes para gestionar el envío y alerta de errores.

### 🔸 Implementación

- **Modificaciones en código:**
  - Crear un componente `ProductReviews.jsx` en `HDU` que se encargue de realizar el `fetch` y renderizar las reseñas desde (o hacia) un endpoint de backend.
  - Integrar el componente en la página de detalles de producto o en `ProductCard.jsx`.
  - Reutilizar el sistema de notificaciones en el proyecto.
- **Arquitectura:**
  - Ubicar el nuevo componente en `src/components/HDU/ProductReviews.jsx` y actualizar las rutas o la composición del producto para incluirlo.

---

## 2. Lista de Deseos y Favoritos

### ✏️ Título: Lista de Deseos y Favoritos

### 📝 Descripción

"Como comprador, quiero poder agregar juegos a mi lista de deseos para poder guardarlos y consultarlos posteriormente, facilitándome la toma de decisiones futuras."

### 🔸 Criterios de Aceptación

1. **Dado** que el usuario navega por el catálogo de juegos, **cuando** pulse el ícono de 'favorito' o 'añadir a lista de deseos' en un producto, **entonces** ese juego se añadirá a su lista personal, visible en un apartado dedicado, garantizando persistencia en el tiempo.
2. **Dado** que el usuario accede a su lista de deseos, **cuando** visualice la sección, **entonces** se mostrarán los juegos previamente seleccionados con detalles resumidos (imagen, título, precio y stock), permitiéndole acceder a la ficha completa si lo desea.
3. **Dado** que el usuario quiera gestionar su lista, **cuando** decida eliminar algún juego de la lista, **entonces** el sistema actualizará la lista en tiempo real, mostrando un mensaje de confirmación.

### 🔸 Diseño

- Se creará una nueva sección o pantalla denominada **"Mis Favoritos"** accesible desde el menú o el perfil del usuario.
- Cada juego en la lista se presentará en forma de tarjeta (reutilizando el estilo de `ProductCard.jsx`) pero con una opción extra para eliminarlo de la lista.
- Se utilizará un ícono (por ejemplo, una estrella) que permita agregar o quitar el producto a la lista de deseos, con cambios de color para reflejar el estado activo/inactivo.

### 🔸 Implementación

- **Modificaciones en código:**
  - Crear un componente `FavoritesList.jsx` en `HDU` para mostrar los juegos favoritos del usuario.
  - Integrar lógica de estado, utilizando `useState` o `Context API`, para almacenar la lista de deseos durante la sesión o persistir en el backend (según se disponga de la API).
  - Añadir un botón/ícono en `ProductCard.jsx` para interactuar con la lista de deseos.
- **Arquitectura:**
  - Organizar el componente y la lógica relacionada en una nueva carpeta si se prefiere separar las funcionalidades de usuario, o mantenerlo en `HDU` si se prefiere centralizar la gestión de productos.

---

## 3. Sistema de Preguntas y Respuestas

### ✏️ Título: Preguntas y Respuestas sobre Productos

### 📝 Descripción

"Como cliente interesado, quiero poder preguntar sobre un juego y recibir respuestas de otros usuarios o del vendedor para aclarar dudas antes de realizar una compra."

### 🔸 Criterios de Aceptación

1. **Dado** que el usuario visita la ficha de un juego, **cuando** haga clic en la opción **"Preguntas y Respuestas"**, **entonces** se abrirá una sección donde podrá escribir su pregunta.
2. **Dado** que el usuario envía una pregunta, **cuando** otro usuario o el vendedor responda, **entonces** se mostrará la respuesta de forma clara debajo del enunciado de la pregunta.
3. **Dado** que existen varias preguntas y respuestas, **cuando** el usuario visualice la sección, **entonces** podrá navegar fácilmente entre ellas siendo visualizadas por orden de creación.

### 🔸 Diseño

- Se añadirá un componente de `ProductQA` en la página de detalle del producto.
- La interfaz se dividirá en dos áreas: una para que el usuario escriba y envíe su pregunta (formulario) y otra para listar todas las preguntas con sus respectivas respuestas.
- Se reutilizarán componentes de notificación y validación para gestionar la entrada de datos y la respuesta del sistema.

### 🔸 Implementación

- **Modificaciones en código:**
  - Crear un componente `ProductQA.jsx` en `HDU` que gestione el envío y la visualización de preguntas y respuestas.
  - Integrar el componente en la ficha del producto, posiblemente en una pestaña o acordeón.

---

## Pruebas Funcionales

### ✅ Prueba 1.1: Mapa interactivo para seleccionar provincia

- Seleccionar un POI en el mapa interactivo que se encuentre en Carmona.
- Se muestra la información meteorológica de la provincia de Sevilla.
- Seleccionar un POI en el mapa interactivo que se encuentre en Alcalá de Henares.
- Se muestra la información meteorológica de la provincia de Madrid.

![GIF Prueba 1.1](./Recursos/Ejercicio%201/Ejercicio1.gif)  

### ✅ Prueba 1.2: Cambios de la interfaz

- Verificar la correcta adaptación de estilo oscuro a claro.
- Verificar la correcta adaptación de estilo claro a oscuro.

![GIF Prueba 1.2](./Recursos/Ejercicio%201/Ejercicio2.gif)  

### 🔸 Prueba HDU 1

1. **Caso de prueba 1:** Verificar que, al cargar la página del producto, se muestra el botón de “Valoraciones”.
2. **Caso de prueba 2:** Al enviar una reseña válida, el sistema debería almacenar la entrada y actualizar el listado en tiempo real, mostrando un mensaje de éxito.
3. **Caso de prueba 3:** Probar que el formulario muestra errores cuando el usuario envía datos incompletos del comentario o de la puntuación.

![GIF Prueba HUD 1](./Recursos/Ejercicio%202/Ejercicio1.gif)  

### 🔸 Prueba HDU 2

1. **Caso de prueba 1:** Seleccionar un juego desde el catálogo y verificar que se añade a la lista de deseos, reflejado visualmente mediante cambio en el ícono.
2. **Caso de prueba 2:** Acceder a la sección **"Mis Favoritos"** y corroborar que el juego añadido aparece con sus datos resumidos.
3. **Caso de prueba 3:** Remover un juego de la lista y comprobar que se muestra un mensaje de confirmación y que el listado se actualiza sin recargar la página.

![GIF Prueba HUD 2](./Recursos/Ejercicio%202/Ejercicio2.gif)  

### 🔸 Prueba HDU 3

1. **Caso de prueba 1:** Verificar que un usuario pueda acceder al sistema de valoración.
2. **Caso de prueba 2:** Comprobar que las preguntas y respuestas se actualizan en tiempo real.
3. **Caso de prueba 3:** Validar que las respuestas aparecen correctamente organizadas.

![GIF Prueba HUD 3](./Recursos/Ejercicio%202/Ejercicio3.gif)  

---

## Diagramas de Flujo

Se recomienda el uso de Draw.io o Lucidchart para su elaboración.

## Arquitectura de la API REST

El backend maneja funcionalidades como login, registro y productos, representados en diagramas API REST.
![GIF Diagrama 1](./Recursos/General/Diagrama%20sin%20título.drawio.png)  

## Flujo del Proceso de Usuario

Describe el ciclo de vida de la interacción de un usuario en la plataforma.
![GIF Diagrama 2](./Recursos/General/Diagrama%20de%20flujo.draw.drawio.png)  

---
Este documento estructurado ayuda a la integración y mantenimiento del sistema.
