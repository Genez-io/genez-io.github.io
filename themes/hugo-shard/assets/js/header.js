var scrollPosition = window.scrollY;
var header = document.getElementById('header');

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY;

  if (scrollPosition >= 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});
