const inRange = (x: number, min: number, max: number): boolean =>
  x >= min && x <= max;

const getIndex = (height: number, weight: number): number =>
  weight / Math.pow(height / 100, 2);

interface BmiRange {
  min: number;
  max: number;
  message: string;
}

interface Args {
  height: number;
  weight: number;
}

const ranges: Array<BmiRange> = [
  {
    min: 0,
    max: 15,
    message: "Very severely underweight",
  },
  {
    min: 15,
    max: 16,
    message: "Severely underweight",
  },
  {
    min: 16,
    max: 18.5,
    message: "Underweight",
  },
  {
    min: 18.5,
    max: 25,
    message: "Normal (healthy weight)",
  },
  {
    min: 25,
    max: 30,
    message: "Overweight",
  },
  {
    min: 30,
    max: 35,
    message: "Obese Class I (Moderately obese)",
  },
  {
    min: 35,
    max: 40,
    message: "Obese Class II (Severely obese)",
  },
  {
    min: 40,
    max: 99,
    message: "Obese Class III (Very severely obese)",
  },
];

const getMessage = (index: number): string => {
  for (const range of ranges) {
    if (inRange(index, range.min, range.max)) return range.message;
  }
  throw Error("You are not a human bean!");
};

const logMessage = (message: string): void => {
  console.log(message);
};

export const calculateBmi = (height: number, weight: number): string => {
  const index = getIndex(height, weight);
  const message = getMessage(index);
  return message;
};

const parseArgs = (args: Array<string>): Args => {
  const [heightString, weightString] = args.slice(2);
  const [height, weight] = [Number(heightString), Number(weightString)];
  if (isNaN(height) || isNaN(weight))
    throw Error("You must provide height and weight");
  return {
    height,
    weight,
  };
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgs(process.argv);
    const result = calculateBmi(height, weight);
    logMessage(result);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
