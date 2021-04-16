interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArgs {
  target: number;
  dailyHours: Array<number>;
}

interface Metric {
  rating: number;
  ratingDescription: string;
}

const determineMetric = (target: number, average: number): Metric => {
  let rating, ratingDescription;
  if (average >= target)
    (rating = 3), (ratingDescription = "Keep up the good work!");
  else if (average / target >= 0.75)
    (rating = 2), (ratingDescription = "You are almost there!");
  else (rating = 1), (ratingDescription = "Disappointing");
  return {
    rating,
    ratingDescription,
  };
};

const parseArgs = (args: Array<string>): ExerciseArgs => {
  const properArgs = args.slice(2);
  const target = Number(properArgs.pop());
  if (isNaN(target)) throw Error("Target must be a number");
  const dailyHours = properArgs.map((arg) => Number(arg));
  if (dailyHours.some((hour) => isNaN(hour)))
    throw Error("Hours of work out must be numbers");
  return {
    target,
    dailyHours,
  };
};

export const vetExercises = (
  target: number,
  dailyHours: Array<number>
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const average =
    dailyHours.reduce((a: number, b: number) => a + b) / periodLength;
  const metric = determineMetric(target, average);
  const success = average >= target;
  return {
    periodLength,
    trainingDays,
    average,
    target,
    success,
    ...metric,
  };
};

const logResults = (results: Result): void => {
  console.log(results);
};

if (require.main === module) {
  try {
    const { target, dailyHours } = parseArgs(process.argv);
    const result = vetExercises(target, dailyHours);
    logResults(result);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
