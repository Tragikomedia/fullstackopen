import diagnosesService from "../services/diagnosesService";
import {
  Gender,
  NewPatient,
  PatientFields,
  EntryFields,
  EntryType,
  Diagnosis,
  HealthCheckRating,
  CommonNewEntry,
  Discharge,
  SickLeave,
  NewEntry,
} from "../types/index";

const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isNumber = (number: unknown): boolean => !Number.isNaN(Number(number));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCode = (param: any): param is Diagnosis["code"] => {
  const diagnoses = diagnosesService.getDiagnoses();
  return diagnoses
    .map(({ code }: { code: Diagnosis["code"] }) => code)
    .includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (param: any): param is Record<string, unknown> => {
  return typeof param === "object";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  return (
    isObject(param) &&
    isString(param?.date) &&
    isDate(param?.date) &&
    isString(param?.criteria)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  return (
    isObject(param) &&
    isString(param?.startDate) &&
    isDate(param?.startDate) &&
    isString(param?.endDate) &&
    isDate(param?.endDate)
  );
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Incorrect or missing name");
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date: " + date);
  return date;
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

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type))
    throw new Error("Incorrect or missing type: " + type);
  return type;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist))
    throw new Error("Incorrect or missing specialist: " + specialist);
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description))
    throw new Error("Incorrect or missing description: " + description);
  return description;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> | undefined => {
  if (!diagnosisCodes) return undefined;
  if (
    !Array.isArray(diagnosisCodes) ||
    !diagnosisCodes.every(isString) ||
    !diagnosisCodes.every(isDiagnosisCode)
  )
    throw new Error("Incorrect diagnosis codes: " + diagnosisCodes);
  return diagnosisCodes;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    (!healthCheckRating && healthCheckRating !== 0) ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  )
    throw new Error(
      "Incorrect or missing health check rating: " + healthCheckRating
    );
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge))
    throw new Error(
      `Incorrect or missing discharge date or criteria: ${discharge}`
    );
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName))
    throw new Error("Incorrect or missing employer name: " + employerName);
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) return undefined;
  if (!isObject(sickLeave) || !isSickLeave(sickLeave))
    throw new Error("Incorrect sick leave: " + sickLeave);
  return sickLeave;
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
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };
  return newPatient;
};

export const toNewEntry = ({
  date,
  type,
  specialist,
  diagnosisCodes,
  description,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: EntryFields): NewEntry => {
  const commonNewEntry: CommonNewEntry = {
    date: parseDate(date),
    type: parseEntryType(type),
    specialist: parseSpecialist(specialist),
    description: parseDescription(description),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };
  let newEntry;
  switch (commonNewEntry.type) {
    case "HealthCheck": {
      newEntry = {
        ...commonNewEntry,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      break;
    }
    case "Hospital": {
      newEntry = {
        ...commonNewEntry,
        discharge: parseDischarge(discharge),
      };
      break;
    }
    case "OccupationalHealthcare": {
      newEntry = {
        ...commonNewEntry,
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave),
      };
      break;
    }
    default: {
      throw new Error("Incorrect type");
    }
  }
  return newEntry;
};
