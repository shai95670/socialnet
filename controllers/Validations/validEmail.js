const {
    check,
} = require('express-validator');
const User = require("../../models/user");

const isValidEmail = (email) => {
    return check(email).isEmail();
}

const isEmailInUse = (email) => {
    return check(email).custom(value => {

        User.findOne({
            'email': value
        }, 'email', function (err, user) {
            if (err) return err;
            if (user.email) {
                return Promise.reject('E-mail already in use');
            }
        });
    })
}

module.exports = {
    isValidEmail: isValidEmail
};