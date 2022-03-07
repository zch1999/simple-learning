let targetLogo = document.querySelector('.logo-wrap')
targetLogo.onclick = function () {
  if (window.location.href === 'https://cube.360.com/index') return
  window.open('https://cube.360.com/index', '_self')
}
