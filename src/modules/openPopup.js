import commentCounterFunction from './commentCounter.js';
import addComment from './displayComment.js';

const popUp = document.querySelector('.popUpContent');
const popContentLoad = document.querySelector('.popContentLoad');
const form = document.querySelector('.newComment');
let noOfComments = 0;

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
  popContentLoad.innerHTML = '';
});

export default openPopup;
