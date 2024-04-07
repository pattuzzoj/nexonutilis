import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './src/routes.js';
import cors from 'cors';
import request from 'node:http'

const app = express();
const port = 3000;

request.setHeader('Access-Control-Allow-Origin', 'https://nexonutilis.vercel.app/');

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});