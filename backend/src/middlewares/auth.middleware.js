import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(401).json({ message: 'Token no es válido' });
    }
  };

  export default authMiddleware