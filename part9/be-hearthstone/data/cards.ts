import { CardData } from '../src/types';
import toNewCardData from '../src/utils';

const data = [
  {
    id: 1,
    name: 'Shirvallah, the Tiger',
    rarity: 'legendary',
    cardType: 'minions',
    description:
      'On bended knee Thekal placed his weapon upon Shirvallah’s altar, whereupon she slowly knocked it off with her paw.',
    effect:
      'Divine Shield, Rush, Lifesteal-Costs (1) less for each Mana-you have spent on spells.',
  },
  {
    id: 2,
    name: 'Molten Giant',
    rarity: 'epic',
    cardType: 'minions',
    description: 'He gets terrible heartburn. BECAUSE HE IS FULL OF LAVA.',
    effect: 'Also damages the minions next to whomever your hero attacks.',
  },
  {
    id: 3,
    name: "Samuro's Blade",
    rarity: 'rare',
    cardType: 'minions',
    description: "Samuro's Blade",
    effect: 'Costs (1) less for each spell you have cast this game.',
  },
  {
    id: 4,
    name: 'Gift of the Wild',
    rarity: 'common',
    cardType: 'spells',
    description: 'I have got NO idea what is in that fertilizer.',
    effect: 'Draw 3 cards. Summon a Plant with',
  },
];

const cardDatas: CardData[] = data.map((obj) => {
  const object = toNewCardData(obj) as CardData;
  object.id = obj.id;
  return object;
});

export default cardDatas;
