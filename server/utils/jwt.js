const jwt = require('jsonwebtoken');

function createToken(data) {
    return jwt.sign(data, secret, {expiresIn: "1hr" });
}

function verifyToken(token) {

    return new Promise((resolve, reject) => {

        jwt.verify(token, secret, (err, data) => {

            if (err) { reject(err); return; }

            resolve(data);

        });
    });
}

module.exports = {
    createToken,
    verifyToken
};