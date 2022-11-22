const url = 'https://api.tvmaze.com/shows';

const getMovies = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default getMovies;
