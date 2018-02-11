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

TMDB.movies.getPopular({ page: 1 }, addMovies, console.error)
