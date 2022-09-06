import express from 'express';
import diagnosesService from '../services/diagnosesService';
// import toNewCardData from '../utils';

const router = express.Router();

// T O :   / A P I / C A R D S
router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
  //   try {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     const newCardData = toNewCardData(req.body);

  //     const addedCard = diagnosesService.addCard(newCardData);
  //     res.json(addedCard);
  //   } catch (error: unknown) {
  //     let errorMessage = 'Something went wrong.';
  //     if (error instanceof Error) {
  //       errorMessage += ' Error: ' + error.message;
  //     }
  //     res.status(400).send(errorMessage);
  //   }
  res.send('Saving a diary!');
});

// // T O :   / A P I / C A R D S / : I D
// router.get('/:id', (req, res) => {
//   const card = diagnosesService.findById(Number(req.params.id));

//   if (card) {
//     res.send(card);
//   } else {
//     res.sendStatus(404);
//   }
// });

export default router;
