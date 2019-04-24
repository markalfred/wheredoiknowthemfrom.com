const TMDB = window.theMovieDb
const id = parseInt(window.location.search.replace('?id=', ''))
const type = decodeURI(window.location.search.match(/type=([^&]+)/)[1])

function addActors(response) {
  const actors = JSON.parse(response).cast
  const $actors = document.querySelector('.actors')


  actors.forEach((actor) => {
    if (actor.profile_path === null) return

    const $link = document.createElement('a')
    $link.href = 'actor-characters.html?id=' + actor.id
    $link.className = 'actor'

    const $img = document.createElement('img')
    $img.src = TMDB.common.getImage({ file: actor.profile_path })

    $link.appendChild($img)
    $actors.appendChild($link)
  })
}

let fn
if (type === 'movie') { fn = TMDB.movies }
if (type === 'tv') { fn = TMDB.tv }
fn.getCredits({ id: id }, addActors, console.error)
