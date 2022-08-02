interface ECAValues {
  target: number;
  a: number[];
}

const parseECA = (args: Array<string>): ECAValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [, , ...arr] = args;

  arr.map((e) => {
    if (isNaN(Number(e))) throw new Error('Provided values were not numbers!');
  });
  const [target, ...a] = arr;
  return { target: Number(target), a: a.map((ele) => Number(ele)) };
};

const calculateExercises = (target: number, a: number[]) => {
  const trainingDays = a.filter((d) => d !== 0).length;
  const periodLength = a.length;
  const totalTime = a.reduce((sum, ele) => sum + ele, 0);
  const average = totalTime / periodLength;
  let rating = 1;
  if (average > target + 0.5) rating = 3;
  else if (average <= target + 0.5 && average >= target - 0.5) rating = 2;
  else rating = 1;

  let ratingDescription = '';
  if (rating === 1) ratingDescription = 'bruhh';
  else if (rating === 2) ratingDescription = 'not too bad but could be better';
  else ratingDescription = 'good job!';

  return {
    periodLength,
    trainingDays,
    success: rating === 3 ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, a } = parseECA(process.argv);
  console.log(calculateExercises(target, a));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
