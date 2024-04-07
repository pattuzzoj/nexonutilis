import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './src/routes.js';
import cors from 'cors';

const app = express();
const port = 3000;

const knownAgents = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if ((userAgent && userAgent.includes('Mozilla/5.0'))) {
    next();
  } else {
    res.status(403).json({ error: 'Access forbidden.' });
  }
};

app.use(knownAgents);
app.use(cors({origin: ['https://nexonutilis.vercel.app', 'https://nexonutilis-server.vercel.app ']}));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});