export interface Country {
  name: { common: string };
  population: number;
  region: string;
  flags: { png: string };
  visited?: boolean;
}

export type SortKey = 'name' | 'population';
