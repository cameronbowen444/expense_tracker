const jwt = require('jsonwebtoken');

module.exports = {
    authenticateJwt(req, res, next){
        jwt.verify(req.cookies.userToken,
            process.env.FIRST_SECRET_KEY,
            (err, payload)=> {
                if(err){
                    console.log(err);
                    res.status(401).json({verified: false})
                }
                else{
                    console.log(payload);
                    req.jwtpayload = payload;
                    next();
                }
            }
            )
    }
}



// const authenticateJwt = async (req, res, next) => {
//     try {
//         decodedJwt = await jwt.verify(
//             req.cookies.userToken,
//             process.env.FIRST_SECRET_KEY
//         );
//         req.body.user_id = decodedJwt._id;
//         console.log("SUCCESS", decodedJwt);
//         next();
//     } catch(error){
//         console.log("TOKEN ERROR!");
//         console.log(error);
//         res.status(400).json({ errorMessage: "You must be logged in to do that!"});
//     }
// };


// module.exports = { authenticateJwt }