var UserModel = require("../models/users.model");
var crypto = require("crypto");
var jwt = require('jsonwebtoken');
//-------------------------------------------------------------
// Login
exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + 'I AM NOT YOUR ENEMY, I AM THE ENEMY';
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, 'I AM NOT YOUR ENEMY, I AM THE ENEMY');
        let b = new Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
  };