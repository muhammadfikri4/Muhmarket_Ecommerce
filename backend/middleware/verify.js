const jwt = require('jsonwebtoken');

const verify = (req, res, next)  =>{
    const auth = req.headers['authorization'];
    const token = auth && auth.split(" ")[1];
    if(token === null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.email = result.email;
        next();
    })
}

module.exports = verify;