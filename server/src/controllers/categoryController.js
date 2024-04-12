import { getCategories, createCategory, updateCategoryById, deleteCategoryById } from "../repositories/categoryRepository.js";

export async function getCategory(req, res) {
  try {
    const categories = await getCategories();

    res.status(200).json({data: categories});
  } catch(error) {
    res.status(500).json({message: error});
  }
}

export async function postCategory(req, res) {
  try {
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

export async function putCategory(req, res) {
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

export async function deleteCategory(req, res) {
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