const { body } = require('express-validator');
let User = require('../Models/UserModel');


exports.register = [

    body('email', 'Invalid Email')
    .trim()
    .isEmail(),
        
    body('username', 'Username should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5 } )
    .custom(value => {
        return User.findOne({username: value}).then(user => {
          if (user) {
            return Promise.reject('Username already exists!');
          }
        });
    }),

    body('password', 'Password should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5 } )
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.repeatPassword) {
            throw new Error("Passwords don't match!");
        } else {
            return value;
        }
    }),
];



exports.login = [
        
    body('username', 'Username should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5, max: 22 } )
    .custom(value => {
        return User.findOne({username: value}).then(user => {
          if (!user) {
            return Promise.reject('Username does not exist');
          }
        });
    }),

    body('password', 'Password should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5 , max: 22 } ),
    
];














// let validationBodyRules = [

//     check('username', 'Username Invalid')
//     .trim()
//     .isAlphanumeric()
//     .isLength({ min: 6 })
//     .custom((value, { req }) => {
//         User.findOne({ username: value })
//         .then(res => console.log('THIS IS VALIDATION RES', res));
//     })
// ];

// module.exports = validationBodyRules;