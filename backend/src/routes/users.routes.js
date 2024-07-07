import { Router } from 'express';
import usersController from "../controllers/users.controller.js";

const router = Router()

//REGISTRAR Y VER USUARIOS
router.get('/', usersController.getUsers)
router.post('/', usersController.register)

//INICIAR SESION
router.post('/login', usersController.login)

//CERRAR SESION
router.post('/logout', usersController.logout)

export default router