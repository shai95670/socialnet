const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/db');
const authentication = require('./controllers/api/auth');
const posts = require('./controllers/api/posts');
const profile = require('./controllers/api/profile');
const signin = require('./controllers/api/signin');
const signup = require('./controllers/api/signup');

connectDB();

// App routes
app.get('/', (req, res) => res.send('Hello World!'));

// export routers for handlers
app.post('/signup', (req, res) => {
    signup.handleSignUp();
});

app.get('/signin', (req, res) => {
    signin.handleSignIn();
});

app.get('/auth', (req, res) => {
    authentication.handleAuthentication();
});

app.get('/profile', (req, res) => {
    profile.getProfile();
});

app.get('/post', (req, res) => {
    posts.getPost();
});


app.listen(PORT, () => console.log(`api listening on port ${PORT}!`));