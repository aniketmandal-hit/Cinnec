import axios from 'axios';


const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
  }
});

export const tmdbEndpoints = {
  trendingMovies: '/trending/movie/week',
  popularMovies: '/movie/popular',
  searchMovies: '/search/movie',
  
  trendingTV: '/trending/tv/week',
  animeSeries: '/discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc',
  

};

export default tmdb;