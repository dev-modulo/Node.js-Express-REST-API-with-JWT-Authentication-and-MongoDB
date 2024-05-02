const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');

// Routes for blog posts
router.post('/', auth, createPost); // Create a new post
router.get('/', getAllPosts); // Get all posts
router.get('/:id', getPostById); // Get a single post by ID
router.put('/:id', auth, updatePost); // Update a post
router.delete('/:id', auth, deletePost); // Delete a post

module.exports = router;
