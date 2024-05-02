const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const auth = require('../middleware/auth'); // Import the auth middleware

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Example protected route that requires authentication
router.get('/protected', auth, (req, res) => {
    // If this route is reached, it means the auth middleware has successfully verified the user's token
    res.json({ msg: "You have access to the protected data because you're authenticated." });
});

module.exports = router;
