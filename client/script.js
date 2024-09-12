function buildCategoryHierarchy(parentId = 0, parentURL) {
  const categoryTree = [];

  categories.forEach(category => {
    if(category.parent_category_id === parentId) {
      if(parentURL) {
        category.url = `${parentURL}${category.url}`;
      }

      const subcategories = buildCategoryHierarchy(category.id, category.url);
      const categoryObject = { ...category, items: subcategories };
      categoryTree.push(categoryObject);
    }
  })

  return categoryTree;
}