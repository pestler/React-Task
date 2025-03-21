import React from 'react';
import { Country } from '../types/type';
import style from './CountryCard.module.scss';

interface CountryCardProps {
  country: Country;
  visitedCountries: boolean;
  onCountryVisited: (countryName: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  visitedCountries,
  onCountryVisited,
}) => (
  <li
    className={`${visitedCountries ? style.visited : ''}`}
    onClick={() => onCountryVisited(country.name.common)}
  >
    <div className={style.countryCard}>
      <img
        className={style.png}
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
      <h3>{country.name.common}</h3>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
    </div>
  </li>
);

export default CountryCard;
