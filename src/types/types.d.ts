export interface StarWarsAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface Person {
  name: string;
  url: string;
  mass: ReactNode;
  hair_color: ReactNode;
  gender: string;
  height: string;
}
