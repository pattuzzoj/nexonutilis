import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './src/routes.js';
import cors from 'cors';

const app = express();
const port = 3000;

const isPostmanRequest = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent && userAgent.includes('Mozilla/5.0')) {
    next();
  } else {
    res.status(403).json({ error: 'Access forbidden for Postman' });
  }
};

app.use(isPostmanRequest);

app.use(cors({
  origin: 'https://nexonutilis.vercel.app/'
}));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});