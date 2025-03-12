import { ApiResponse } from '../types/types';

// Функция для загрузки данных через fetch
export const fetchPeople = async (
  page: number,
  searchQuery: string = ''
): Promise<ApiResponse> => {
  const baseURL = `https://swapi.dev/api/people/`;
  const url = searchQuery
    ? `${baseURL}?search=${searchQuery}&page=${page}`
    : `${baseURL}?page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data'); // Ошибка, если статус ответа не 200
  }

  const data: ApiResponse = await response.json(); // Парсинг JSON-ответа
  return data;
};
