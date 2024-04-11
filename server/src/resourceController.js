import { db } from "@vercel/postgres";

// export async function getResource(req, res) {
//   const client = await db.connect();

//   if(req.params.hasOwnProperty('url')) {
//     const { url } = req.params;

//     try {
//       const {rows: resource} = await client.sql`
//       SELECT type, title, description, url, icon, logo, official_url, roadmap_url
//       FROM resource
//       WHERE url = ${url}
//       `;

//       if(resource) {
//         const resource = resource[0];

//         const {rows: resources} = await client.sql`
//         SELECT title, description, url
//         FROM resource
//         WHERE category_id = ${resource.id}
//         ORDER BY index
//         `;

//         if(resources) {
//           resource.resources = resources;
//         }

//         res.status(200).json({data: resource});
//       } else {
//         res.status(404).json({error: "Resource not found"});
//       }
//     } catch(error) {
//       if(!res.headersSent) {
//         res.status(500).json({error: "Server error"});
//       }
//     } finally {
//       client.release();
//     }
//   } else {
//     res.status(400).json({error: "ID Parameter is missing"});
//   }
// }

export async function getResource(req, res) {
  const client = await db.connect();
  try {
    const {rows: resource} = await client.sql`
    SELECT * FROM resource ORDER BY category_id, index
    `;

    if(resource) {
      res.status(200).json({data: resource});
    } else {
      res.status(404).json({error: "Resources not found"});
    }
  } catch(error) {
    if(!res.headersSent) {
      res.status(500).json({error: "Server error"});
    }
  } finally {
    client.release();
  }
}

export async function postResource(req, res) {
  const client = await db.connect();

  const {title, description, url, index, category_id} = req.body;
    
  if([title, description, url, category_id].every((value) => value !== undefined)) {
    try {
      const {rows: created} = await client.sql`
      INSERT INTO resource (title, description, url, index, category_id)
      SELECT ${title}, ${description}, ${url}, ${index || 0}, ${category_id || null}
      WHERE NOT EXISTS (SELECT 1 FROM resource WHERE category_id = ${category_id || null} AND url = ${url})
      `;

      if(created) {
        res.status(201).json({message: "Resource created"});
      } else {
        res.status(404).json({error: "Resource already exists"});
      }
    } catch(error) {
      if(!res.headersSent) {
        res.status(500).json({error: "Server error"});
      }
    } finally {
      client.release();
    }
  } else {
    res.status(400).json({error: "Body is missing"});
  }
}

export async function putResource(req, res) {
  const client = await db.connect();

  if(req.params.hasOwnProperty('id')) {
    const { id } = req.params;
    const {title, description, url, index, category_id} = req.body;
    
    if([title, description, url, index, category_id].some((value) => value !== undefined)) {
      try {
        const {rowCount: updated} = await client.sql`
        UPDATE category
        SET
          title = COALESCE(${title}, title),
          description = COALESCE(${description}, description),
          url = COALESCE(${url}, url),
          index = COALESCE(${parseInt(index)}, index),
          category_id = COALESCE(${parseInt(category_id)}, category_id)
        WHERE id = ${id}
        `;
  
        if(updated) {
          res.status(200).json({message: "Resource Updated"});
        } else {
          res.status(404).json({error: "Resource not found"});
        }
      } catch(error) {
        if(!res.headersSent) {
          res.status(500).json({error: "Server error"});
        }
      } finally {
        client.release();
      }
    } else {
      res.status(400).json({error: "Body is missing"});
    }
  } else {
    res.status(400).json({error: "ID Parameter is missing"});
  }
}

export async function deleteResource(req, res) {
  const client = await db.connect();

  if(req.params.hasOwnProperty('id')) {
    const { id } = req.params;

    try {
      const {rowCount: deleted} = await client.sql`DELETE FROM resource WHERE id = ${id}`;

      if(deleted) {
        res.status(200).json({message: "Resource deleted."});
      } else {
        res.status(404).json({error: "Resource not found."});
      }
    } catch(error) {
      if(!res.headersSent) {
        res.status(500).json({error: "Server error"});
      }
    } finally {
      client.release();
    }
  } else {
    res.status(400).json({error: "ID Parameter is missing"});
  }
}

