import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/router.js';
dotenv.config();

const app = express();
const port = 3000;

// const knownAgents = (req, res, next) => {
//   const userAgent = req.headers['user-agent'];
//   if ((userAgent && userAgent.includes('Mozilla/5.0'))) {
//     next();
//   } else {
//     res.status(403).json({ error: 'Access forbidden' });
//   }
// };

// app.use(knownAgents);
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
