import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './src/routes.js';

const app = express();
const port = 3000;

const allowedOrigins = ['https://nexonutilis.vercel.app', 'https://nexonutilis-server.vercel.app'];

// Configuração do middleware de controle de CORS
app.use((req, res, next) => {
  res.set({
    'Content-Security-Policy': "default-src 'self'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Access-Control-Allow-Origin': 'https://nexonutilis.vercel.app/' // Permite apenas este domínio
  });
  next();
});

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});