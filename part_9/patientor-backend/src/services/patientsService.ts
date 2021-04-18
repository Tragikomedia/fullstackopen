import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, NewPatient, PublicPatient, NewEntry } from "../types/index";

const patients = patientsData;

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
  return patient;
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const entryId = uuid();
  const newEntry = {
    id: entryId,
    ...entry,
  };
  const patient = patients.find((patient: Patient) => patient.id === id);
  if (!patient) return undefined;
  patient.entries = patient.entries.concat(newEntry);
  return patient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
