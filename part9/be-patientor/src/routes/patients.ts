import express from 'express';
import patientsServies from '../services/patientsService';
import toNewPatient from '../utils';
import { Entry } from '../types';

const router = express.Router();

// T O :   / A P I / P A T I E N T S
router.get('/', (_req, res) => {
  res.send(patientsServies.getPatients());
});
router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientData = toNewPatient(req.body);
    // console.log(newPatientData, '<<===');

    const addedPatient = patientsServies.addPatient(newPatientData);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// // T O :   / A P I / P A T I E N T S / : I D
router.get('/:id', (req, res) => {
  const patient = patientsServies.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});
router.post('/:id/entries', (req, res) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  try {
    const entry: Entry = req.body as Entry;
    // let entryInfo = {
    //   id: entry.id,
    //   description: entry.description,
    //   date: entry.date,
    //   specialist: entry.specialist,
    //   diagnosisCodes: entry.diagnosisCodes,
    // };
    let entryInfo = { ...entry };

    switch (entry.type) {
      case 'Hospital':
        entryInfo = {
          type: 'Hospital',
          id: entry.id,
          description: entry.description,
          date: entry.date,
          specialist: entry.specialist,
          diagnosisCodes: entry.diagnosisCodes,
          discharge: entry.discharge,
        };
        break;
      case 'HealthCheck':
        entryInfo = {
          type: 'HealthCheck',
          id: entry.id,
          description: entry.description,
          date: entry.date,
          specialist: entry.specialist,
          diagnosisCodes: entry.diagnosisCodes,
          healthCheckRating: entry.healthCheckRating,
        };
        break;
      case 'OccupationalHealthcare':
        entryInfo = {
          type: 'OccupationalHealthcare',
          id: entry.id,
          description: entry.description,
          date: entry.date,
          specialist: entry.specialist,
          diagnosisCodes: entry.diagnosisCodes,
          employerName: entry.employerName,
          sickLeave: entry.sickLeave,
        };
        break;
      default:
        assertNever(entry);
        break;
    }

    const addedEntry = patientsServies.addEntry(entryInfo, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
