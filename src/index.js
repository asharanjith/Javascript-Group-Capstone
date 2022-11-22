import displayMovies from './modules/getMovies.js';
import './style.css';

// const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.API_KEY}/comments/`;
// const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.API_KEY}/likes/`;

const movieList = document.getElementById('movieList');
displayMovies(movieList);
