const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        console.log("Check auth" + req.headers.authorization)
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decode =jwt.verify(token, "secret");
        req.userData = decode;
        next();
    } catch(error){
        res.status(401).json({
            message: "Auth Failed"
        })
    }
    
}