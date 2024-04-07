import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './src/routes.js';

const app = express();
const port = 3000;

var whitelist = ['https://nexonutilis.vercel.app/', 'https://nexonutilis-server.vercel.app/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors({
  credentials: true,
  allowedHeaders: ['content-type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  origin: (origin, callback = (error, allow) => {}) => {
      const allowedOrigins = ['https://nexonutilis.vercel.app/', 'https://nexonutilis-server.vercel.app/']; // Adicione as origens permitidas
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(null, false);
      }
  }
}))

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});