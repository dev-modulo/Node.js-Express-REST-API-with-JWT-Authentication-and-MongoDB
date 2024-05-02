const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body,
            author: req.user.id // Assuming auth middleware adds user id to req.user
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Placeholder for getAllPosts function
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', '-password');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Placeholder for getPostById function
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', '-password');

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
};


// Placeholder for updatePost function
exports.updatePost = async (req, res) => {
    const { title, body } = req.body;

    // Build post object
    const postFields = {};
    if (title) postFields.title = title;
    if (body) postFields.body = body;

    try {
        let post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // Check user
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post = await Post.findByIdAndUpdate(req.params.id, { $set: postFields }, { new: true });

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Placeholder for deletePost function
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // Check user
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.deleteOne()

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
};
