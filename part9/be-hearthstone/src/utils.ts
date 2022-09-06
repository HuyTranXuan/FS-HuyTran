import { NewCardData, Rarity, CardType } from './types';

const isString = (input: unknown): input is string => {
  return typeof input === 'string' || input instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRarity = (param: any): param is Rarity => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Rarity).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCardType = (param: any): param is CardType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(CardType).includes(param);
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text');
  }
  return text;
};
const parseRarity = (rarity: unknown): Rarity => {
  if (!rarity || !isString(rarity) || !isRarity(rarity)) {
    throw new Error('Incorrect or missing rarity: ' + rarity);
  }
  return rarity;
};
const parseCardType = (cardType: unknown): CardType => {
  if (!cardType || !isCardType(cardType)) {
    throw new Error('Incorrect or missing cardType: ' + cardType);
  }
  return cardType;
};

type Fields = {
  name: unknown;
  rarity: unknown;
  cardType: unknown;
  effect: unknown;
  description: unknown;
};

const toNewCardData = ({
  name,
  rarity,
  cardType,
  effect,
  description,
}: Fields): NewCardData => {
  const newEntry: NewCardData = {
    name: parseText(name),
    rarity: parseRarity(rarity),
    cardType: parseCardType(cardType),
    effect: parseText(effect),
    description: parseText(description),
  };

  return newEntry;
};
export default toNewCardData;
