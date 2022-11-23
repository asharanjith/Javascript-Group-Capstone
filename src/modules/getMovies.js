import openPopup from './openPopup.js';

require('bootstrap-icons/font/bootstrap-icons.css');

const url = 'https://api.tvmaze.com/shows';
const popContentLoad = document.querySelector('.popContentLoad');

const getMovies = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const displayMovies = (movieList) => {
  movieList.replaceChildren();
  getMovies().then((res) => {
    const myMovies = res.slice(0, 9);
    myMovies.map((movie) => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';

      const movieImage = document.createElement('img');
      movieImage.src = movie.image.medium;
      movieCard.appendChild(movieImage);

      const movieDescription = document.createElement('div');
      movieDescription.className = 'movie-description';

      const nameIcon = document.createElement('div');
      nameIcon.className = 'name-icon';
      const movieName = document.createElement('h3');

      movieName.innerHTML = movie.name;
      nameIcon.appendChild(movieName);

      const icon = document.createElement('div');
      icon.innerHTML = '<i class="bi bi-heart"></i>';
      nameIcon.appendChild(icon);
      movieDescription.appendChild(nameIcon);

      const likes = document.createElement('p');
      likes.className = 'likes';
      likes.innerHTML = '0 Likes';
      movieDescription.appendChild(likes);

      const genreLang = document.createElement('div');
      genreLang.className = 'genre-lang';
      const genre = document.createElement('p');
      const list = movie.genres.toString();
      genre.innerHTML = `Genre: ${list}`;
      genreLang.appendChild(genre);
      const lang = document.createElement('p');
      lang.innerHTML = `Language: ${movie.language}`;
      genreLang.appendChild(lang);
      movieDescription.appendChild(genreLang);
      movieCard.appendChild(movieDescription);
      const commentBtn = document.createElement('button');
      commentBtn.className = 'commentBtn';

      commentBtn.innerHTML = 'comments';
      commentBtn.onclick = () => {
        popContentLoad.innerHTML = '';
        openPopup(movie.id);
      };

      movieCard.appendChild(commentBtn);
      movieList.appendChild(movieCard);
      return '';
    });
  });
};

export default displayMovies;
