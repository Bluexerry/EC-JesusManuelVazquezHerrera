const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const config = require('./config');

passport.use(new DiscordStrategy({
    clientID: config.discord.clientID,
    clientSecret: config.discord.clientSecret,
    callbackURL: config.discord.callbackURL,
    scope: config.discord.scopes
}, function (accessToken, refreshToken, profile, done) {
    // Aquí es donde procesamos la información del usuario
    return done(null, profile);
}));

// Serializar y deserializar usuarios en la sesión
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
