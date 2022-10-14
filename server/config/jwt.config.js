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
