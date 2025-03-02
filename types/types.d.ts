export interface StarWarsAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface Person {
  name: string;
  gender: string;
  url?: string;
  mass?: string;
  hair_color?: string;
  height?: string;
}

interface Item {
  id: number;
  name: string;
  [key: string]: unknown;
}
