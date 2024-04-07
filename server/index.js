import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './src/routes.js';

const app = express();
const port = 3000;

const allowedOrigins = ['https://nexonutilis.vercel.app/', 'https://nexonutilis-server.vercel.app/'];

// Configuração do middleware de controle de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Permitir o acesso se a origem estiver na lista de origens permitidas ou se não houver origem (ex: requisições locais)
      callback(null, true);
    } else {
      // Negar o acesso se a origem não estiver na lista de origens permitidas
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Aplicando o middleware de controle de CORS para as rotas específicas
app.use(cors(corsOptions));

const isPostmanRequest = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent && userAgent.includes('Postman')) {
    // Bloquear acesso se a solicitação for do Postman
    res.status(403).json({ error: 'Access forbidden for Postman' });
  } else {
    // Permitir acesso para outras solicitações
    next();
  }
};

// Aplicando o middleware para todas as rotas
app.use(isPostmanRequest);

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});