interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (h: number, m: number) => {
  const height = h / 100;
  const bmi = m / (height * height);
  let status = '';
  if (bmi < 16) status = 'Underweight (Severe thinness)';
  else if (bmi <= 16.9 && bmi >= 16) status = 'Underweight (Moderate thinness)';
  else if (bmi <= 18.4 && bmi >= 17) status = 'Underweight (Mild thinness)';
  else if (bmi <= 24.9 && bmi >= 18.5) status = 'Normal range';
  else if (bmi <= 29.9 && bmi >= 25) status = 'Overweight (Pre-obese)';
  else if (bmi <= 34.9 && bmi >= 30) status = 'Obese (Class I)';
  else if (bmi <= 39.9 && bmi >= 35) status = 'Obese (Class II)';
  else if (bmi >= 40) status = 'Obese (Class III)';
  else status = 'wrong info';

  console.log(status);
  return {
    weight: m,
    height: h,
    bmi: status,
  };
};
// console.log(calculateBmi(180, 94));

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
