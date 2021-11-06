require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9108,
        dbURL: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@trackdatcrypdough.hefs7.mongodb.net/TrackingHub?retryWrites=true&w=majority`,
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];