import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@vercel/postgres';

const client = createClient({
  connectionString: process.env.POSTGRES_URL_NON_POOLING
});

await client.connect();

const app = express();
const port = 3000;

app.get('*', async (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});