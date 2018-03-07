const TMDB = window.theMovieDb

let noMorePages = false
function addMovies(response) {
  const res = JSON.parse(response)
  const currentPage = res.page
  const totalPages = res.total_pages
  if (currentPage >= totalPages) { noMorePages = true }

  const movies = res.results
  const $movies = document.querySelector('.movies')

  movies.forEach((movie) => {
    if (movie.media_type === 'person') return
    if (!movie.poster_path) return

    const $link = document.createElement('a')
    $link.href = './movie-actors.html?id=' + movie.id
    $link.className = 'movie'

    const $img = document.createElement('img')
    $img.src = TMDB.common.getImage({ file: movie.poster_path })

    $link.appendChild($img)
    $movies.appendChild($link)
  })
}

function clearMovies() {
  const $movies = document.querySelector('.movies')
  while ($movies.firstChild) {
    $movies.removeChild($movies.firstChild)
  }
}

let query = ''
let searching = false
const search = document.querySelector('#search')
search.addEventListener('input', (evt) => {
  noMorePages = false
  searchPage = 1
  clearMovies()
  query = evt.target.value
  if (!query) {
    searching = false
    popularPage = 1
    loadPopular(popularPage++)
  } else {
    searching = true
    loadSearch(searchPage++)
  }
})

let popularPage = 1
let searchPage = 1
const body = document.querySelector('body')
document.addEventListener('scroll', () => {
  if (body.scrollTop + body.clientHeight >= body.scrollHeight - 300) {
    searching ? loadSearch(searchPage++) : loadPopular(popularPage++)
  }
})

function loadPopular(page) {
  if (noMorePages) return
  TMDB.movies.getPopular({ page: page }, addMovies, console.error)
}

function loadSearch(page) {
  if (noMorePages) return
  TMDB.search.getMulti({ query: query, page: page }, addMovies, console.error)
}

loadPopular(popularPage++)
