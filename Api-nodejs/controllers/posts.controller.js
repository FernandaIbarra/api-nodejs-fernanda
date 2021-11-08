const Post = require('../models/post.model');
const createError = require('http-errors');

const notFound = 'Post not found';

//Creates new Post
module.exports.create = (req, res, next) => {
    const body = { text } = req.body
  
    Post.create({
      ...body
    })
      .then(post => 
        res.status(201).json(post)
        )
      .catch(next)
  }

//Gets all Post
module.exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts =>{
            res.json(posts)
        })
        .catch(next)
}

//Gets a post by id
module.exports.getPost = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post =>{
            if(post){
                res.json(post);
            }else{
                next(createError(404, notFound))
            }
        })
        .catch(next)
}

//Updates a post by id
module.exports.updatePost= (req, res, next) => {
    const body = { text, tittle, author } = req.body

    Post.findByIdAndUpdate(req.params.id, body, {new: true})
        .then(post =>{
            if(post){
                res.json(post);
            }else{
                next(createError(404, notFound))
            }
        })
        .catch(next)
}

//Deletes a post by id
module.exports.deletePost = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(204).send();
        })
        .catch(next)
}