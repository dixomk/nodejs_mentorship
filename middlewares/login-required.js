const jwt = require('jsonwebtoken');
const config = require('../config');

function loginRequired(req, res, next) {
    const{jwtSecret} = config.jwt;
    const token = req.headers && req.headers.authorization;

    try{
        jwt.verify(token, jwtSecret);
        next();
    }catch(err) {
        res.status('401')
            .json({
                "code": "401",
                "message": "Not Authorized"
            });
    }
    
}

module.exports = loginRequired;