// Filter Options
export const STATUS_OPTIONS = ['Alive', 'Dead', 'unknown'] as const;

export const SPECIES_OPTIONS = [
  'Human',
  'Alien',
  'Humanoid',
  'Poopybutthole',
  'Mythological',
  'Animal',
  'Robot',
] as const;

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Genderless',
  'unknown',
] as const;

// Types derived from constants
export type Status = (typeof STATUS_OPTIONS)[number]; // 'Alive' | 'Dead' | 'unknown'
export type Species = (typeof SPECIES_OPTIONS)[number];
export type Gender = (typeof GENDER_OPTIONS)[number];
