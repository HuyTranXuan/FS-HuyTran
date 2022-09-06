// export enum Rarity {
//   Common = 'common',
//   Rare = 'rare',
//   Epic = 'epic',
//   Legendary = 'legendary',
// }
// export enum CardType {
//   Minions = 'minions',
//   Spells = 'spells',
//   Weapons = 'weapons',
//   Hero = 'hero',
//   Locations = 'locations',
// }
// export interface CardData {
//   id: number;
//   name: string;
//   rarity: Rarity;
//   cardType: CardType;
//   description: string;
//   effect: string;
// }
// export type NonDescriptiveCardData = Omit<CardData, 'description'>;
// export type NewCardData = Omit<CardData, 'id'>;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
}
export type NonSsnPatient = Omit<Patient, 'ssn'>;
