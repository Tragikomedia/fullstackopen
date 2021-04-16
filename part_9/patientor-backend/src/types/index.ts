export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

type Gender = "male" | "female";

interface FullPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type Patient = Omit<FullPatient, "ssn">;
