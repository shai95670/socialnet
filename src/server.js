const express = require('express');
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/signup', (req, res) => {
    res.send('Hello World!')
});

app.get('/signin', (req, res) => {
   res.send('Hello World!')
});

app.listen(PORT, () => console.log(`api listening on port ${PORT}!`));