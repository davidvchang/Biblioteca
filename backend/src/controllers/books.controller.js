import booksModels from '../models/books.models.js'

const booksController = {}

booksController.getBooks = async (req, res) => {
    //PARA QUE PERMITA BUSCAR POR NOMBRE Y GENERO
    const { search, genre } = req.query;
    let books;

    try {
        if (search && genre) {
            books = await booksModels.find({ 
                title: { $regex: search, $options: 'i' },
                genre: genre
            });
        } else if (search) {
            books = await booksModels.find({ title: { $regex: search, $options: 'i' } });
        } else if (genre) {
            books = await booksModels.find({ genre: genre });
        } else {
            books = await booksModels.find();
        }
    
        // const books = await booksModels.find()
        res.json(books)
        
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }

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
            res.status(201).json({message: "Created book"})
        }


    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
    
}

booksController.getOneBook = async (req, res) => {
    try {
        const book = await booksModels.findById(req.params.id)
        if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

        res.json(book)

    } catch (ex) {
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
}

booksController.deleteBook = async (req, res) => {
    try {
            const book = await booksModels.findByIdAndDelete(req.params.id)
            if (!book) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.json(book);
        
    } catch (ex) {
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
}

booksController.updateBook = async (req, res) => {
    const {title, author, year, genre, summary} = req.body

    try {
        const Books = await booksModels.findByIdAndUpdate(req.params.id, {
            title: title,
            author: author,
            year: year,
            genre: genre,
            summary: summary
        })

        if (!Books) return res.status(404).json({ message: 'Libro no encontrado' });

        res.json(Books)
        
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
}

export default booksController