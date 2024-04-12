import { QueryArrayResult, db } from "@vercel/postgres";

async function query(query, values = []) {
  const client = await db.connect();

  try {
    const queryResult = await client.query(query, values);
    return queryResult;
  } catch(error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function getCategoryById(id) {
  try {
    const {rows: [category]} = await query(
      `
      SELECT *
      FROM category
      WHERE id = $1
      `,
      [id]
    );

    return category;
  } catch(error) {
    throw error;
  }
}

export async function getCategories() {
  try {
    const {rows: categories} = await query(
      `
      SELECT *
      FROM category
      `
    );

    return categories;
  } catch(error) {
    throw error;
  }
}

export async function createCategory(body) {
  const {type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id} = body;

  try {
    const {rows: [created]} = await query(
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