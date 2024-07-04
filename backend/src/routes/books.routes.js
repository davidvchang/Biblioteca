import { Router } from 'express';
import booksControllers from "../controllers/books.controller.js";

const router = Router()

router.route('/')
    .get(booksControllers.getBooks)
    .post(booksControllers.postBook)

router.route('/:id')
    .get(booksControllers.getOneBook)
    .put(booksControllers.updateBook)
    .delete(booksControllers.deleteBook)

export default router