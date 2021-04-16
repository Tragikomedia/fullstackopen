import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
