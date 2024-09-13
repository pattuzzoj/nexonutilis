import { query } from "../utils/query.js";

async function getResources(lastSync) {
  try {
    const {rows: resources} = await query(
      `
      SELECT * FROM resource
      WHERE updated_at > $1 AND deleted_at IS NULL
      ORDER BY id, index
      `,
      [lastSync]
    );
    return resources;
  } catch(error) {
    throw error;
  }
}

async function getDeletedResources(lastSync) {
  try {
    const {rows: resources} = await query(
      `
      SELECT id FROM resource
      WHERE deleted_at > $1
      `,
      [lastSync]
    );
    return resources;
  } catch(error) {
    throw error;
  }
}

async function createResource(body) {
  const {title, description, url, index = 0, category_id} = body;

  try {
    const {rows: created} = await query(
      `
      INSERT INTO resource
      (title, description, url, index, category_id, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      `,
      [title, description, url, index, category_id]);

    return created;
  } catch (error) {
    throw error;
  }
}

async function updateResourceById(id, body) {
  const {title, description, url, index, category_id} = body;

  try {
    const {rowCount: updated} = await query(
      `
      UPDATE resource
      SET
      title = COALESCE($2, title),
      description = COALESCE($3, description),
      url = COALESCE($4, url),
      index = COALESCE($5, index),
      category_id = COALESCE($6, category_id),
      updated_at = NOW()
      WHERE id = $1
      `,
      [id, title, description, url, index, category_id]);

    return updated;
  } catch (error) {
    throw error;
  }
}

async function deleteResourceById(id) {
  try {
    const {rowCount: deleted} = await query(`DELETE FROM resource WHERE id = $1`, [id]);
    return deleted;
  } catch(error) {
    throw error;
  }
}

export {getResources, getDeletedResources, createResource, updateResourceById, deleteResourceById}