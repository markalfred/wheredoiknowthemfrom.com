const TMDB = window.theMovieDb

const name = decodeURI(window.location.search.match(/name=([^&]+)/)[1])
const title = decodeURI(window.location.search.match(/title=([^&]+)/)[1])
const actorId = decodeURI(window.location.search.match(/actorId=([^&]+)/)[1])

function getActorName(response) {
  const actor = JSON.parse(response).name
  const fullTitle =
    "That's "
    + '<strong>'
    + name
    + '</strong>'
    + ' from '
    + '<strong>'
    + title
    + '</strong>'
    + ' played by '
    + '<strong>'
    + actor
    + '</strong>'
    + '. Nice.'

    const $title = document.querySelector('.title')
    $title.innerHTML = fullTitle
}

TMDB.people.getById({ id: actorId }, getActorName, console.error)
