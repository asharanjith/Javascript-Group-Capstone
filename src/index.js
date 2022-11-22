import getMovies from './modules/getMovies.js';
import './style.css';

// const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.API_KEY}/comments/`;
// const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.API_KEY}/likes/`;

const movieList = document.getElementById('movieList');
const getScores = (movieList) => {
  movieList.replaceChildren();
  getMovies().then((res) => {
    const myMovies = res.slice(0, 8);
    myMovies.map((movie) => {
      const movieCard = document.createElement('div');
      const movieImage = document.createElement('img');
      movieImage.src = movie.image.medium;
      movieCard.appendChild(movieImage);
      const commentBtn = document.createElement('button');
      commentBtn.innerHTML = 'comments';
      movieCard.appendChild(commentBtn);
      movieList.appendChild(movieCard);
      return '';
    });
  });
};

getScores(movieList);
