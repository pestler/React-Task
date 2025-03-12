import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SearchBar from '@/components/SearchBar';
import CharacterList from '@/components/CharacterList';
import Pagination from '@/components/Pagination';
import CharacterDetails from '@/components/CharacterDetails';

import { Person } from '../types/types';
import { fetchPeople } from '@/utils/fetchData';
import ThemeSwitcher from '@/components/ThemeSwitcher';

interface HomePageProps {
  people: Person[];
  page: number;
  totalPages: number;
  searchQuery: string;
}

const HomePage = ({ people, page, totalPages, searchQuery }: HomePageProps) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const personIndex = Number(id) - (page - 1) * 10 - 1;
      setSelectedPerson(people[personIndex] || null);
    }
  }, [id, page, people]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/?search=${encodeURIComponent(searchTerm)}&page=1`,
      undefined,
      { shallow: false }
    );
  };

  const handlePersonClick = (person: Person, id: number) => {
    if (selectedPerson?.name === person.name) {
      setSelectedPerson(null);
      router.push(
        `/?search=${encodeURIComponent(searchTerm)}&page=${page}`,
        undefined,
        { shallow: true }
      );
    } else {
      setSelectedPerson(person);
      router.push(
        `/?search=${encodeURIComponent(searchTerm)}&page=${page}&id=${id}`,
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div
        style={{ flex: 1, borderRight: '1px solid #ccc', paddingRight: '20px' }}
      >
        <h1>Star Wars Characters</h1>
        <ThemeSwitcher />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />
        <CharacterList
          people={people}
          selectedPerson={selectedPerson}
          onPersonClick={handlePersonClick}
          page={page}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          searchTerm={searchTerm}
        />
      </div>
      <div style={{ flex: 1 }}>
        <CharacterDetails selectedPerson={selectedPerson} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const searchQuery = (context.query.search as string) || '';
  const data = await fetchPeople(page, searchQuery);

  return {
    props: {
      people: data.results,
      page,
      totalPages: Math.ceil(data.count / 10),
      searchQuery,
    },
  };
};

export default HomePage;
