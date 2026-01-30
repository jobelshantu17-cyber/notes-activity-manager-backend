//Import jwt
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
     
    try{
        //Get token from request header
        const authHeader = req.headers.authorization
        
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        //verify token from request headers
        //Decode token
        const decoded = jwt.verify(token, process.env.jwt_secret)

        //Attach userId to request
        req.user = { userId: decoded.userId };

        //Allow request to continue
        next();
        


    }catch(err){
        return res.status(401).json({ message: "Invalid or expired token" })

    }
}

module.exports = authMiddleware;







