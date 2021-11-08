const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: String,
    },
    tittle:{
        type: String,
        required: true,
        minlength: 5
    },
    text:{
        type: String,
        required: true,
        minlength: 5
    },
    author:{
        type: String,
        required: true,
    }

}, {
    timestamps: true, 
    toJSON:{
        virtuals: true,
        transform: (doc, ret) =>{
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            return ret;
        }
    }
})

const Post = mongoose.model('Post', schema);
module.exports = Post;