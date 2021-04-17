import { Gender, NewPatient, PatientFields } from "../types/index";

const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Incorrect or missing name");
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth))
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn))
    throw new Error("Incorrect or missing ssn: " + ssn);
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error("Incorrect or missing gender: " + gender);
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Incorrect or missing occupation: " + occupation);
  return occupation;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};
