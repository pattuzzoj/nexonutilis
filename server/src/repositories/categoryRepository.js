import { query } from "../utils/query.js";

async function getCategories(lastSync) {
  const {rows: categories} = await query(
    `
    SELECT id, parent_category_id, type, title, description, url, icon FROM category
    WHERE updated_at > $1 AND deleted_at IS NULL
    ORDER BY parent_category_id, index
    `,
    [lastSync]
  );
  return categories;
}

async function getDeletedCategories(lastSync) {
  try {
    const {rows: categories} = await query(
      `
      SELECT id FROM category
      WHERE deleted_at > $1
      `,
      [lastSync]
    );

    const deletedIds = categories.map(category => category.id);

    return deletedIds;
  } catch(error) {
    throw error;
  }
}

async function createCategory(category) {
  const {id, type = 'category', title, description, url, index = 0, icon = null, parent_category_id = null} = category;
  const {rows: created} = await query(
    `
    INSERT INTO category
    (id, type, title, description, url, index, icon, parent_category_id, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    `,
    [id, type, title, description, url, index, icon, parent_category_id]
  );

  return created;
}

async function updateCategoryById(category) {
  const {id, type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id} = category;
  const query =
  `
    UPDATE category
    SET
      type = COALESCE($2, type),
      title = COALESCE($3, title),
      description = COALESCE($4, description),
      url = COALESCE($5, url),
      index = COALESCE($6, index),
      icon = COALESCE($7, icon),
      logo = COALESCE($8, logo),
      official_url = COALESCE($9, official_url),
      roadmap_url = COALESCE($10, roadmap_url),
      parent_category_id = COALESCE($11, parent_category_id),
      updated_at = NOW()
    WHERE id = $1
  `
  const values = [id, type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id]

  const {rowCount: updated} = await query(query, values);
  return updated;
}

async function deleteCategoryById(id) {
  const {rowCount: deleted} = await query(`DELETE FROM category WHERE id = $1`, [id]);
  return deleted;
}

async function getMenu(id) {
  const {rows: categories} = await query(`SELECT * FROM category WHERE parent_category_id = $1`, [id]);
  return categories;
}

export {getCategories, getDeletedCategories, createCategory, updateCategoryById, deleteCategoryById, getMenu};