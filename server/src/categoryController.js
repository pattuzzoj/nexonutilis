import { db } from "@vercel/postgres";

const categories = [
    {
      "id": 1,
      "parent_category_id": 0,
      "type": 0,
      "title": "Tech Hub",
      "description": "A comprehensive suite of productivity tools for businesses and individuals.",
      "url": "/tech-hub",
      "index": 1,
      "icon": "productivity_icon.png",
      "logo": "productivity_logo.png",
      "official_url": "https://www.productivitysuite.com/official",
      "roadmap_url": "https://www.productivitysuite.com/roadmap"
    },
    {
      "id": 2,
      "parent_category_id": 0,
      "type": 0,
      "title": "Development",
      "description": "An online platform for buying and selling various products.",
      "url": "/development",
      "index": 2,
      "icon": "marketplace_icon.png",
      "logo": "marketplace_logo.png",
      "official_url": "https://www.onlinemarketplace.com/official",
      "roadmap_url": "https://www.onlinemarketplace.com/roadmap"
    },
    {
      "id": 3,
      "parent_category_id": 2,
      "type": 0,
      "title": "JavaScript",
      "description": "Connect with friends, family, and colleagues through posts, photos, and messages.",
      "url": "/javascript",
      "index": 3,
      "icon": "socialnetwork_icon.png",
      "logo": "socialnetwork_logo.png",
      "official_url": "https://www.socialnetwork.com/official",
      "roadmap_url": "https://www.socialnetwork.com/roadmap"
    },
    {
      "id": 4,
      "parent_category_id": 3,
      "type": 0,
      "title": "Solid.js",
      "description": "Track your expenses, set budgets, and manage your finances effectively.",
      "url": "/solidjs",
      "index": 4,
      "icon": "budgetingapp_icon.png",
      "logo": "budgetingapp_logo.png",
      "official_url": "https://www.budgetingapp.com/official",
      "roadmap_url": "https://www.budgetingapp.com/roadmap"
    },
    {
      "id": 5,
      "parent_category_id": 6,
      "type": 0,
      "title": "GPT",
      "description": "Access courses and educational resources from various disciplines.",
      "url": "/gpt",
      "index": 5,
      "icon": "onlinelearning_icon.png",
      "logo": "onlinelearning_logo.png",
      "official_url": "https://www.onlinelearningplatform.com/official",
      "roadmap_url": "https://www.onlinelearningplatform.com/roadmap"
    },
    {
      "id": 6,
      "parent_category_id": 0,
      "type": 0,
      "title": "API",
      "description": "Log your workouts, set fitness goals, and monitor your progress.",
      "url": "/api",
      "index": 6,
      "icon": "workoutapp_icon.png",
      "logo": "workoutapp_logo.png",
      "official_url": "https://www.workoutapp.com/official",
      "roadmap_url": "https://www.workoutapp.com/roadmap"
    }
];

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

const nestedCategoryHierarchy = buildCategoryHierarchy();

console.log(JSON.stringify(nestedCategoryHierarchy, null, 2));










// export async function getCategory(req, res) {
//   const client = await db.connect();

//   if(req.params.hasOwnProperty('url')) {
//     const { url } = req.params;

//     try {
//       const {rows: category} = await client.sql`
//       SELECT type, title, description, url, icon
//       FROM category
//       WHERE url = ${url}
//       `;

//       if(category) {
//         const category = category[0];

//         const {rows: subCategories} = await client.sql`
//         SELECT title, description, url
//         FROM category
//         WHERE parent_category_id = ${category.id}
//         ORDER BY index
//         `;

//         if(subCategories) {
//           category.items = subCategories;
//         }

//         res.status(200).json({data: category});
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


export async function getCategory(req, res) {
  const client = await db.connect();
  try {
    const {rows: category} = await client.sql`
    SELECT * FROM category ORDER BY parent_category_id, index
    `;

    if(category) {
      res.status(200).json({data: category});
    } else {
      res.status(404).json({error: "Categories not found"});
    }
  } catch(error) {
    if(!res.headersSent) {
      res.status(500).json({error: "Server error"});
    }
  } finally {
    client.release();
  }
}

export async function postCategory(req, res) {
  const client = await db.connect();

  const {type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id} = req.body;
    
  if([title, description, url].every((value) => value !== undefined)) {
    try {
      const {rows: created} = await client.sql`
      INSERT INTO category (type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id)
      SELECT ${parseInt(type)}, ${title}, ${description}, ${url}, ${parseInt(index)}, ${icon || null}, ${logo || null}, ${official_url || null}, ${roadmap_url || null}, ${parseInt(parent_category_id)}
      WHERE NOT EXISTS (SELECT 1 FROM category WHERE parent_category_id = ${parseInt(parent_category_id)} AND url = ${url})
      `;

      if(created) {
        res.status(201).json({message: "Category created"});
      } else {
        res.status(400).json({error: "Category already exists"});
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

export async function putCategory(req, res) {
  const client = await db.connect();

  if(req.params.hasOwnProperty('id')) {
    const { id } = req.params;
    const {type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id} = req.body;
    
    if([type, title, description, url, index, icon, logo, official_url, roadmap_url, parent_category_id].some((value) => value !== undefined)) {
      try {
        const {rowCount: updated} = await client.sql`
        UPDATE category
        SET
          type = COALESCE(${parseInt(type)}, type),
          title = COALESCE(${title}, title),
          description = COALESCE(${description}, description),
          url = COALESCE(${url}, url),
          index = COALESCE(${parseInt(index)}, index),
          icon = COALESCE(${icon}, icon),
          logo = COALESCE(${logo}, logo),
          official_url = COALESCE(${official_url}, official_url),
          roadmap_url = COALESCE(${roadmap_url}, roadmap_url),
          parent_category_id = COALESCE(${parseInt(parent_category_id)}, parent_category_id)
        WHERE id = ${id}
        `;
  
        if(updated) {
          res.status(200).json({message: "Category Updated"});
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

export async function deleteCategory(req, res) {
  const client = await db.connect();

  if(req.params.hasOwnProperty('id')) {
    const { id } = req.params;
    
    try {
      await client.sql`BEGIN`;
      await client.sql`DELETE FROM category WHERE parent_category_id = ${id}`;
      const {rowCount: deleted} = await client.sql`DELETE FROM category WHERE id = ${id};`;
      await client.sql`COMMIT`;

      if(deleted) {
        res.status(200).json({message: "Category deleted"});
      } else {
        res.status(404).json({error: "Category not found"});
      }
    } catch(error) {
      await client.sql`ROLLBACK`;

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