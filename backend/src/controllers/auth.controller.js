import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModels from "../models/users.models.js";
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
  const {username, email, password} = req.body;

    try{
        const userFound = await UserModels.findOne({email})
        if(userFound) return res.status(400).json(["The email already exists"])
        
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
    
        const userSaved = await newUser.save();

        //Creación del Token
        const accessToken = await createAccessToken({id: userSaved._id});

        res.cookie('token', accessToken)
        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
    }

    catch(ex){
        res.status(500).json({message: ex.message})
    }
}

export const login = async (req, res) => {
  const {email, password} = req.body;

  try{
    // Buscar usuario por email
    const userFound = await UserModels.findOne({email});
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});

    // Crear y firmar JWT
    const accessToken = await createAccessToken({id: userFound._id});

    res.cookie('token', accessToken);
    res.json({
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


export const logout = (req, res) => {
  res.cookie("token", "", {
      expires: new Date(0)
  })
  return res.sendStatus(200)
}


//Ruta protegida
export const profile = async (req, res) => {
  const userFound = await UserModels.findById(req.user.id)
  if(!userFound) return res.status(400).json({ message: "User not found"})
  
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}