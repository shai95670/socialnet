const express = require('express');
const router = express.Router();

// define the home page route
router.post('/signup', (req, res) => {
    let {
        name,
        email,
        password
    } = req.body;
    res.send('Birds home page');
})

module.exports = router