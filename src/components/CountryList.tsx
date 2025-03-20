import React from 'react';
import CountryCard from './CountryCard';
import { Country } from '../types/type';
import style from './CountryList.module.scss';

interface CountryListProps {
  countries: Country[];
  visitedCountries: string[];
  handleCountryVisited: (countryName: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  visitedCountries,
  handleCountryVisited,
}) => (
  <div className={style.countryList}>
    {countries.map((country) => {
      const isVisited = visitedCountries.includes(country.name.common);
      return (
        <CountryCard
          key={country.name.common}
          country={country}
          visitedCountries={isVisited}
          onCountryVisited={handleCountryVisited}
        />
      );
    })}
  </div>
);
export default CountryList;
