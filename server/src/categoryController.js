import { db } from '@vercel/postgres';

export const getCategory = async (req, res) => {
  const client = await db.connect();

  try {
    const {url} = req.body;

    if(url) {
      const {rows: categoryRow} = await client.sql`
      SELECT type, title, description, url, icon
      FROM categories
      WHERE url = ${'/' + url}
      ORDER BY position
      `;
      
      const {rows: categoriesOwned} = await client.sql`
      SELECT type, title, description, url, icon
      FROM categories
      WHERE category_url = ${'/' + url}
      ORDER BY position
      `;
  
      const category = categoryRow[0];
  
      if(category) {
        category.resources = categoriesOwned;
  
        res.status(200).json({success: true, data: category});
      } else {
        res.status(404).json({success: false, error: "Category not found."});
      }
    } else {
      res.status(400).json({success: false, error: "url as body is required."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const getAllCategories = async (req, res) => {
  const client = await db.connect();

  try {
    const {rows: categoriesRows} = await client.sql`
    SELECT * FROM categories ORDER BY url, category_url, position
    `;

    res.status(200).json({success: true, data: categoriesRows});
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const setCategory = async (req, res) => {
  const client = await db.connect();

  try {
    const {type, title, description, url, icon, logo, official, roadmap, position, category_url} = req.body;

    if([type, title, description, url].every(Boolean)) {
      const {rows: created} = await client.sql`
      INSERT INTO categories (type, title, description, url, icon, logo, official, roadmap, position, category_url)
      SELECT ${type}, ${title}, ${description}, ${url}, ${icon}, ${logo}, ${official}, ${roadmap}, ${position}, ${category_url}
      WHERE NOT EXISTS (SELECT 1 FROM categories WHERE url = ${url})
      `;

      if(created) {
        res.status(200).json({success: true, message: "Category created."});
      } else {
        res.status(400).json({success: false, error: "Category already exists."});
      }
    } else {
      res.status(400).json({success: false, error: "type, title, description, url as body is required."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const populateCategories = async (req, res) => {
  const client = await db.connect();

  try {
    if(req.body.length) {
      req.body.forEach(async category => {
        const {type, title, description, url, icon, logo, official, roadmap, position, category_url} = category;
  
        await client.sql`
        INSERT INTO categories (type, title, description, url, icon, logo, official, roadmap, position, category_url)
        SELECT ${type}, ${title}, ${description}, ${url}, ${icon}, ${logo}, ${official}, ${roadmap}, ${position}, ${category_url}
        WHERE NOT EXISTS (SELECT 1 FROM categories WHERE url = ${url})
        `;
      })
  
      res.status(200).json({success: true, message: "Categories created."});
    } else {
      res.status(400).json({success: false, error: "No categories provided."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const modCategory = async (req, res) => {
  const client = await db.connect();

  try {
    const {id, type, title, description, url, icon, logo, official, roadmap, position, category_url} = req.body;
    
    if(id && [type, title, description, url, icon, logo, official, roadmap, position, category_url].some(Boolean)) {
      const {rowCount: updated} = await client.sql`
      UPDATE categories
      SET
        type = COALESCE(${type}, type),
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        url = COALESCE(${url}, url),
        icon = COALESCE(${icon}, icon),
        logo = COALESCE(${logo}, logo),
        official = COALESCE(${official}, official),
        roadmap = COALESCE(${roadmap}, roadmap),
        position = COALESCE(${position}, position),
        category_url = COALESCE(${category_url}, category_url)
      WHERE id = ${id}
      `;

      if(updated) {
        res.status(200).json({success: true, data: "Category updated."});
      } else {
        res.status(400).json({success: false, error: "Category does not exist."});
      }
    } else {
      res.status(400).json({success: false, error: "At least one property is required."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const delCategory = async (req, res) => {
  const client = await db.connect();

  try {
    const {url} = req.body;

    if(url) {
      await client.sql`BEGIN`;
      await client.sql`DELETE FROM resources WHERE category_url = ${'/' + url}`;
      const {rowCount: deleted} = await client.sql`DELETE FROM categories WHERE url = ${url};`;
      await client.sql`COMMIT`;
      
      if(deleted) {
        res.status(200).json({success: true, message: "Category deleted."});
      } else {
        res.status(400).json({success: false, error: "Category does not exist"});
      }
    } else {
      res.status(400).json({success: false, error: "id and url as body is required."});
    }
  } catch(e) {
    await client.sql`ROLLBACK`;

    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}