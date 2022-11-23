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
    const submit = document.querySelector('.submitComment');
    submit.onclick = () => {
      const user = document.querySelector('#name').value;
      const comment = document.querySelector('#comment').value;
      const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2zwdZfCS8tFdJ8Ln1dRW/comments/';
      const commentData = {
        item_id: id,
        username: user,
        comment,
      };
      const postComment = async (url, data) => {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        console.log('hello');
        const res = await response.json();
        console.log(res);
      };
      postComment(commentUrl, commentData);
    };
  });
};

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
  popUp.classList.remove('show');
  popUp.classList.add('hide');
  popContentLoad.innerHTML = '';
});

export default openPopup;
