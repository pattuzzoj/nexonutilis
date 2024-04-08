import express from 'express';
import { getCategory, getAllCategories, setCategory, populateCategories, modCategory, delCategory } from './categoryController.js';
import { getResource, getAllResources, setResource, populateResources, modResource, delResource } from './resourceController.js';

const router = express.Router();

// GET
router.get('/category/:url', getCategory);
router.get('/categories', getAllCategories);

router.get('/resource/:url', getResource);
router.get('/resources', getAllResources);

// POST
router.post('/category', setCategory);
router.post('/categories', populateCategories);

router.post('/resource', setResource);
router.post('/resources', populateResources);

// PUT
router.put('/category', modCategory);
router.put('/resource', modResource);

// DELETE
router.delete('/category/:url', delCategory);
router.delete('/resource/:url', delResource);

export default router;