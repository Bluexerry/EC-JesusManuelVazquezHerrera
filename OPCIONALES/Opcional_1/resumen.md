# Resumen Completo y Detallado del Ejercicio

## Parte 1: Configuración del Proyecto

1. **Configuración del entorno de desarrollo**:
   - Se creó una nueva aplicación React utilizando el comando:

     ```bash
     npx create-react-app nombre-de-tu-aplicacion
     ```

   - Se configuró un servidor backend con Node.js y Express, creando la estructura básica del proyecto.

2. **Configuración de Discord OAuth2 y Creación del Bot**:
   - Se accedió al [Discord Developer Portal](https://discord.com/developers/applications).
   - Se creó una nueva aplicación siguiendo estos pasos:
     - Hacer clic en el botón **"New Application"**.
     - Asignar un nombre a la aplicación y hacer clic en **"Create"**.
   - En la sección **"OAuth2"**, se configuró el **Redirect URI** (URL de redirección):
     - Añadir `http://localhost:5000/auth/discord/callback` a la lista de Redirect URIs.
   - Se creó un bot dentro de la sección "Bot":
     - Hacer clic en **"Add Bot"** y confirmar.
     - Se copió el **token del bot** para usarlo en el backend.
   - Se habilitaron las siguientes características para el bot:
     - **Identificación de usuarios**: Permisos necesarios para identificar y gestionar a los usuarios en el servidor.
     - **Conectividad con el servidor**: Permitir que el bot pueda leer y escribir mensajes.
   - Se configuraron los **scopes de OAuth2** necesarios:
     - Se seleccionaron scopes como `identify`, `guilds`, `guilds.join`, y `guilds.members.read`.
   - Se generó la URL de autorización para que los usuarios acepten la integración del bot con su cuenta de Discord.

## Parte 2: Implementación del Backend

1. **Instalación de dependencias**:
   - En la carpeta del servidor, se instalaron las dependencias necesarias:

     ```bash
     npm install express passport passport-discord express-session mongoose discord.js
     ```

2. **Configuración del middleware de autenticación**:
   - Se creó un archivo de configuración llamado `config.js` en la carpeta `config` del backend:
     - Estructura del archivo `config/config.js`:

       ```javascript
       module.exports = {
           discord: {
               clientID: 'TU_CLIENT_ID',       // Reemplaza con tu Client ID
               clientSecret: 'TU_CLIENT_SECRET',  // Reemplaza con tu Client Secret
               callbackURL: 'http://localhost:5000/auth/discord/callback',
               token: 'TU_TOKEN_DEL_BOT',  // Reemplaza con el token de tu bot
               scopes: ['identify', 'guilds', 'email']  // Scopes de Discord necesarios
           },
           sessionSecret: 'supersecret'  // Cambia esto a un valor seguro
       };
       ```

   - Se configuró `passport-discord` para gestionar el proceso de login y autenticación con Discord:
     - Se serializaron y deserializaron los usuarios mediante Passport.

3. **Creación de rutas de autenticación**:
   - Se definieron las rutas en `index.js` para manejar la autenticación con Discord:
     - **Ruta para iniciar sesión**:

       ```javascript
       app.get('/auth/discord', passport.authenticate('discord', { scope: ['identify', 'guilds'] }));
       ```

     - **Ruta para manejar el callback de Discord**:

       ```javascript
       app.get('/auth/discord/callback', 
           passport.authenticate('discord', { failureRedirect: '/' }),
           (req, res) => {
               // Successful authentication, redirect home.
               res.redirect('/');
           }
       );
       ```

   - Se integró el bot utilizando `discord.js`:
     - Se creó un cliente de Discord que se conecta automáticamente con el token del bot.

4. **Manejo de errores de intents**:
   - Se resolvió el error "Used disallowed intents" habilitando los intents necesarios en el **Discord Developer Portal**:
     - Se activaron los intents en la sección **"Privileged Gateway Intents"** del bot.

5. **Verificación del servidor**:
   - Se reinició el servidor y se verificó que el bot se conectara correctamente, con el mensaje en consola indicando que el bot estaba conectado: `Bot conectado como MiDiscorApp#8587`.

## Cómo Acceder al Bot

1. **Generar la URL de autorización**:
   - Usar la siguiente URL, reemplazando `TU_CLIENT_ID` con el Client ID de tu aplicación:

     ```
     https://discord.com/oauth2/authorize?client_id=TU_CLIENT_ID&scope=identify%20guilds&response_type=code&redirect_uri=http://localhost:5000/auth/discord/callback
     ```

2. **Autorizar el Bot**:
   - Abrir la URL en un navegador.
   - Iniciar sesión en Discord si aún no lo has hecho.
   - Se presentará un formulario para autorizar la aplicación. Hacer clic en **"Autorizar"**.

3. **Verificar la conexión del Bot**:
   - Si todo está configurado correctamente, el bot debería estar conectado a tu servidor de Discord y estar listo para funcionar.

## Estado Actual

- El servidor está escuchando en `http://localhost:5000`, y el bot está conectado y operativo.

## Próximos Pasos

- Se planea continuar con la gestión de usuarios con CRUD, que incluye:
  - Conectar a la base de datos MongoDB.
  - Definir el modelo de usuario.
  - Crear rutas CRUD para gestionar a los usuarios.
  - Integrar el bot para interactuar con los usuarios.
