const name = decodeURI(window.location.search.match(/name=([^&]+)/)[1])
const title = decodeURI(window.location.search.match(/title=([^&]+)/)[1])

const fullTitle =
  "That's "
  + '<strong>'
  + name
  + '</strong>'
  +' from '
  + '<strong>'
  + title
  + '</strong>'
  + '. Nice.'

const $title = document.querySelector('.title')
$title.innerHTML = fullTitle
