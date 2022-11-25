import { displayMovies, getMovies } from './modules/getMovies.js';
import movieCounter from './modules/movieCounter.js';
import './style.css';

const movieList = document.getElementById('movieList');
displayMovies(movieList, getMovies);

const movieCount = document.getElementById('movie-counter');
getMovies().then((data) => {
  movieCounter(data, movieCount);
});

const startIndex = document.getElementById('startIndex');
const endIndex = document.getElementById('endIndex');
const showMovies = document.getElementById('showMovies');
const errorMsg = document.getElementById('error');

showMovies.onclick = () => {
  const start = startIndex.value;
  const end = endIndex.value;
  if (start !== '' && end !== '') {
    if (+start >= +end) {
      errorMsg.innerHTML = 'Invalid input';
    }
    displayMovies(movieList, () => getMovies(start, end));
    getMovies(start, end).then((data) => {
      movieCounter(data, movieCount);
    });
  }
};

startIndex.onfocus = () => {
  errorMsg.innerHTML = '';
};

endIndex.onfocus = () => {
  errorMsg.innerHTML = '';
};
