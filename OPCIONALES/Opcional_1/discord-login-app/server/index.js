const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig');  // Importamos la configuración de Passport

const app = express();
const PORT = 5000;

// Configurar las sesiones de usuario
app.use(session({
    secret: 'supersecret',  // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: false
}));

// Inicializar passport y sesiones
app.use(passport.initialize());
app.use(passport.session());

// Ruta para iniciar sesión con Discord
app.get('/auth/discord', passport.authenticate('discord'));

// Ruta de callback para Discord
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    // Si la autenticación es exitosa, redirige a la página de inicio
    res.redirect('/dashboard');
});

// Ruta para mostrar la información del usuario en /dashboard
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/discord');
    }
    res.send(`Hola ${req.user.username}, has iniciado sesión con Discord.`);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');

// Crear un cliente de Discord
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Evento cuando el bot está listo
bot.once('ready', () => {
    console.log(`Bot conectado como ${bot.user.tag}`);
});

// Iniciar sesión del bot usando el token
bot.login(config.discord.token);

// El bot puede ahora escuchar e interactuar en servidores
