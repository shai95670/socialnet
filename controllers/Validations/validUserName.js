const {
    check,
} = require('express-validator');

const isValidUserName = (username) => {
    return check(username).isLength({
        min: 2
    }).withMessage('userName must be at least 4 chars long!');
}

// const isUserNameEmpthy = (username) => {
//     return check(username, 'UserName is required')
//         .not
//         .isEmpty
// }

module.exports = {
    isValidUserName: isValidUserName,
    //isUserNameEmpthy: isUserNameEmpthy
};