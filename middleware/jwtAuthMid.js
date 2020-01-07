const jwtServices = require("../controllers/JwtServices/Jwt");

// Create An express middleware function:
// should verify the users jwt 
// after verifying the correct token the user
// can access the protected api routes, ie :
// profile, posts
async function verifyUsersJwt(req, res, next) {
    // check for token in req object
    // if there isnt a token return an error
    // if there is a token verify it
    const {
        token,
        Username
    } = req.body

    if (token) {
        const Jwtservices = new jwtServices.JwtService({
            name: Username,
            user: true
        });

        let decodedPayLoad = Jwtservices.verifiyJwtToken(token);
        if (decodedPayLoad) {
            req.user = decodedPayLoad;
            next();
        } else {
            res.json({
                msg: 'Invalid token, access denied'
            });
        }
    } else {
        return res.json({
            msg: 'No token specified, , access denied'
        });
    }
};

module.exports = {
    verifyUsersJwt: verifyUsersJwt
};