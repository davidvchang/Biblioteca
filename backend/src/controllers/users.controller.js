import userModels from '../models/users.models.js'
import bcrypt from "bcryptjs";
import {createAccessToken} from '../libs/jwt.js'

const usersController = {}

usersController.getUsers = async (req, res) => {
    try {
        const users = await userModels.find()
        res.json(users)
        
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
}

usersController.register = async (req, res) => {
    const {userName, email, password} = req.body

    try {
        const userFound = await userModels.findOne({email})
    
        if(userFound) {
            res.status(400).json(["The user already exists"])
        } 
        else {
            //Encriptar contraseña
            const passwordHash = await bcrypt.hash(password, 10)
        
            const newUser = new userModels({
                userName: userName,
                email: email,
                password: passwordHash
            })
        
            await newUser.save()
            res.status(201).json({message: "Created user"})
        }
        
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }

}

usersController.login = async (req, res) => {
    const {email, password} = req.body;
  
    try{
      // Buscar usuario por email
      const userFound = await userModels.findOne({email});
      if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});
  
      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, userFound.password);
      if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});
  
      // Crear y firmar JWT
      const token = await createAccessToken({id: userFound._id});
  
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none'
      });
      res.json({
        token,
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      })
    }
  
    catch(ex){
        res.status(500).json({message: ex.message})
    }
  };

usersController.logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
  }

export default usersController