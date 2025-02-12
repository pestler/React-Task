export interface StarWarsAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface Person {
  skin_color: ReactNode;
  eye_color: ReactNode;
  birth_year: ReactNode;
  created: ReactNode;
  edited: ReactNode;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  gender: string;
  url: string;
}
