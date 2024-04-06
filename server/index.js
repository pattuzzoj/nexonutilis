import express from 'express';
import { createClient } from '@vercel/postgres';
const client = createClient();
await client.connect();

const app = express();
const port = 3000;

app.get('/api', async (req, res) => {
  try {
    const {rows, fields} = await client.sql`
      SELECT
        *
      FROM
        categories
      WHERE
        category_owner IS NULL
    `;

    res.json(rows, fields);
  } finally {
    await client.end();
  }
})

app.get('/api/*', async (req, res) => {
  const url = req.params[0];
  const type = req.body.type;

  try {
    let table;

    if(type == "categories") {
      table = "categories";
    } else if(type == "resources") {
      table = "resources";
    }

    const {rows, fields} = await client.sql`
      SELECT
        *
      FROM
        ${table}
      WHERE
        url = ${req.params[0]}
    `;

    res.json(rows);
  } finally {
    await client.end();
  }
})

app.post('/api/*', async (req, res) => {
  try {
    res.send(req.params[0]);
  } finally {
    await client.end();
  }
})

app.update('/api/*', async (req, res) => {
  try {
    res.send(req.params[0]);
  } finally {
    await client.end();
  }
})

app.delete('/api/*', async (req, res) => {
  try {
    res.send(req.params[0]);
  } finally {
    await client.end();
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


















// CREATE TABLE categories (
//   id SERIAL PRIMARY KEY,
//   url VARCHAR(100) NOT NULL UNIQUE,
//   type VARCHAR(20) NOT NULL DEFAULT 'categories',
//   title VARCHAR(50) NOT NULL,
//   description VARCHAR(500) NOT NULL,
//   category_owner VARCHAR(100),
//   CONSTRAINT fk_category_owner FOREIGN KEY (category_owner) REFERENCES categories(url)
// )

// INSERT INTO
// 	categories(url, type, title, description)
// VALUES (
//   '/languages',
//   'category',
//   'Languages',
//   'Discover a variety of programming languages for software development.'
// )
 
// INSERT INTO
// 	resources(url, type, title, description, mode, logo, roadmap, category_owner)
//  VALUES (
//  	'/languages/javascript',
//   'resource',
//   'JavaScript',
//   'JavaScript is a versatile programming language used for creating interactive websites, web applications, and server-side development. It is the backbone of modern web development, allowing developers to add dynamic behavior to web pages.',
//   'card',
//   'https://static-00.iconduck.com/assets.00/javascript-icon-256x256-8sn98o22.png',
//   'https://roadmap.sh/javascript',
//   '/languages'
//  )
 
//  INSERT INTO
//  	items(title, description, url, resource_owner)
//  VALUES (
//  	'JavaScript.Info',
//   'Modern JavaScript Tutorial: simple, but detailed explanations with examples and tasks, including: closures, document and events, object oriented programming and more.',
//   'https://javascript.info/',
//   '/languages/javascript'
//  )

// CREATE TABLE resources (
//   id SERIAL PRIMARY KEY,
//   url VARCHAR(100) NOT NULL UNIQUE,
//   type VARCHAR(20) NOT NULL DEFAULT 'resources',
//   title VARCHAR(50) NOT NULL,
//   description VARCHAR(500) NOT NULL,
//   mode VARCHAR(10),
//   logo TEXT,
//   official TEXT,
//   roadmap TEXT,
//   category_owner VARCHAR(100) NOT NULL,
//   CONSTRAINT fk_category_owner FOREIGN KEY (category_owner) REFERENCES categories(url)
// )

// CREATE TABLE items (
//   id SERIAL PRIMARY KEY,
// 	title VARCHAR(50) NOT NULL,
//   description VARCHAR(500) NOT NULL,
//   url TEXT NOT NULL,
//   resource_owner VARCHAR(100) NOT NULL,
//   CONSTRAINT fk_resource_owner FOREIGN KEY (resource_owner) REFERENCES resources(url)
// )

// CREATE INDEX categories_url
// ON categories(url);

// CREATE INDEX resources_url
// ON resources(url);

// CREATE INDEX items_url
// ON items(resource_owner);



// SELECT
// 	ct.title,
//   ct.description,
//   ct.url,
//   it.title AS item_item,
//   it.description AS item_description,
//   it.url AS item_url
// FROM
// 	Categories AS ct
// JOIN
// 	Items AS it ON ct.id = it.category_owner



// SELECT
// 	rs.title,
//   rs.description,
//   rs.url,
//   it.title AS item_item,
//   it.description AS item_description,
//   it.url AS item_url
// FROM
// 	 resources AS rs
// JOIN
// 	items AS it ON rs.url = it.resource_owner