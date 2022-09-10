import { Patient, Gender } from './types';

const isString = (input: unknown): input is string => {
  return typeof input === 'string' || input instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text');
  }
  return text;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = {
  name: unknown;
  id: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

const toNewPatient = ({
  name,
  id,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: Fields): Patient => {
  const newEntry: Patient = {
    name: parseText(String(name)),
    id: parseText(String(id)),
    dateOfBirth: parseText(String(dateOfBirth)),
    gender: parseGender(gender),
    occupation: parseText(String(occupation)),
    entries: [],
    ssn: parseText(String(ssn)),
  };

  return newEntry;
};

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const toNewPatient = (object: any): Patient => {
//   const newEntry: Patient = {
//     name: parseText(String(object.name)),
//     id: parseText(String(object.id)),
//     dateOfBirth: parseText(String(object.dateOfBirth)),
//     gender: parseGender(object.gender),
//     occupation: parseText(String(object.occupation)),
//   };

//   return newEntry;
// };

export default toNewPatient;
