const popUp = document.querySelector('#popUp');
const popContentLoad = document.querySelector('.popContentLoad');

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addComment = async (Obj) => {
  const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2zwdZfCS8tFdJ8Ln1dRW/comments';
  const data = await fetch(commentUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Obj),
  });
  console.log('Got here');
  const response = await data.text;
  return response;
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
    const submit = document.querySelector('.submitComment');
    const user = document.querySelector('#name').value;
    const comment = document.querySelector('#comment').value;

    submit.addEventListener('click', (e) => {
      e.preventDefault();
      addComment({
        item_id: id,
        username: user,
        comment,
      }).then((res) => {
        console.log(res);
      });
    });
  });
};

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
  popUp.classList.remove('show');
  popUp.classList.add('hide');
  popContentLoad.innerHTML = '';
});

export default openPopup;
