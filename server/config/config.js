const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9108,
        dbURI: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@trackdatcrypdough.hefs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];