
const FILM_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const ITEMS_PER_PAGE = 20;
let currentPage = 0;
let buttonNumbers = 0;
let filmData;

const getFilm = async (api, options = {page:1, initialRequest: false}) => {
  const rawResponse = await fetch(`${api}${options.page}`);
  const data = await rawResponse.json();
  filmData = data.results;

  renderCard(filmData);

  if (options.initialRequest) {
    renderPageItems();
  }

}

const recFilm = options => {
  getFilm(FILM_API, options);
}

recFilm({page: 1, initialRequest: true});

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

$ul = document.querySelector("#page-buttons");
const renderPageItems = () => {
  const buttonNumbers = 5;

  // Create previous button
  const $previousLiItem = document.createElement("li");
  const $previousAItem = document.createElement("a");
  $previousAItem.classList.add("page-link");
  $previousLiItem.classList.add("page-item");
  $previousLiItem.appendChild($previousAItem);
  $previousAItem.textContent = "Previous";
  $previousLiItem.onclick = () => {
    if (currentPage > 1) {
      console.log("Previous current page: " + (currentPage - 1));
      currentPage = currentPage - 1;

      const activeClass = document.querySelector(".active");
      if (activeClass) {
        document.querySelector(".active").classList.remove("active");
      }
      document.querySelector("#pageButton" + currentPage).classList.add("active");

      recFilm({page: currentPage});
    }
  }
  $ul.appendChild($previousLiItem);

  // Create page buttons
  for (let i = 1; i < buttonNumbers + 1; i++) {
    const $liItem = document.createElement("li");
    const $aItem = document.createElement("a");
    $aItem.classList.add("page-link");
    $liItem.classList.add("page-item");
    $liItem.setAttribute("id", "pageButton" + i);
    $liItem.appendChild($aItem);
    $aItem.textContent = i;
    $liItem.onclick = () => {

      const activeClass = document.querySelector(".active");
      if (activeClass) {
        document.querySelector(".active").classList.remove("active");
      }
      document.querySelector("#pageButton" + i).classList.add("active");
      currentPage = i;

      recFilm({page: currentPage})
    }
    $ul.appendChild($liItem);
  }

  // Create next button
  const $nextLiItem = document.createElement("li");
  const $nextAItem = document.createElement("a");
  $nextAItem.classList.add("page-link");
  $nextLiItem.classList.add("page-item");
  $nextLiItem.appendChild($nextAItem);
  $nextAItem.textContent = "Next";
  $nextLiItem.onclick = () => {
    if (currentPage < buttonNumbers) {
      console.log("Next current page: " + (currentPage + 1));

      currentPage = currentPage + 1;

      const activeClass = document.querySelector(".active");
      if (activeClass) {
        document.querySelector(".active").classList.remove("active");
      }
      document.querySelector("#pageButton" + currentPage).classList.add("active");

      recFilm({page: currentPage});
    }
  }
  $ul.appendChild($nextLiItem);
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

const searchEl = document.querySelector('#formSearch');
const searchValue = document.querySelector('#search');
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
