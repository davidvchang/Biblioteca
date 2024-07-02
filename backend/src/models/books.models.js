import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: String,

    year: {
        type: Number,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true,
    },
}, {
    //Se guarad la fecha en que se creó y actualizó
    timestamps: true
})

//Book es el nombre que se le dió al modelo
const books = mongoose.model('Book', booksSchema)

export default books