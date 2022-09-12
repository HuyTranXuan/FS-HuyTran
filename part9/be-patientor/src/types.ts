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

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

// export type NonSsnPatient = Omit<Patient, 'ssn'>;diagnosisCodes
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}
interface DiagnosisCodesEntry extends BaseEntry {
  diagnosisCodes?: Array<string>;
}
export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}
interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface DischargeInfo {
  date: string;
  criteria: string;
}
interface SickLeaveInfo {
  startDate: string;
  endDate: string;
}
interface HospitalEntry extends DiagnosisCodesEntry {
  type: 'Hospital';
  discharge: DischargeInfo;
}
interface OccupationalHealthcare extends DiagnosisCodesEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeaveInfo;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcare;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
