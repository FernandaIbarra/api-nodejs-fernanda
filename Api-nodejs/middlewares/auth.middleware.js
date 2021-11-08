const User = require('../models/user.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken')

module.exports.loadUser = (req, res, next) => {
    if(req.session.userId){
        User.findById(req.session.userId)
        .then((user) => {
            if(user) {
            req.user = user;
            }
            next();
        })
        .catch(next);
    } else if (req.headers.authorization){
        const token = req.headers.authorization.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                console.error('token error: ', err);
                next();
            }else{
                User.findById(decoded.sub)
                .then((user) =>{
                    if(user){
                        req.user = user;
                    }
                    next();                         
                })
                .catch(next);              
            }
        });
    } else {
        next();
    }
};

module.exports.isUserAuthtenticated = (req, res, next) => {
    if(req.user){
        next();
    }else{
        next(createError(401, 'Unauthorized'))
    }

}