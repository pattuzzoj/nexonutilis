import { getCategories, deleteCategoryById } from "../repositories/categoryRepository";

export async function getCategory(req, res) {
  try {
    const categories = await getCategories();

    res.status(200).json({data: categories});
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
      res.status(404).json({message: "Category not found"});
    }
  } catch(error) {
    res.status(500).json({message: error});
  }
}