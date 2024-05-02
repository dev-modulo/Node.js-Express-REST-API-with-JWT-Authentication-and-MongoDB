require('dotenv').config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

// Initialize the Express app
const app = express();

// Middleware for parsing JSON bodies. This replaces bodyParser.json().
app.use(express.json());

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

// Use routes
app.use('/api/auth', authRoutes); // Use authRoutes with the '/api/auth' prefix
app.use('/api/posts', postRoutes); // Use postRoutes with the '/api/posts' prefix

// Basic route for testing
app.get('/', (req, res) => res.send('Hello World!'));

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
