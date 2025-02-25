import React, { useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import './core.scss';
import Pagination from '../pagination/Pagination';
import ButtonSearch from '../button-search/Button-search';
import Main from '../main/Main';
import useLocalStorage from '../../service/localStorage.service';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  selectError,
  selectLoading,
  selectPeople,
  selectTotalPages,
} from '../../redux/slices/peoplesSlice';
import { fetchPeople } from '../../redux/services/peopleService';

interface CoreProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Core: React.FC<CoreProps> = ({ currentPage, onPageChange }) => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => selectPeople(state));
  const totalPages = useSelector((state: RootState) => selectTotalPages(state));
  const loading = useSelector((state: RootState) => selectLoading(state));
  const error = useSelector((state: RootState) => selectError(state));
  const [query, setQuery] = useLocalStorage<string>(
    'search_query-star-wars',
    ''
  );

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setQuery(query);
    onPageChange(1);
    navigate(query === '' ? `/` : `/?page=1`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const currentPage = page ? parseInt(page, 10) : 1;
    onPageChange(currentPage);
    dispatch(fetchPeople({ query, page: currentPage }));
  }, [query, location.search, onPageChange, dispatch]);

  return (
    <div className="search-and-paginate">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          onPageChange(page);
          navigate(`/?page=${page}`);
        }}
      />
      <section className="search-main">
        <div className="container-search-main">
          <ButtonSearch onFormSubmit={handleSubmit} value={query} />
          <Main
            data={data}
            loading={loading}
            error={error}
            currentPage={currentPage}
          />
        </div>
      </section>
    </div>
  );
};

export default Core;
