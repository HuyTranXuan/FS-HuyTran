// L I B R A R Y
import express from 'express';

// R O U T E R
import cardRouter from './routes/cards';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
