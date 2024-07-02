import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true, //Quitar espacios
        unique: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
}, {
    //Se guarad la fecha en que se creó y actualizó
    timestamps: true
})

//User es el nombre que se le dió al modelo
const users = mongoose.model('User', usersSchema)

export default users