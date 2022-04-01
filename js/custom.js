jQuery(document).ready(function ($) {

	/* высота меню для тени */
	var navHeight = $('.b-header_navigation').innerHeight();
	$('.b-header_navigation_shadow').height(navHeight);

	/* фиксирование меню при прокрутке */
	var objToStick = $(".b-header_navigation");
	var topOfObjToStick = $(objToStick).offset().top;
	$(window).scroll(function () {
		var windowScroll = $(window).scrollTop();
		if (windowScroll > topOfObjToStick) {
			$(objToStick).addClass("fixed");
			$('.b-header_navigation_shadow').addClass('active');
		} else {
			$(objToStick).removeClass("fixed");
			$('.b-header_navigation_shadow').removeClass('active');
		}
	});
	$(".b-menu, .b-mobmenu").on("click", "a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'), top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top - 60 }, 500);
	});
	var lastId,
		topMenu = $(".b-menu"),
		topMenuHeight = topMenu.outerHeight() + 80,
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
	menuItems.click(function (e) {
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
		$('html, body').stop().animate({ scrollTop: offsetTop }, 300);
		e.preventDefault();
	});
	$(window).scroll(function () {
		var fromTop = $(this).scrollTop() + topMenuHeight;
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop)
				return this;
		});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
		}
	});

	/* открыте моб меню */
	$('.b-mobmenu-but').click(function () { $('.b-mobnav-wrap').toggleClass('active'); });
	/* закрытие моб меню */
	$('.b-mobnav_close, .b-mobnav-wrap').click(function () { $('.b-mobnav-wrap').removeClass('active'); });
	/* прерывание всплывания событий по иерархии */
	$('.b-mobnav').on('click', function (e) { e = e || window.event; if (e.stopPropagation) e.stopPropagation(); else e.cancelBubble = true; });

	/* прокрутка вверх */
	$(window).scroll(function () { if ($(this).scrollTop() < 1000) { $('#a-top').fadeOut(); } if ($(this).scrollTop() > 1000) { $('#a-top').fadeIn(); } });
	$("#a-top").click(function () { $("html, body").animate({ scrollTop: 0 }, 'slow'); return false; });

	
	/* слайдер доктора */
	$('.b-slider_list').owlCarousel({ items: 1, loop: true, nav: true, margin: 50, dots: true, autoplayHoverPause: true, smartSpeed: 1000, navText: ['<span class="mdi mdi-arrow-left"></span>', '<span class="mdi mdi-arrow-right"></span>'], lazyLoad: true,
	animateOut: 'fadeOutRight', animateIn: 'fadeInLeft'
});

	/* слайдер видео отзывы */
	$('.b-reviews_list').owlCarousel({
		items: 2, loop: false, nav: true, margin: 50, dots: true, autoplayHoverPause: true, smartSpeed: 1000, navText: ['<span class="mdi mdi-arrow-left"></span>', '<span class="mdi mdi-arrow-right"></span>'], lazyLoad: true, animateOut: 'fadeOutRight', animateIn: 'fadeInLeft',
		responsive: { 0: { nav: false, dots: true, items: 1 }, 480: { nav: true, dots: true, items: 1 }, 992: { nav: false, dots: false, items: 2} }
	});

	/* слайдер галерея */
	$('.b-gall_slider').owlCarousel({
		items: 1, loop: true, nav: false, dots: true, autoplay: true, autoplayHoverPause: true, smartSpeed: 1000,
		navText: ['<span class="mdi mdi-chevron-double-left"></span>', '<span class="mdi mdi-chevron-double-right"></span>'], lazyLoad: true, animateOut: 'fadeOut', animateIn: 'fadeIn'
	});

	/* видео плеер */
	$('.player').mediaelementplayer({
		startVolume: 0.8,
		features: ['playpause', 'current', 'progress', 'duration', 'tracks'],
		stretching: 'responsive'
	});

	/* вызов модального окна */
	$('.b-fancybox').fancybox();

	/* маска для поля ввода телефона */
	if ($('input[data-inputmask], .inputmask').length > 0) {
		$('input[data-inputmask], .inputmask').mask("+7 (799) 999-99-99");
	}

});