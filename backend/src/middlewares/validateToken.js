import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authRequired = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "No token, authorization denied"})
    
    jwt.verify(token, process.env.SECRET_TOKEN, (ex, user) => {
        if(ex) return res.status(401).json({message: "Invalid token"})
        
        req.user = user

        next();
    })
}