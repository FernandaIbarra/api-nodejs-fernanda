const User = require('../models/user.model');
const createError = require('http-errors');
const mailer = require('../config/mailer.config');
const jwt = require('jsonwebtoken');

const notFound = 'User not found';

//Creates new User
module.exports.create = (req, res, next) => {
    const body =({ name, email, password, bio} = req.body);
  
    User.create(body)
      .then((user) => {
        mailer.sendValidationEmail(user);
        res.status(201).json(user)      
      })
      .catch(next)
  }

//login
module.exports.login = (req, res, next) => {
    const body = ({ email, password } = req.body);

    User.findOne({ email, activate: true }).then((user)=>{
        if(user){
            user.checkPassword(password)
            .then((match) => {
                if(match){
                    //Cookie auth
                    // console.log(req.session);
                    // req.session.userId = user.id;
                    // res.json(user);

                    //Jwt Auth
                    const token = jwt.sign({
                        sub: user.id,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    }, 
                    process.env.JWT_SECRET
                    );
                    res.json({
                        accessToken: token,
                    })

                }else{
                    next(createError(404, notFound));
                }
            })
            .catch(next);
        }else{
            next(createError(404, notFound));
        }
    })
    .catch(next);
};

//logout.
module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.status(204).send();
}

//validates user.
module.exports.validate = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {activate: true}, {new: true})
        .then((user)=>{
            if (user){
                res.json(user);
            }else{
                next(createError(404, notFound))
            }
        })
        .catch(next)
}