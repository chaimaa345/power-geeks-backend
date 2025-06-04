const express = require('express');

const router = express.Router();
const secauth = require('../middleware/secauth');
const postController = require('../controllers/postController');


// Public routes

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);


// Protected routes

router.post('/', secauth, postController.createPost);

router.put('/:id', secauth, postController.updatePost);

router.delete('/:id', secauth, postController.deletePost);


module.exports = router;