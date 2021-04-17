import patientsData from "../../data/patients.json";
import { v1 as uuid } from "uuid";
import { Patient, NewPatient, PublicPatient } from "../types/index";

const patients = patientsData as Patient[];

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient: Patient) => patient.id === id);
  return patient ? { ...patient, entries: [] } : patient;
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};
