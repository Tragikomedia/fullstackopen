import patientsData from "../../data/patients.json";
import { Patient } from "../types/index";

const patients = patientsData as Patient[];

const getPatients = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
};
