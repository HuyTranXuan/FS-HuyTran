import express from 'express';
import patientsServies from '../services/patientsService';
import toNewPatient from '../utils';

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

export default router;