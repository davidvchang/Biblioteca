import { Router } from 'express';
import booksControllers from "../controllers/books.controller.js";
import authMiddleware  from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', booksControllers.getBooks)
router.post('/', authMiddleware, booksControllers.postBook)


router.get('/:id', authMiddleware, booksControllers.getOneBook)
router.put('/:id', authMiddleware, booksControllers.updateBook)
router.delete('/:id', authMiddleware, booksControllers.deleteBook)

export default router