import { db } from '@vercel/postgres';

export const getResources = async (req, res) => {
  const client = await db.connect();

  try {
    const {url} = req.params;

    const {rows: categoryRow} = await client.sql`
    SELECT title, description, url, mode, logo, official, roadmap
    FROM categories WHERE url = ${url}
    `;
    
    const {rows: itemsOwned} = await client.sql`
    SELECT title, description, url
    FROM items WHERE category_owner = ${url}
    `;
    
    const category = categoryRow[0];
    
    if(category) {
      category.items = itemsOwned;
      
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

export const getAllResources = async (req, res) => {
  const client = await db.connect();

  try {
    const {rows: resourcesRows} = await client.sql`
    SELECT * FROM resources
    `;

    res.status(200).json(resourcesRows);
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}

export const setResource = async (req, res) => {
  const client = await db.connect();
  
  try {
    const {title, description, url, categoryOwner} = req.body;

    if(title && description && url && categoryOwner) {
      const {rowCount: created} =  await client.sql`
      INSERT INTO items (title, description, url, category_owner)
      SELECT ${title}, ${description}, ${url}, ${categoryOwner}
      WHERE
      EXISTS (SELECT 1 FROM categories WHERE url = ${categoryOwner})
      AND
      NOT EXISTS (SELECT 1 FROM items WHERE url = ${url} AND category_owner = ${categoryOwner})
      `;
      
      if(created) {
        res.status(200).send("Item created.");
      } else {
        res.status(400).send("Category does not exist or Item already exists.");
      }
    } else {
      res.status(400).send("title, description, url and categoryOwner as body is required.");
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}

export const populateResources = async (req, res) => {
  const client = await db.connect();

  try {
    req.body.forEach(async item => {
      const {title, description, url, categoryOwner} = item;
      const {rowCount: created} =  await client.sql`
      INSERT INTO items (title, description, url, category_owner)
      SELECT ${title}, ${description}, ${url}, ${categoryOwner}
      WHERE
      EXISTS (SELECT 1 FROM categories WHERE url = ${categoryOwner})
      AND
      NOT EXISTS (SELECT 1 FROM items WHERE url = ${url} AND category_owner = ${categoryOwner})
      `;
    });

    res.status(200).send("Items created.");
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}

export const modResource = async (req, res) => {
  const client = await db.connect();

  try {
    const {title, description, url, categoryOwner, newUrl, newCategoryOwner} = req.body;
    
    if(url) {
      const {rowCount: updated} = await client.sql`
      UPDATE items
      SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        url = COALESCE(${newUrl}, url),
        category_owner = COALESCE(${newCategoryOwner}, category_owner)
      WHERE url = ${url} AND category_owner = ${categoryOwner}
      `;

      if(updated) {
        res.status(200).send("Item updated.");
      } else {
        res.status(400).send("Item does not exist.");
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

export const delResource = async (req, res) => {
  const client = await db.connect();

  try {
    const {url} = req.params;

    const {rowCount: deleted} = await client.sql`DELETE FROM items WHERE url = ${'/' + url}`;
    
    if(deleted) {
      res.status(200).send("Item deleted.");
    } else {
      res.status(400).send("Item does not exist");
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).send(e);
    }
  } finally {
    client.release();
  }
}