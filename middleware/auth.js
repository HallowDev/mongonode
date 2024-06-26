const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        //decoded the token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        //save userId in req.auth var
        req.auth = { userId };
        next();
    } catch (err) {
        res.status(401).json({error: 'Requête refusée!'});
    }
};
