var scrollPosition = window.scrollY;
var header = document.getElementById('header');

window.addEventListener("load", function() {
  if (this.window.location.pathname == "/docs/" || this.window.location.pathname == "/doc/") {
    this.window.location.href = "https://docs.genezio.com/";
    return;
  }
  if (this.window.location.pathname != "/") {
    header.classList.add('header-scrolled');
  }
}, false);

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY;

  if (scrollPosition >= 100) {
    header.classList.add('header-scrolled');
  } else if (this.window.location.pathname == "/") {
    header.classList.remove('header-scrolled');
  }
});
