import diagnosesData from "../../data/diagnoses.json";

import { Diagnose } from "../types";

const getDiagnoses = (): Diagnose[] => diagnosesData;

export default {
  getDiagnoses,
};
