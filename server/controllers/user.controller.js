const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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
                })
            })
            .catch((err) => {
                console.log("register not succesful!", err);
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
                                console.log("Great")
                                res.cookie(
                                    "userToken",
                                    jwt.sign(
                                        {
                                            id: userRecord,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.FIRST_SECRET_KEY
                                    ),
                                        {
                                            httpOnly: true,
                                            expires: new Date(Date.now() + 9000000)
                                        }
                                ).json({
                                    message: "Succesfully",
                                    userLoggedIn: userRecord.email,
                                    userLoggedIn: userRecord.username
                                    // userId: userRecord._id
                                })
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



// module.exports.register = async (request, response) => {
//     const { body } = request;
//     try {
//         const queriedUser = await User.findOne({ email: body.email });
//         if (queriedUser) {
//             console.log(queriedUser);
//             response.status(400).json({ errMsg: "This user already exists!" });
//             // always return or else it will continue running!
//             return;
//         }
//     } catch (err) {
//         response.status(400).json(err)
//     }
//     try{
//         const user = await User.create(request.body);
//         const userToken = jwt.sign({
//             _id: user._id
//         }, process.env.FIRST_SECRET_KEY);
//         console.log(userToken);
//         response.cookie("userToken", userToken, process.env.SECRET_KEY, {
//             httpOnly: true
//         })
//         response.json({ msg: "Success!", user: user });
//     } catch(err) {
//         response.status(400).json(err);
//     }
// };

// module.exports.login = async (request, response) => {
//     const { body } = request;
//     if (!body.email) {
//         response.status(400).json({ errMsg: "No Email Provided! - please enter an email!"});
//         return;
//     }
//     let userQuery;
//     try {
//         userQuery = await User.findOne({ email: body.email });
//         if (userQuery === null) {
//             response.status(400).json({ errMsg: "Email Not Found!" });
//         }
//     } catch (err) {
//         response.status(400).json(err);
//     }
//     const passwordCheck = bcrypt.compareSync(body.password, userQuery.password);
//     if (!passwordCheck) {
//         response.status(400).json({error: "email and passowrd do not match!"});
//         return;
//     }
//     const userToken = jwt.sign({_id: userQuery._id}, process.env.FIRST_SECRET_KEY);
//     console.log(userToken);
//     response.cookie("userToken", userToken, process.env.FIRST_SECRET_KEY, {
//         httpOnly: true,
//     })
//     .json({ msg: "successful login YES!", userQuery: userQuery });
// };

// module.exports.logout = async (request, response) => {
//     response.clearCookie("userToken");
//     response.json({msg: "logout successful!"});
// };


// module.exports.getAllUsers = (request, response) => {
//     User.find({})
//         .then(users => {
//             console.log(users);
//             response.json(users);
//         })
//         .catch(err => {
//             console.log(err);
//             response.json(err);
//         })
// }

// module.exports.getUser = (request, response) => {
//     User.findOne({_id: request.params.id})
//         .then(user => response.json(user))
//         .catch(err => response.json(err))
// }