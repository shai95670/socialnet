const {
    check,
} = require('express-validator');

const isValidPassword = (password) => {
    return check(password)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('should consist of: One digit, one lower case, one upper case')
}

module.exports = {
    isValidPassword: isValidPassword
};