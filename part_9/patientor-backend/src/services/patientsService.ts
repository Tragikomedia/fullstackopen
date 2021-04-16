import patientsData from "../../data/patients.json";
import { v1 as uuid } from "uuid";
import { NewPatient, Patient } from "../types/index";

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

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
