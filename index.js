
const FILM_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='
let filmData;

const getFilm = async (api) => {
  const rawResponse = await fetch(`${api}`);
  const data = await rawResponse.json();
  filmData = data.results;
  renderCard(filmData);
}

const recFilm = async () => {
  //await getFilm(FILM_API);
  getFilm(FILM_API);
}

const renderCard = (films) => {
  const filmEl = films.map((film) => {
    return (`
    <div class="col-lg-4 col-md-4 col-sm-6 mt-5 movie">

    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
            <img src="${IMG_PATH}${film.poster_path}" class="card-img-top" alt="...">
            <div class="card-body card">
              <h5 class="card-title text-light">${film.original_title}</h5>
              </div>
            </div>
            <div class="flip-card-back">
            <div class="overview">
            <h3>Overview</h3>
            <p class="card-text text-light">${film.overview}</p>
            </div>
            </div>
            </div>
          </div>
       `)
  })
  const rootEl = document.querySelector("#root");
  rootEl.innerHTML = ""
  filmEl.forEach(film => rootEl.innerHTML += film)
}

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  console.log(document.querySelectorAll('.card'));
  document.querySelectorAll('.card').forEach((item, index) => {
    document.querySelectorAll('.card')[index].classList.toggle('carddark')
  })

  document.querySelector('#navbar').classList.toggle('carddark');
  document.querySelector('#search').classList.toggle('dark');
  document.querySelectorAll(".flip-card-back").forEach((item) => {
      item.classList.toggle("carddark")
  })
});
recFilm();


const searchEl = document.querySelector('#formSearch');
const searchValue = document.querySelector('#search');
console.log(searchEl);
searchEl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (searchValue.value) {
    getFilm(`${SEARCH_API}${searchValue.value}`);
  } else {
    alert('Lutfen bir film ismi giriniz')
  }
})

searchValue.addEventListener('change', (e) => {
  if(!(e.target.value)) {
    getFilm(FILM_API);
  }
})
const select = () => {

}

let currentPage = 0;
document.querySelector('#page1').addEventListener('click', () => {
  getFilm(`${FILM_API}${index++}`)
})
document.querySelector('#page2').addEventListener('click', () => {
  getFilm(`${FILM_API}${index++}`)
})
document.querySelector('#page3').addEventListener('click', () => {
  getFilm(`${FILM_API}${index++}`)
})


const pageList = document.querySelectorAll('.page-link')
pageList.forEach((item, index) => {
  // item.onclick = () => {
  //   getFilm(`${FILM_API}${index}`)
  // }
  document.querySelector(`page${index++}`).addEventListener('click', () => {
  getFilm(`${FILM_API}${index++}`)
})
})



