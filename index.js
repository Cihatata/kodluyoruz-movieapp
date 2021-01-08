
const FILM_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
let filmData;
const getFilm = async () => {
  const rawResponse = await fetch(`${FILM_API}`);
  const data = await rawResponse.json();
  filmData = data.results;
}

const recFilm = async () => {
  await getFilm();
  const filmEl  =  filmData.map((film) => {
    return (`
    
      <div class="card" style="width: 33%;">
        <img src="${IMG_PATH}${film.backdrop_path}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${film.original_title}</h5>
          <p class="card-text">${film.overview}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    
      </div>
    
   ` )
  })
const rootEl = document.querySelector("#root");
  filmEl.forEach(film =>rootEl.innerHTML += film )
     
     
  
 
    
}

recFilm();
    

