const jwt = require('jsonwebtoken');
const secret = "Top_secret@$#%^&&^Q#@@";
// it will generate the token and return it
module.exports.generateToken = (payload) => {
// takes the payload and secret key and return the token
    return jwt.sign(payload,secret,{
        expiresIn: '1h'
    })
}

module.exports.verifyToken = (token) => {
    try {
        const payload = jwt.verify(token,secret);
        return payload;
    } catch (error) 
{
        return null;
    }
}