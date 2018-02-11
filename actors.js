const TMDB = window.theMovieDb
const id = parseInt(window.location.search.replace('?id=', ''))

function addActors(response) {
  const actors = JSON.parse(response).cast
  const $actors = document.querySelector('.actors')

  actors.forEach((actor) => {
    const $link = document.createElement('a')
    $link.href = 'actor-characters.html?id=' + actor.id
    $link.className = 'actor'

    const $img = document.createElement('img')
    $img.src = TMDB.common.getImage({ file: actor.profile_path })

    $link.appendChild($img)
    $actors.appendChild($link)
  })
}

TMDB.movies.getCredits({ id: id }, addActors, console.error)
