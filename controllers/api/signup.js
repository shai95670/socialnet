const express = require('express');
const User = require('../../models/user');
//const router = express.Router();


const handleSignUp = (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

}



module.exports = {
    handleSignUp: handleSignUp
};