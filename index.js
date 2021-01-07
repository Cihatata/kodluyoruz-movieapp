const FILM_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

const getFilm = async () => {
  const rawResponse = await fetch(`${FILM_API}`);
  const data = await rawResponse.json();
  // console.log(data);
}

getFilm();