var jwt = require('jsonwebtoken');

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], 'I AM NOT YOUR ENEMY, I AM THE ENEMY');
                console.log(req.jwt);
                return next();
            }
        } catch (err) {
            
            return res.status(403).send('Valid request with an invalid token');
        }
    } else {
        return res.status(401).send('invalid request');
    }
}; 

