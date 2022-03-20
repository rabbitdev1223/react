const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidateJWT = require('../auth/ValidateJWT');

const username = "super";
const password = "super";

function ValidateUsernamePassword(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({message: 'Please provide both username and password'});
    } else {
        next();
    }
}

router.post('/login', ValidateUsernamePassword, (req, res, next) => {
    
    if (req.body.username == username && req.body.password == password)
      {  
        console.log(req.body)
            jwt.sign({userId:1},
                     ValidateJWT.TOKEN_SECRET,
                     {expiresIn: 24 * 7 * 60 * 60},
                (err, token) => {
                    err ? next(err) : res.json({token: token});
                });
        } else {
            res.status(400).send({message: "Invalid credentials!"});
        }
    
});

router.get('/me', ValidateJWT, (req, res, next) => {

    res.json({username: username});

});


module.exports = router;
