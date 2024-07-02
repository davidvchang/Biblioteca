import express from 'express'
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";

import bookRoutes from "./routes/books.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express()

//SETTINGS
app.set('port', process.env.PORT || 4000)

//MIDDLEWARES
app.use(helmet()) // Añadir seguridad de encabezados HTTP
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//ROUTES
app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)

export default app