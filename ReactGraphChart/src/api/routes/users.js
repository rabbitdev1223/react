const express = require('express');
const router = express.Router();
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
    
    if (req.body.username == username && req.body.password == password){  
    
        jwt.sign({userId:1},
                    ValidateJWT.TOKEN_SECRET,
                    {expiresIn: 24 * 7 * 60 * 60},
            (err, token) => {
                err ? next(err) : res.json({token: token});
            });
    } 
    else {
        res.status(400).send({message: "Invalid credentials!"});
    }

});

router.get('/getData',ValidateJWT , (req, res, next) => {
    
    let limit = 4;
    let y1 = 100;
    let y2 = 100; 
    let data = [];
    
    let dataPoints1 = [];
    let dataPoints2 = [];
    
    for (let i = 0; i < limit; i += 1) {
        y1 += Math.round(Math.random() * 20 - 10);
        dataPoints1.push({
            x: i,
            y: y1
        });

        y2 += Math.round(Math.random() * 20 - 10);
        dataPoints2.push({
            x: i,
            y: y2
        });
    }

    res.json({data1: dataPoints1,data2: dataPoints2});

});

router.get('/me', ValidateJWT, (req, res, next) => {

    res.json({username: username});

});

module.exports = router;
