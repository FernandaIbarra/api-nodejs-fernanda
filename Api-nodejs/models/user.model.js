const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PASSWORD_PATTERN = /^.{8,}$/;
const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        match: [EMAIL_PATTERN, 'invalid email']

    },
    password: {
        type: String,
        required: 'A valid password is required',
        match: [PASSWORD_PATTERN, 'password is invalid']
    },
    bio:{
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false
    },
    activate: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        required: 'avatar is required',
        default: 'https://cdn.vectorstock.com/i/1000x1000/72/90/female-avatar-profile-icon-round-woman-face-vector-18307290.jpg'
    }
}, {
    timestamps: true, 
    toJSON:{
        virtuals: true,
        transform: (doc, ret) =>{
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            delete ret.password;
            return ret;
        }
    }
})
//Crypt password.
schema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.genSalt(10)
            .then(salt => {
           bcrypt.hash(this.password, salt)
                .then(hash => {
                    this.password = hash;
                    next();
                })
                .catch((err)=> next(err));
            })
            .catch((err)=> next(err));
    } else {
        next();
    }
});
schema.methods.checkPassword = function (password){
    return bcrypt.compare(password, this.password);
}
const User = mongoose.model('User', schema);
module.exports = User;