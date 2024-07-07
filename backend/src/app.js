import express from 'express'
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import bookRoutes from "./routes/books.routes.js";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express()

//SETTINGS
app.set('port', process.env.PORT || 4000)

//MIDDLEWARES
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto por el puerto correcto de tu frontend
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(helmet()) // Añadir seguridad de encabezados HTTP
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

//ROUTES
app.use('/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)

export default app