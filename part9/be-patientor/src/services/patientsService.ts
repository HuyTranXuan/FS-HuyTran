import patients from '../../data/patients';
import { Entry, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patients;
};
const addPatient = (patientInfo: Patient): Patient => {
  const patient = {
    ...patientInfo,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  patient.id = uuid();
  patients.push(patient);
  return patient;
};
const findById = (id: string): PublicPatient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};
const addEntry = (entryInfo: Entry, patientId: string): Entry => {
  const entry = { ...entryInfo };
  patients.find((p) => p.id === patientId)?.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry,
};
