const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema ({
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userCoins: [{}]
});

const User = mongoose.model('User', newUser);

module.exports = User;