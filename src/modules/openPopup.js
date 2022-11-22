const popUp = document.querySelector('#popUp');
const popContentLoad = document.querySelector('.popContentLoad');

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const openPopup = (id) => {
  popUp.classList.remove('hide');
  popUp.classList.add('show');
  const geturl = `https://api.tvmaze.com/shows/${id}`;
  fetchData(geturl).then((res) => {
    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = res.name;
    const movieImage = document.createElement('img');
    movieImage.classList.add('movieImage');
    movieImage.src = res.image.original;
    const movieDescription = document.createElement('p');
    movieDescription.innerHTML = res.summary;
    popContentLoad.appendChild(movieTitle);
    popContentLoad.appendChild(movieImage);
    popContentLoad.appendChild(movieDescription);
  });
};

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
  popUp.classList.remove('show');
  popUp.classList.add('hide');
  popContentLoad.innerHTML = '';
});

export default openPopup;
