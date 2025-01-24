import { mockData } from './mockData';

const requests = {
  fetchTrending: () => Promise.resolve({ data: { results: mockData.trending } }),
  fetchNetflixOriginals: () => Promise.resolve({ data: { results: mockData.netflixOriginals } }),
  fetchTopRated: () => Promise.resolve({ data: { results: mockData.topRated } }),
  fetchActionMovies: () => Promise.resolve({ data: { results: mockData.actionMovies } }),
  fetchComedyMovies: () => Promise.resolve({ data: { results: mockData.comedyMovies } }),
};

export default requests;