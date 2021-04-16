import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { vetExercises } from "./exerciseCalculator";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { weight, height } = req.query;
    const result = calculateBmi(Number(height), Number(weight));
    res.json({ weight, height, bmi: result });
  } catch {
    res.json({ error: "Malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    if (!target || !daily_exercises) throw Error("Parameters missing");
    if (typeof target !== 'number' || !Array.isArray(daily_exercises)) throw Error("Malformatted parameters");
    const result = vetExercises(target, daily_exercises);
    res.status(200).json(result);
  } catch (error) {
    // eslint-disable-next-line
    res.status(400).json({error: error.message});
  }
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
