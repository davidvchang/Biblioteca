import mongoose from 'mongoose'
import dotenv from "dotenv";

//Mandar llamar a las variables de entorno
dotenv.config()

const URI = process.env.MONGODB_URI || 'mongodb://localhost/dbtest'

export const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log(`Base de datos conectada`)
    } catch (ex) {
        console.log(`Ha ocurrido un error: ${ex}`)
    }
}