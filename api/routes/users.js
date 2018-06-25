var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(users => {
            res.status(200).json({
                results: users
            })
        })
});

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1){
                res.status(409).json({
                    message: "This email already exist"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created successfully"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "Error while creating user"
                                })
                            })
                    }
                })
            }            
        })
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    console.log(req.body.email + " " + req.body.password )
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            console.log("user exist " + user[0].email)
             if(user.length < 1){                 
                 return res.status(401).json({
                     message: 'Auth failed'
                 });
             }
             bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                } 
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, "secret", {expiresIn: "1h"})
                     return res.status(200).json({
                         message: 'Auth Successful',
                         token: token
                     })
                 }
                 res.status(401).json({
                    message: 'Auth failed'                    
                });
             });           
        })
        .catch(err => {
            res.status(500).json({
                message: "Error while fetching user"
            })
        })
});

router.delete('/:userid', (req, res, next) => {
    User.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error while deleting user"
            })
        })
});

module.exports = router;