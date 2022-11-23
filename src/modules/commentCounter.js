const commentCounterFunction = () => {
  let noOfComments = 0;
  const commentList = document.querySelector('.commentContainer');
  noOfComments = commentList.childElementCount;
  return noOfComments;
};

export default commentCounterFunction;
