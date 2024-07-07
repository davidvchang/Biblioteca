import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

//Mandar llamar a las variables de entorno
dotenv.config()

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.SECRET_TOKEN,
            {
                expiresIn: "1d",    
            }, 
            (err, token) => {
                if(err) reject(err)
                resolve(token)
            }
        );
    });
}
