import { displayMovies, getMovies } from './modules/getMovies.js';
import movieCounter from './modules/movieCounter.js';
import './style.css';

const movieList = document.getElementById('movieList');
displayMovies(movieList);

const movieCount = document.getElementById('movie-counter');
getMovies().then((data) => {
  movieCounter(data, movieCount);
});
