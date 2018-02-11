const TMDB = window.theMovieDb

function addMovies(response) {
  const movies = JSON.parse(response).results
  const $movies = document.querySelector('.movies')

  movies.forEach((movie) => {
    const $link = document.createElement('a')
    $link.href = './movie-actors.html?id=' + movie.id
    $link.className = 'movie'

    const $img = document.createElement('img')
    $img.src = TMDB.common.getImage({ file: movie.poster_path })

    $link.appendChild($img)
    $movies.appendChild($link)
  })
}

const body = document.querySelector('body')
document.addEventListener('scroll', () => {
  if (body.scrollTop + body.clientHeight >= body.scrollHeight - 300) {
    load()
  }
})

let page = 1
function load() {
  TMDB.movies.getPopular({ page: page++ }, addMovies, console.error)
}

load()
