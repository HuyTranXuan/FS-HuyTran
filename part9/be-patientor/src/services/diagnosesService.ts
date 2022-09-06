import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
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

const addCard = (cardInfo: Diagnose): Diagnose => {
  const Diagnose = {
    ...cardInfo,
  };

  diagnoses.push(Diagnose);
  return Diagnose;
};

// const findById = (id: number): CardData | undefined => {
//   const card = diagnoses.find((card) => card.id === id);
//   return card;
// };

export default {
  getDiagnoses,
  addCard,
  // getNonDescriptiveCardData,
  // findById,
};
