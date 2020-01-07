const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('controllers/keys/private.key', 'utf8');
const publicKey = fs.readFileSync('controllers/keys/public.key', 'utf8');

let signOptions = {
    issuer: 'shai eisenhower',
    subject: '',
    audience: 'shaieisenhower@gmail.com',
    expiresIn: "12h",
    algorithm: "RS256"
};

class JwtService {
    constructor(payload) {
        this.signOptions = signOptions;
        this.payload = payload;
        this.publicKEY = publicKey;
        this.privateKey = privateKey;
    }

    get JWTWebToken() {
        let token = jwt.sign(this.payload, this.privateKey, this.signOptions);
        return token;
    }

    verifiyJwtToken(token) {
        var verifyOptions = {
            issuer: this.signOptions.issuer,
            subject: this.signOptions.subject,
            audience: this.signOptions.audience,
            expiresIn: this.signOptions.expiresIn,
            algorithm: ["RS256"]
        };

        try {
            return jwt.verify(token, this.publicKEY, verifyOptions);
        } catch (err) {
            return false;
        }
    }

    decode(token) {
        return jwt.decode(token, {
            complete: true
        });
    }
}

module.exports = {
    JwtService: JwtService
}