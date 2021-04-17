import diagnosesData from "../../data/diagnoses.json";

import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => diagnosesData;

export default {
  getDiagnoses,
};
