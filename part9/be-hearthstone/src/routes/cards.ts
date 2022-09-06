import express from 'express';
import cardService from '../services/cardService';
import toNewCardData from '../utils';

const router = express.Router();

// T O :   / A P I / C A R D S
router.get('/', (_req, res) => {
  res.send(cardService.getNonDescriptiveCardData());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newCardData = toNewCardData(req.body);

    const addedCard = cardService.addCard(newCardData);
    res.json(addedCard);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// T O :   / A P I / C A R D S / : I D
router.get('/:id', (req, res) => {
  const card = cardService.findById(Number(req.params.id));

  if (card) {
    res.send(card);
  } else {
    res.sendStatus(404);
  }
});

export default router;
