import addComment from './displayComment.js';

const popUp = document.querySelector('.popUpContent');
const popContentLoad = document.querySelector('.popContentLoad');
const form = document.querySelector('.newComment');

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

    submit.addEventListener('click', (e) => {
      e.preventDefault();
      const user = document.querySelector('#name').value;
      const comment = document.querySelector('#comment').value;
      addComment({
        item_id: id,
        username: user,
        comment,
      }).then((res) => {
        if (res) {
          const commentList = document.querySelector('.commentContainer');
          const commentItem = document.createElement('div');
          commentItem.classList.add('commentItem');
          const commentTime = document.createElement('p');
          commentTime.classList.add('commentTime');
          commentTime.innerText = '(Just now) ';
          const commentUser = document.createElement('p');
          commentUser.classList.add('commentUser');
          commentUser.innerHTML = `${user} : `;
          const commentText = document.createElement('p');
          commentText.classList.add('commentText');
          commentText.innerHTML = comment;
          commentItem.appendChild(commentTime);
          commentItem.appendChild(commentUser);
          commentItem.appendChild(commentText);
          commentList.appendChild(commentItem);
        }
      });
      form.reset();
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
