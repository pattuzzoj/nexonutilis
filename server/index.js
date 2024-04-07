import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './src/routes.js';

const app = express();
const port = 3000;

const allowedOrigins = ['https://nexonutilis.vercel.app', 'https://nexonutilis-server.vercel.app'];

// Configuração do middleware de controle de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Permitir o acesso se a origem estiver na lista de origens permitidas ou se não houver origem (ex: requisições locais)
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
};

// Aplicando o middleware para todas as rotas
app.use(isPostmanRequest);

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});