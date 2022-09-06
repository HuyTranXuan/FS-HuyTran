import patients from '../../data/patients';
import { NonSsnPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSsnPatient[] => {
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

const addPatient = (patientInfo: NonSsnPatient): NonSsnPatient => {
  const patient = {
    ...patientInfo,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  patient.id = uuid();
  patients.push(patient);
  return patient;
};

const findById = (id: string): NonSsnPatient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  // getNonDescriptiveCardData,
  findById,
};
