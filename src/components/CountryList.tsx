import React from 'react';
import CountryCard from './CountryCard';
import { Country } from '../types/type';
import style from './CountryList.module.scss';

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => (
  <div className={style.countryList}>
    {countries.map((country) => (
      <CountryCard key={country.name.common} country={country} />
    ))}
  </div>
);

export default CountryList;
