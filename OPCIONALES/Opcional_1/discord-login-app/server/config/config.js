module.exports = {
    discord: {
        clientID: '1297499406962135063',       // Reemplaza con tu Client ID
        clientSecret: 'tgopStEjIkq995NhsmuP1DJcX1Sge-LC',  // Reemplaza con tu Client Secret
        callbackURL: 'http://localhost:5000/auth/discord/callback',
        token: 'MTI5NzQ5OTQwNjk2MjEzNTA2Mw.GRforz.hxFKOV8i93eF-5qNokv0Iy9iaClXG-BLict72g',  // Reemplaza con el token de tu bot
        scopes: ['identify', 'guilds', 'email']  // Scopes de Discord necesarios
    },
    sessionSecret: 'supersecret'  // Cambia esto a un valor seguro
};
