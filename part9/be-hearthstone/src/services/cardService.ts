import cards from '../../data/cards';
import { NonDescriptiveCardData, CardData, NewCardData } from '../types';

const getCardData = (): CardData[] => {
  return cards;
};

const getNonDescriptiveCardData = (): NonDescriptiveCardData[] => {
  return cards.map(({ id, name, rarity, cardType, effect }) => ({
    id,
    name,
    rarity,
    cardType,
    effect,
  }));
};

const addCard = (cardInfo: NewCardData): CardData => {
  const newCardData = {
    id: Math.max(...cards.map((card) => card.id)) + 1,
    ...cardInfo,
  };

  cards.push(newCardData);
  return newCardData;
};

const findById = (id: number): CardData | undefined => {
  const card = cards.find((card) => card.id === id);
  return card;
};

export default {
  getCardData,
  addCard,
  getNonDescriptiveCardData,
  findById,
};
