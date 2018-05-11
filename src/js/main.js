// Импортируем jQuery
//= ../bower_components/jquery/dist/jquery.js

// Импортируем Popper
//= ../bower_components/popper.js/dist/umd/popper.js

// Импортируем необходимые js-файлы Bootstrap 4
//= ../bower_components/bootstrap4/js/dist/util.js
//= ../bower_components/bootstrap4/js/dist/collapse.js
//= ../bower_components/bootstrap4/js/dist/scrollspy.js
//= ../bower_components/bootstrap4/js/dist/tab.js

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

/* ------------------------------------------------------------------
  begin плавный переход к якорю
---------------------------------------------------------------------*/
$(document).ready(function(){
	$("#navbarSupportedContent").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1000);
	});

	$(".mainHeader").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1000);
	});
});
/* ------------------------------------------------------------------
  end плавный переход к якорю
---------------------------------------------------------------------*/
