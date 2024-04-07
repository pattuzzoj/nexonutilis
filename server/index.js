import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './src/routes.js';
const cors = require('cors');

const app = express();
const port = 3000;

const isPostmanRequest = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent && userAgent.includes('Mozilla/5.0')) {
    // Blocking access if the request is from Postman
    res.status(403).json({ error: 'Access forbidden for Postman' });
  } else {
    // Allowing access for other requests
    next();
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