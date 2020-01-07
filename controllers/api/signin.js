const User = require("../../models/user");
const jwtServices = require("../JwtServices/Jwt");


async function handleSignIn(req, res, bcrypt) {
    const {
        Username,
        Useremail,
        Userpassword
    } = req.body;

    try {
        let user = await User.findOne({
                email: Useremail
            },
            "hash id"
        );

        const Jwtservices = new jwtServices.JwtService({
            id: user.id,
            name: Username,
            user: true
        });

        Jwtservices.signOptions.subject = Useremail;

        let isUserPassword = await bcrypt.compare(Userpassword, user.hash);

        if (isUserPassword) {
            res.json({
                token: Jwtservices.JWTWebToken
            });
        } else {
            res.json({
                failed: "Wrong credentials"
            });
        }
    } catch (error) {
        res.status(400).send('bad request');
    }
};

module.exports = {
    handleSignIn: handleSignIn
};