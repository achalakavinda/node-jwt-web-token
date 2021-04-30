const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const _token = req.header('auth-token');
    if(!_token) return res.status(401).send('access denied');
    try {
        const verified = jwt.verify(_token,'token_secreat')
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('invalide token');
    }
}

module.exports = auth;