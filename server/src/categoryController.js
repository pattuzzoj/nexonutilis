import { db } from '@vercel/postgres';

export const getCategories = async (req, res) => {
  const client = await db.connect();

  try {
    const {url} = req.params;
    
    const {rows: categoryRow} = await client.sql`
    SELECT title, description, url
    FROM categories WHERE url = ${'/' + url}
    `;
    
    const {rows: categoriesOwned} = await client.sql`
    SELECT title, description, url
    FROM categories WHERE category_owner = ${'/' + url}
    `;

    const category = categoryRow[0];

    if(category) {
      category.items = categoriesOwned;

      res.status(200).json(category);
    } else {
      res.status(404).send("Category not found.");
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}

export const setCategory = async (req, res) => {
  const client = await db.connect();

  try {
    const {type, title, description, url} = req.body;

    if(type && title && description && url) {
      const {mode, logo, official, roadmap, categoryOwner} = req.body;

      const {rowCount: created} = await client.sql`
      INSERT INTO categories (title, description, url, mode, logo, official, roadmap, category_owner)
      SELECT ${title}, ${description}, ${url}, ${mode}, ${logo}, ${official}, ${roadmap}, ${categoryOwner}
      WHERE NOT EXISTS (SELECT 1 FROM categories WHERE url = ${url})
      `;

      if(created) {
        res.status(200).send("Category created.");
      } else {
        res.status(400).send("Category already exists.");
      }
    } else {
      res.status(400).send("type, title, description, url as body is required.");
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}

export const modCategory = async (req, res) => {
  const client = await db.connect();

  try {
    const {type, title, description, url, mode, logo, official, roadmap, categoryOwner, newUrl} = req.body;
    
    if(url) {
      const {rowCount: updated} = await client.sql`
      UPDATE categories
      SET
        type = COALESCE(${type}, type),
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        url = COALESCE(${newUrl}, url),
        mode = COALESCE(${mode}, mode),
        logo = COALESCE(${logo}, logo),
        official = COALESCE(${official}, official),
        roadmap = COALESCE(${roadmap}, roadmap),
        category_owner = COALESCE(${categoryOwner}, category_owner)
      WHERE url = ${url}
      `;

      if(updated) {
        res.status(200).send("Category updated.");
      } else {
        res.status(400).send("Category does not exist.");
      }
    } else {
      res.status(400).send("type, title, description, url as body is required.");
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}

export const delCategory = async (req, res) => {
  const client = await db.connect();

  try {
    const {url} = req.params;

    await client.sql`BEGIN`;
    await client.sql`DELETE FROM items WHERE category_owner = ${'/' + url}`;
    const {rowCount: deleted} = await client.sql`DELETE FROM categories WHERE url = ${'/' + url};`;
    await client.sql`COMMIT`;
    
    if(deleted) {
      res.status(200).send("Category deleted.");
    } else {
      res.status(400).send("Category does not exist");
    }
  } catch(e) {
    await client.sql`ROLLBACK`;

    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}