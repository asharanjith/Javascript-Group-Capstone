import commentCounterFunction from './commentCounter.js';
import addComment from './displayComment.js';

const popUp = document.querySelector('.popUpContent');
const popContentLoad = document.querySelector('.popContentLoad');
const form = document.querySelector('.newComment');
let noOfComments = 0;
const background = document.querySelector('#background');

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const openPopup = (id) => {
  popUp.classList.remove('hide');
  popUp.classList.add('show');
  background.classList.remove('hide');
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
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');
    const movieGenres = document.createElement('p');
    movieGenres.innerHTML = `Genres: ${res.genres}`;
    const movieRating = document.createElement('p');
    movieRating.innerHTML = `Rating: ${res.rating.average}`;
    const movieRuntime = document.createElement('p');
    movieRuntime.innerHTML = `Runtime: ${res.runtime}`;
    const movieLanguage = document.createElement('p');
    movieLanguage.innerHTML = `Language: ${res.language}`;
    const premiere = document.createElement('p');
    premiere.innerHTML = `Premiere start on: ${res.premiered}`;
    const movieStatus = document.createElement('p');
    movieStatus.innerHTML = `Status: ${res.status}`;
    const movieURL = document.createElement('a');
    movieURL.className = 'movieURL';
    movieURL.href = res.url;
    movieURL.innerHTML = 'Click here to see more details';
    movieDetails.appendChild(movieGenres);
    movieDetails.appendChild(movieRating);
    movieDetails.appendChild(movieRuntime);
    movieDetails.appendChild(movieLanguage);
    movieDetails.appendChild(premiere);
    movieDetails.appendChild(movieStatus);
    popContentLoad.appendChild(movieTitle);
    popContentLoad.appendChild(movieImage);
    popContentLoad.appendChild(movieDescription);
    popContentLoad.appendChild(movieDetails);
    popContentLoad.appendChild(movieURL);
    const submit = document.querySelector('.submitComment');

    submit.addEventListener('click', (e) => {
      e.preventDefault();
      const user = document.querySelector('#name').value;
      const comment = document.querySelector('#comment').value;
      if (user && comment) {
        const commentObj = {
          item_id: id,
          username: user,
          comment,
        };

        addComment(commentObj).then((res) => {
          if (res) {
            const commentCount = document.querySelector('#commentCount');
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
            noOfComments += 1;
            commentCount.innerHTML = `Comments (${noOfComments})`;
          }
        });
        form.reset();
      }
    });
    const fetchComments = async () => {
      const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.API_KEY}/comments/?item_id=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
    fetchComments().then((res) => {
      const commentList = document.querySelector('.commentContainer');
      commentList.innerHTML = '';
      res.forEach((comment) => {
        const commentItem = document.createElement('div');
        commentItem.classList.add('commentItem');
        const commentTime = document.createElement('p');
        commentTime.classList.add('commentTime');
        commentTime.innerText = `(${comment.creation_date}) `;
        const commentUser = document.createElement('p');
        commentUser.classList.add('commentUser');
        commentUser.innerHTML = `${comment.username} : `;
        const commentText = document.createElement('p');
        commentText.classList.add('commentText');
        commentText.innerHTML = comment.comment;
        commentItem.appendChild(commentTime);
        commentItem.appendChild(commentUser);
        commentItem.appendChild(commentText);
        commentList.appendChild(commentItem);
      });
      const commentCount = document.querySelector('#commentCount');
      noOfComments = commentCounterFunction();
      commentCount.innerHTML = `Comments (${noOfComments})`;
    });
  });
};

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
  popUp.classList.remove('show');
  popUp.classList.add('hide');
  background.classList.add('hide');
  popContentLoad.innerHTML = '';
});

export default openPopup;
