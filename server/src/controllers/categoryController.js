import { getMenu, getCategories, getDeletedCategories, createCategory, updateCategoryById, deleteCategoryById } from "../repositories/categoryRepository.js";

async function getData(req, res) {
  try {
    const categories = await getMenu(parseInt(req.params.id));

    res.status(200).json({data: categories});
  } catch(error) {
    res.status(500).json({message: error});
  }
}

async function getCategory(req, res) {
  const {lastSync = '2001-01-01T01:01:01.259Z'} = req.params;

  try {
    const categories = await getCategories(lastSync);
    const deletedCategories = await getDeletedCategories(lastSync);

    res.status(200).json({data: categories, deletedIds: [...deletedCategories]});
  } catch(error) {
    res.status(500).json({message: error});
  }
}

async function postCategory(req, res) {
  try {
    console.log(req.body);
    const created = await createCategory(req.body);
    
    if(created) {
      res.status(201).json({message: "Category created"});
    } else {
      res.status(409).json({message: "Category already exists"});
    }
  } catch(error) {
    res.status(500).json({message: error});
  }
}

async function populateCategory(req, res) {
  try {
    req.body.forEach(category => {
      createCategory(category);
    });
    
    res.status(201).json({message: "Categories created"});
  } catch(error) {
    res.status(500).json({message: error});
  }
}

async function putCategory(req, res) {
  const { id } = req.params;

  try {
    const updated = await updateCategoryById(parseInt(id), req.body);

    if(updated) {
      res.status(200).json({message: "Category updated"});
    } else {
      res.status(404).json({message: "Category does not exist"});
    }
  } catch(error) {
    res.status(500).json({message: error});
  }
}

async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    const deleted = await deleteCategoryById(parseInt(id));

    if(deleted) {
      res.status(200).json({message: "Category deleted"});
    } else {
      res.status(404).json({message: "Category does not exist"});
    }
  } catch(error) {
    res.status(500).json({message: error});
  }
}

export {getCategory, postCategory, populateCategory, putCategory, deleteCategory};