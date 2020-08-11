const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');


    // Check for token
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });


    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_PASS);

        // Take userId from token and set it in the req.user so that every time the
        // user is sent we have the user stored in the request value
        req.user = decodedToken;
        next();
    } catch (e) {
        if (!token) res.status(400).json({ msg: "Token is no longer valid" });
    }
}

module.exports = authenticationMiddleware;