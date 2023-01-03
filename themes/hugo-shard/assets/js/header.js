var scrollPosition = window.scrollY;
var header = document.getElementById('header');

window.addEventListener("load", function() {
  console.log(this.window.location.pathname);
  if (this.window.location.pathname == "/docs/" || this.window.location.pathname == "/doc/") {
    this.window.location.href = "https://docs.genez.io/";
  }
}, false);

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY;

  if (scrollPosition >= 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});
