const popUp = document.querySelector('#popUp');
const popContentLoad = document.querySelector('.popContentLoad');

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addComment = async (commentData) => {  
  const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/iIM70JGWh9jMYmdexC2s/comments';
  const response = await fetch(commentUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
  console.log("Got here");
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
    const user = document.querySelector('#name').value;
    const comment = document.querySelector('#comment').value; 
    const commentData = {
      item_id: id,
      username: user,
      comment,
    };
    submit.addEventListener('click', () => {
      addComment(commentData);
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
