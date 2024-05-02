# Node.js Express REST API with JWT Authentication and MongoDB

This project is a Node.js Express application implementing a RESTful API with JSON Web Token (JWT) authentication for user registration, login, and blog post management. It utilizes MongoDB with Mongoose for data storage.

## Project Structure

- **`routes/authRoutes.js`**: Contains routes for user authentication (registration, login) and a protected route that requires authentication.
- **`routes/postRoutes.js`**: Contains routes for CRUD operations on blog posts.
- **`controllers/authController.js`**: Controller functions for user authentication.
- **`controllers/postController.js`**: Controller functions for managing blog posts.
- **`middleware/auth.js`**: Middleware for JWT authentication.
- **`models/User.js`**: Mongoose model for user schema.
- **`models/Post.js`**: Mongoose model for blog post schema.

## Technologies Used

- **Express.js**: Web framework for Node.js used to handle HTTP requests and routes.
- **MongoDB**: NoSQL database used for data storage.
- **Mongoose**: MongoDB object modeling tool used to define data schemas and interact with the database.
- **JSON Web Token (JWT)**: Token-based authentication mechanism used for securing API endpoints.
- **bcryptjs**: Library for hashing passwords securely.
- **dotenv**: Module for loading environment variables from a `.env` file.
- **body-parser**: Middleware for parsing incoming request bodies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **nodemon**: Utility for automatically restarting the server during development.

## API Endpoints

### Authentication

#### Register a New User

- **URL**: `POST /api/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password",
    "role": "author"
  }

- **Response**:
  ```json
  {
     "token": "token"
  }

#### Authenticate a user

- **URL**: `POST /api/auth/login`
- **Description**: Authenticate and log in a user.
- **Request Body**:
  ```json
  {
      "email": "user@example.com",
      "password": "password"
  }

- **Response**:
  ```json
  {
     "token": "token"
  }

### Blog Posts

#### Create a New Blog Post

- **URL**: `POST /api/posts/`
- **Description**:  Create a new blog post.
- **Request Body**:
  ```json
  {
    "title": "New Post",
    "body": "Content of the new post"
  }

- **Response**:
  ```json
  {
    "_id": "post_id",
    "title": "New Post",
    "body": "Content of the new post",
    "author": "user_id",
    "createdAt": "timestamp"
  }

#### Get Blog Posts

- **URL**: `GET /api/posts/`
- **Description**: Get all blog posts.
- **Response**:
  ```json
  {
      [
         {
            "_id": "post_id",
            "title": "Post Title",
            "body": "Post Content",
            "author": "user_id",
            "createdAt": "timestamp"
         },
         {
            "_id": "post_id",
            "title": "Another Post",
            "body": "More Content",
            "author": "user_id",
            "createdAt": "timestamp"
         }
      ]
  }



- **URL**: `GET /api/posts/:id`
- **Description**: Get a single blog post by ID.
- **Path Parameter**: `id` (Post ID)
- **Response**:
  ```json
  {
      "_id": "post_id",
      "title": "Post Title",
      "body": "Post Content",
      "author": "user_id",
      "createdAt": "timestamp"
   }


#### Update a Blog Post

- **URL**: `PUT /api/posts/:id`
- **Description**:  Update a blog post by ID.
- **Authentication**: Requires a valid JWT token in the Authorization header.
- **Path Parameter**: `id` (Post ID)
- **Request Body**:
  ```json
  {
    "title": "Updated Post Title",
    "body": "Updated content of the post."
  }

- **Response**:
  ```json
  {
    "_id": "post_id",
    "title": "Updated Post Title",
    "body": "Updated content of the post",
    "author": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }


#### Delete a Blog Post

- **URL**: `DELETE /api/posts/:id`
- **Description**:  Delete a blog post by ID.
- **Authentication**: Requires a valid JWT token in the Authorization header.
- **Path Parameter**: `id` (Post ID)
- **Response**:
  ```json
  {
    "message": "Post removed"
  }