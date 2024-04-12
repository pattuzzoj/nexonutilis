import express from 'express';
import { getCategory, postCategory, putCategory, deleteCategory } from './controllers/categoryController.js';
import { getResource, postResource, putResource, deleteResource } from './controllers/resourceController.js';

const router = express.Router();

router.get('/category', getCategory);
router.get('/resource', getResource);

router.post('/category', postCategory);
router.post('/resource', postResource);

router.put('/category/:id', putCategory);
router.put('/resource/:id', putResource);

router.delete('/category/:id', deleteCategory);
router.delete('/resource/:id', deleteResource);

export default router;