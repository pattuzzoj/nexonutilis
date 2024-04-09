import { db } from '@vercel/postgres';

export const getResource = async (req, res) => {
  const client = await db.connect();

  try {
    const {url} = req.body;

    if(url) {
      const {rows: resourceRow} = await client.sql`
      SELECT type, title, description, url, icon, logo, official, roadmap
      FROM categories
      WHERE url = ${'/' + url}
      ORDER BY position
      `;
      
      const {rows: resourcesOwned} = await client.sql`
      SELECT title, description, url
      FROM resources
      WHERE category_url = ${'/' + url}
      ORDER BY position
      `;
      
      const resource = resourceRow[0];
      
      if(resource) {
        resource.resources = resourcesOwned;
        
        res.status(200).json({success: true, data: resource});
      } else {
        res.status(404).json({success: false, error: "Resource not found."});
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

export const getAllResources = async (req, res) => {
  const client = await db.connect();

  try {
    const {rows: resourcesRows} = await client.sql`
    SELECT * FROM resources ORDER BY category_url, position
    `;

    if(resourcesRows) {
      res.status(200).json({success: true, data: resourcesRows});
    } else {
      res.status(404).json({success: false, error: "Resources not found."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const setResource = async (req, res) => {
  const client = await db.connect();
  
  try {
    const {title, description, url, position, category_url} = req.body;

    if([title, description, url, category_url].every(Boolean)) {  
      const {rows: created} = await client.sql`
      INSERT INTO resources (title, description, url, position, category_url)
      SELECT ${title}, ${description}, ${url}, ${position}, ${category_url}
      WHERE
      EXISTS (SELECT 1 FROM categories WHERE url = ${category_url})
      AND
      NOT EXISTS (SELECT 1 FROM resources WHERE url = ${url} AND category_url = ${category_url})
      `;
      
      if(created) {
        res.status(200).json({success: true, message: "Resource created."});
      } else {
        res.status(400).json({success: false, error: "Category does not exist or Resource already exists."});
      }
    } else {
      res.status(400).json({success: false, error: "title, description, url, category_url as body is required."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const populateResources = async (req, res) => {
  const client = await db.connect();

  try {
    if(req.body.length) {
      req.body.forEach(async item => {
        const {title, description, url, position, category_url} = item;
        
        await client.sql`
        INSERT INTO resources (title, description, url, position, category_url)
        SELECT ${title}, ${description}, ${url}, ${position}, ${category_url}
        WHERE
        EXISTS (SELECT 1 FROM categories WHERE url = ${category_url})
        AND
        NOT EXISTS (SELECT 1 FROM resources WHERE url = ${url} AND category_url = ${category_url})
        `;
      });
  
      res.status(200).json({success: true, message: "Resources created."});
    } else {
      res.status(400).json({success: false, error: "At least one resource is required."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}

export const modResource = async (req, res) => {
  const client = await db.connect();

  try {
    const {id, title, description, url, position, category_url} = req.body;
    
    if(id && [title, description, url, position, category_url].some(Boolean)) {
      const {rowCount: updated} = await client.sql`
      UPDATE resources
      SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        url = COALESCE(${url}, url),
        position = COALESCE(${position}, position),
        category_url = COALESCE(${category_url}, category_url)
      WHERE id = ${id}
      `;

      if(updated) {
        res.status(200).json({success: true, message: "Resource updated."});
      } else {
        res.status(400).json({success: false, error: "Resource does not exist."});
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

export const delResource = async (req, res) => {
  const client = await db.connect();

  try {
    const {id} = req.body;

    if(id) {
      const {rowCount: deleted} = await client.sql`DELETE FROM resources WHERE id = ${id}`;
      
      if(deleted) {
        res.status(200).json({success: true, message: "Resource deleted."});
      } else {
        res.status(400).json({success: false, error: "Resource does not exist"});
      }
    } else {
      res.status(400).json({success: false, error: "id as body is required."});
    }
  } catch(e) {
    if(!res.headersSent) {
      res.status(500).json({success: false, error: e});
    }
  } finally {
    client.release();
  }
}