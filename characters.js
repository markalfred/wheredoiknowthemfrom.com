const TMDB = window.theMovieDb
// console.log('TMDB: ', TMDB)
const id = parseInt(window.location.search.replace('?id=', ''))
// console.log('actor id: ', id)

const byPopularity = (a, b) => a.popularity < b.popularity ? 1 : -1
const hasPoster = x => x.poster_path !== null

function addCharacters(response) {
  const characters = JSON.parse(response).cast.sort(byPopularity).filter(hasPoster)
  const $characters = document.querySelector('.characters')
  characters.forEach((character) => {
    if (character.profile_path === null) return

    const $link = document.createElement('a')
    $link.href = 'character.html?name=' + character.character + '&title=' + (character.title || character.name) + '&actorId=' + id
    $link.className = 'character'

    const $img = document.createElement('img')
    $img.src = TMDB.common.getImage({ file: character.poster_path })

    $link.appendChild($img)
    $characters.appendChild($link)
  })
}

function getActorName(response) {
  // console.log('getActorName', response)
  const actor = JSON.parse(response).name
  console.log('Actor: ', actor)
}

TMDB.people.getCredits({ id: id }, addCharacters, console.error)
TMDB.people.getById({ id: id }, getActorName, console.error)
