import { query } from "../utils/query.js";

export async function getCategories() {
  try {
    const {rows: categories} = await query(`SELECT * FROM category ORDER BY index`);
    return categories;
  } catch(error) {
    throw error;
  }
}

export async function createCategory(body) {
  const {type = 0, title, description, url, index = 0, icon = null, logo = null, official_url = null, roadmap_url = null, parent_category_id = null} = body;

  try {
    const {rows: created} = await query(
      `
      INSERT INTO category
      (type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id]
    );

    return created;
  } catch(error) {
    throw error;
  }
}

export async function updateCategoryById(id, body) {
  const {type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id} = body;

  try {
    const {rowCount: updated} = await query(
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
        parent_category_id = COALESCE($11, parent_category_id)
      WHERE id = $1
      `,
      [id, type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id]
    );

    return updated;
  } catch(error) {
    throw error;
  }
}

export async function deleteCategoryById(id) {
  try {
    const {rowCount: deleted} = await query(`DELETE FROM category WHERE id = $1`, [id]);
    return deleted;
  } catch(error) {
    throw error;
  }
}