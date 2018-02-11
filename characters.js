const TMDB = window.theMovieDb
const id = parseInt(window.location.search.replace('?id=', ''))

function addCharacters(creditsResponse, imagesResponse) {
  const characters = JSON.parse(creditsResponse).cast
  const images = JSON.parse(imagesResponse).results

  const imgCharMap = characters.map((c) => [
    c, images.find((i) =>
      c.id === i.media.id
    )
  ])

  console.log(characters.length, images.length, imgCharMap.length)

  const $characters = document.querySelector('.characters')

  imgCharMap.forEach(([character, image]) => {
    const file = ((image && image.file_path) || character.poster_path)
    if (file === null) return

    const $link = document.createElement('a')
    $link.href = 'character.html?id=' + character.id
    $link.className = 'character'

    const $img = document.createElement('img')
    $img.src = TMDB.common.getImage({ file: file })

    $link.appendChild($img)

    const $text = document.createElement('p')
    $text.innerHTML = (character.name || character.title) + ' -- ' + character.character

    $link.appendChild($text)

    $characters.appendChild($link)
  })
}

function taggedImages(creditsResponse) {
  return TMDB.people.getTaggedImages(
    { id: id },
    ((imagesResponse) => addCharacters(creditsResponse, imagesResponse)),
    console.error
  )
}

TMDB.people.getCredits({ id: id }, taggedImages, console.error)
