const movieCounter = (arr, element) => {
  element.innerHTML = `Movies(${arr.length})`;
  return arr.length;
};

export default movieCounter;
