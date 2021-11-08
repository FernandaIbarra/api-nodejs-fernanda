const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller');
const user = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../config/multer.config');

//User Router 
router.post('/users', upload.single("avatar"), user.create);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.get('/users/:id/activate', user.validate)

//Posts Routes
router.post('/posts', auth.isUserAuthtenticated, posts.create);
router.get('/posts', auth.isUserAuthtenticated, posts.getPosts);
router.get('/posts/:id', auth.isUserAuthtenticated, posts.getPost);
router.patch('/posts/:id', auth.isUserAuthtenticated, posts.updatePost);
router.delete('/posts/:id', auth.isUserAuthtenticated, posts.deletePost);


module.exports = router;