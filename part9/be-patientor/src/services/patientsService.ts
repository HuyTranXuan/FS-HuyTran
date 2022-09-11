import patients from '../../data/patients';
import { Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patients;
};

// const getNonDescriptiveCardData = (): NonDescriptiveCardData[] => {
//   return diagnoses.map(({ id, name, rarity, cardType, effect }) => ({
//     id,
//     name,
//     rarity,
//     cardType,
//     effect,
//   }));
// };

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

export default {
  getPatients,
  addPatient,
  // getNonDescriptiveCardData,
  findById,
};
