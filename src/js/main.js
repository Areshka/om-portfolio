// Импортируем jQuery
//= ../bower_components/jquery/dist/jquery.js

// Импортируем Popper
//= ../bower_components/popper.js/dist/umd/popper.js

// Импортируем необходимые js-файлы Bootstrap 4
//= ../bower_components/bootstrap4/js/dist/util.js
//= ../bower_components/bootstrap4/js/dist/collapse.js


/* ------------------------------------------------------------------
  main-nav open-close
---------------------------------------------------------------------*/
var navMain = document.querySelector('.mainNavigation');
var navToggle = navMain.querySelector('.navbar-toggler');
navToggle.addEventListener('click', function() {
  if (navMain.classList.contains("mainNavigation--closed")) {
    navMain.classList.remove("mainNavigation--closed");
    navMain.classList.add("mainNavigation--opened");
  } else {
    navMain.classList.add("mainNavigation--closed");
    navMain.classList.remove("mainNavigation--opened");
  }
});

/* ------------------------------------------------------------------
  end main-nav open-close
---------------------------------------------------------------------*/
