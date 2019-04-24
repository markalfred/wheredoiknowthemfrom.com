const TMDB = window.theMovieDb
const id = parseInt(window.location.search.replace('?id=', ''))

const byPopularity = (a, b) => a.popularity < b.popularity ? 1 : -1
const hasPoster = x => x.poster_path !== null

function addCharacters(response) {
  const characters = JSON.parse(response).cast.sort(byPopularity).filter(hasPoster)
  const $characters = document.querySelector('.characters')
  characters.forEach((character) => {
    if (character.profile_path === null) return

    const $link = document.createElement('a')
    $link.href = 'character.html?name=' + character.character.replace('#', ' ') + '&title=' + (character.title || character.name) + '&actorId=' + id
    $link.className = 'character'

    const $img = document.createElement('img')
    $img.src = TMDB.common.getImage({ file: character.poster_path })

    $link.appendChild($img)
    $characters.appendChild($link)
  })
}

function getActorName(response) {
  const actor = JSON.parse(response).name
}

TMDB.people.getCredits({ id: id }, addCharacters, console.error)
TMDB.people.getById({ id: id }, getActorName, console.error)
