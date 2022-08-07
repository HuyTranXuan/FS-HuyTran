import express = require('express');
import { calculateBmi } from './bmiCalculator';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    const result = calculateBmi(Number(height), Number(weight));
    res.send(result);
  }
});
app.post('/exercises', jsonParser, (req, res) => {
  const { daily_exercises, target } = req.body;
  if (daily_exercises === undefined || target === undefined) {
    res.status(400).send({ error: 'parameters missing' });
  }
  let notAllNumber = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  daily_exercises.forEach((e: any) =>
    isNaN(Number(e)) ? (notAllNumber = true) : null
  );
  if (isNaN(Number(target)) || notAllNumber) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(target, daily_exercises);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
