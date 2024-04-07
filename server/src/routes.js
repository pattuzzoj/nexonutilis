import express from 'express';
import { getCategories, setCategory, modCategory, delCategory } from './categoryController.js';
import { getItems, setItem, modItem, delItem } from './itemController.js';

const router = express.Router();

router.get('/categories/:url', getCategories);
router.get('/items/:url', getItems);

router.post('/categories', setCategory);
router.post('/items', setItem);

router.put('/categories', modCategory);
router.put('/items', modItem);

router.delete('/categories/:url', delCategory);
router.delete('/items/:url', delItem);

export default router;