import express from 'express';
import { getCategories, getAllCategories, setCategory, populateCategories, modCategory, delCategory } from './categoryController.js';
import { getResources, getAllResources, setResource, populateResources, modResource, delResource } from './resourceController.js';

const router = express.Router();

router.get('/categories', getAllCategories);
router.get('/categories/:url', getCategories);
router.get('/resources', getAllResources);
router.get('/resources/:url', getResources);

router.post('/categories/populate', populateCategories);
router.post('/resources/populate', populateResources);

router.post('/categories', setCategory);
router.post('/resources', setResource);

router.put('/categories', modCategory);
router.put('/resources', modResource);

router.delete('/categories/:url', delCategory);
router.delete('/resources/:url', delResource);

export default router;