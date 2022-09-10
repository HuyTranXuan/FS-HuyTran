// eslint-disable-next-line @typescript-eslint/no-empty-interface
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export interface Entry {}
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

// export type NonSsnPatient = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
