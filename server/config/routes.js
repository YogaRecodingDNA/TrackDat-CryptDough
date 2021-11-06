const axios = require('axios');
const User = require('../Models/UserModel');
const config = require('./config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../utils/auth');
const { validationResult } = require('express-validator');
require('dotenv').config();


module.exports = (app) => {
  
  // COIN ROUTES =========================================================================
  
  app.get('/coins', (req, res) => {
    res.send({coinGeckoData});
  });
  
  app.post('/coins', (req,res) => {
    
    const token = req.body.user;
    
    const decoded = jwt.verify(token, process.env.SECRET);
    
    const newCoin = req.body.id;
    
      User.findById(decoded.id, (err, user) => {
        if (err) return console.error(err);

        console.log("USER COINS", user.userCoins);

        const coinChecker = user.userCoins.filter( coin => coin.hasOwnProperty(newCoin));

        let msg;
        let hideIcon = true;
        
        if(coinChecker.length === 0){
          
          msg = `You Sifted ${newCoin} to your list.`;
          
          const coinObj = { [newCoin]: 0 };
          
          user.userCoins.push(coinObj);
          
          user.save((err, res) => {
            if (err) return console.error(err);
          });
          
        } else {
          
          msg = `${newCoin} is already in your list.`;
          
        }
        
        res.send({ msg, hideIcon });

        console.log("UPDATED USER COINS", user.userCoins);

      });
    });

    // LOGIN ROUTES =========================================================================


    app.post('/login', auth.login, async (req,res) => {
      // Get Login Form Credentials
      const {username, password} = req.body;

      let errors = validationResult(req);

      if (!errors.isEmpty()) {
  
        console.log(errors);

        const errorMsg = errors.array()[0].msg;

        res.send({ errorMsg });

      } else {

        // Search by username for User in DB
        const user = await User.findOne({ username });
  
        // Validating that the passwords match with bcrypt.compare method
        bcrypt.compare(password, user.password)
        .then( (result) => {

          if(result) {
            // If result === true --> set user values and expire time for jwt token
            const payload = { name: username, id: user._id };
  
            // Create jwt using self-created method .creatToken() in "utils" folder jwt "file"
  
            const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "1hr" });
  
            console.log("THE TOKEN IS ====> ", token);
  
            let loggedIn;
  
            res.send({ token, loggedIn });
            
          } else {
            // If result returns false -> means passwords don't match...
            // -> Send errorMsg to client side
            // -> throw Error
            res.send({errorMsg: "Invalid Password!"});

            throw Error("Invalid Password!");

          }

        })
        .catch(error => console.log(error));

      }
    });


    // REGISTER ROUTE =========================================================================


    app.post('/register', auth.register, (req, res, next) => {

      let { email, username, password, userCoins} = req.body;

      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        const errorMsg = errors.array()[0].msg;
        res.send({ errorMsg });
      } else {
        bcrypt.hash(password, +process.env.SALT, function(err, hash) {
          password = hash;   
          User.create({ email, username, password, userCoins })
          .then((createdUser) => {
            let userCreated;
            res.send({userCreated});
          })
          .catch((err) => console.log(err));
        });
      }
    });
      

    
    // COIN PROFILE ROUTES =========================================================================

    app.post('/myList', (req,res) => {

      const body = req.body;
      const newAmount = body.amount;
      const requestType = body.type;
      const token = body.token;
      const decoded = jwt.verify(token, process.env.SECRET);

      console.log("BODY =====>", body);
      
      if (requestType === 'onPageLoad') {

        User.findById(decoded.id, (err, user) => {
          if (err) return console.error(err);
          const coins = user.userCoins;
          res.send( coins );
        });
        
      } else if (requestType === 'updateAmount') {

        User.findById(decoded.id, (err, user) => {
          if (err) return console.error(err);
          console.log("USER =====>", user);
          
          const coinArray = user.userCoins;
          let updatedCoin;
          console.log("COIN ARRAY ====>", coinArray);
          let replaceAtPosition;
          
          coinArray.forEach( (coin, index) => {
            console.log("coin ====>", coin);
            for (let key in coin) {
              console.log("key ====>", key);
              console.log("body.coinId ====>", body.coinId);
              if (key === body.coinId) {
                replaceAtPosition = index;
              }
            }
          });
          // .splice(start pos, amount of elements to remove, replace with)
          coinArray.splice(replaceAtPosition, 1, { [body.coinId]: +newAmount });
          console.log("AFTER SPLICE COIN ARRAY ====>", coinArray);
          
          user.save((err, result) => {
            if (err) return console.error(err);
            result = result.userCoins;
            console.log("result after user save", result);
            res.send({result, newAmount, msg: `You updated ${body.coinId}'s amount.`});
          });

        });

      } else if (requestType === 'delete'){
        
        User.findById(decoded.id, (err, user) => {
          if (err) return console.error(err);
          console.log("USER =====>", user);
          
          const coinArray = user.userCoins;
          let removeAtPosition;
          
          coinArray.forEach( (coin, index) => {
            for (let key in coin) {
              // console.log("KEY =====>", key);
              // console.log("COIN AND INDEX =====>", coin, index);
              if (key == body.coinId) {
                removeAtPosition = index;
              }
            }
          });
          // .splice(start pos, amount of elements to remove, replace with)
          coinArray.splice(removeAtPosition, 1);
          
          user.save((err, result) => {
            if (err) return console.error(err);
            result = result.userCoins;
            res.send({result, msg: `${body.coinId} has been removed from your list.`});
          });

        });
      }
    });

};







// COINGECKO API AXIOS REQUEST ==========================================================

  // const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true';
  // let coinGeckoData;
  // coinGeckoData = axios(url, {
  //   method: 'get',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then(response => response.data)
  // .catch(function (error) {
  //   console.log(error);
  // });







      // var config = {
      //   method: 'get',
      //   url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // };
      
      // axios(config)
      // .then(response => res.send(response.data))
      // .catch(function (error) {
      //   console.log(error);
      // });
      
      
      
      