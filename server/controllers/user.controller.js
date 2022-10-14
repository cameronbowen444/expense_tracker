const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    register: (req, res) => {
        const user = new User(req.body);

        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log("Success!! New User created");
                res.json({
                    successMessage: "Thank you for registering!",
                    user: newUser
                });
            })
            .catch((err) => {
                console.log("register not succesful!");
                res.status(400).json(err);
            })
    },

    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord) => {
                if (userRecord === null){
                    res.status(400).json({message: "Invalid Login Attempt"})
                }
                else{
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid){
                                console.log("Great, Password is valid");
                                res.cookie(
                                    "userToken",
                                    jwt.sign(
                                        {
                                            id: userRecord_id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.FIRST_SECRET_KEY
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    },
                                ).json({
                                    message: "Succesfully",
                                    userLoggedIn: userRecord.username
                                });
                            }
                            else{
                                res.status(400).json({message: "Invalid Attempt"});
                            }
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(400).json({message: "Invalid Attempt"});
                        })
                }
            })
            .catch((error)=> {
                console.log(error);
                res.status(400).json({message: "Invalid Attempt"})
            })
    },

    logout: (req, res) => {
        console.log("logging out!");
        res.clearCookie("userToken");
        res.json({ msg: "You Have successfuly logged out!" });
    },

    getLoggedInUser: (req, res) => {
        User.findOne({_id: req.jwtpayload.id})
            .then((user)=> {
                res.json(user);
            })
            .catch((err) => {
                res.json(err);
            })
    }
}


