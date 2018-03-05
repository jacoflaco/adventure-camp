// Collapse menu
// let menuIcon = document.querySelector('[data-target="navbarMenuHero"]')
// menuIcon.addEventListener('click', function() {
//   let navID = this.getAttribute('data-target')
//   let nav = document.querySelector('#' + navID)
//   if (nav.style.display === 'block')
//     nav.style.display = 'none'
//   else
//     nav.style.display = 'block'
// })

document.addEventListener("DOMContentLoaded", function(event) {
  // update hero background image
  let bg = ''
  let halfImgTp = document.querySelector("#hero--half-img-tp")
  let fullImgTp = document.querySelector("#hero--full-img-tp")
  let fullImg = document.querySelector('#hero--full-img')
  
  if (halfImgTp) {
    bg = document.querySelector('img').getAttribute('src')
    halfImgTp.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.4), white), url(" + bg + ")"
  }
  else if (fullImgTp) {
    bg = fullImgTp.getAttribute('data-img-src')
    fullImgTp.style.backgroundImage = "linear-gradient(transparent, rgba(255, 255, 255, .8) 55%, white), url(" + bg +")"
  }
  else if (fullImg) {
    fullImg.style.backgroundImage = "url(https://source.unsplash.com/collection/254504/random)"
  }
})