import express from 'express';
import { getCategory, deleteCategory } from './controllers/categoryController.js';

const router = express.Router();

router.get('/category', getCategory);
// router.get('/resource', getResource);

// router.post('/category', postCategory);
// router.post('/resource', postResource);

// router.put('/category/:id', putCategory);
// router.put('/resource/:id', putResource);
// router.delete('/resource/:id', deleteResource);

router.delete('/category/:id', deleteCategory);

export default router;