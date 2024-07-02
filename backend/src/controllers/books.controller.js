import booksModels from '../models/books.models.js'

const booksController = {}

booksController.getBooks = async (req, res) => {
    const books = await booksModels.find()
    res.json(books)
}

booksController.postBook = async (req, res) => {
    const {title, author, year, genre, summary} = req.body

    try {
        const bookFound = await booksModels.findOne({title})

        if(bookFound) {
            res.status(400).json(["The book already exists"])
        } 

        else {
            const newBook = new booksModels({
            title: title,
            author: author,
            year: year,
            genre: genre,
            summary: summary
            })
    
            await newBook.save()
            res.status(200).json({message: "Created book"})
        }


    } catch (ex) {
        res.json({message: ex})
    }
    
}

booksController.getOneBook = async (req, res) => {
    const book = await booksModels.findById(req.params.id)
    res.json(book)
}

booksController.deleteBook = async (req, res) => {
    const book = await booksModels.findByIdAndDelete(req.params.id)
    res.json(book)
}

booksController.updateBook = async (req, res) => {
    const {title, author, year, genre, summary} = req.body
    const Books = await booksModels.findByIdAndUpdate(req.params.id, {
        title: title,
        author: author,
        year: year,
        genre: genre,
        summary: summary
    })
    res.json(Books)
}

export default booksController