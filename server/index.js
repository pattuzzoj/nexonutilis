import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './src/routes.js';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://nexonutilis.vercel.app/'); // Permitir todas as origens
  next();
});

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});