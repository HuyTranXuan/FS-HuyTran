export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
//--------------F R O M   B A C K E N D --------------
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
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
interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: DischargeInfo;
}
interface OccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeaveInfo;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcare;
