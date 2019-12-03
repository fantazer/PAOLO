$(document).ready(function () {

	// scroll to id
	$("a[rel='m_PageScroll2id']").mPageScroll2id({
		offset: 100,
		highlightClass: "head-nav__el--active",
		onComplete: function () {
			$('.header-navs').hide();
		}
	});
	// scroll to id === end

	// nice select
	$('.select-beauty').niceSelect();
	// nice select === end

	//custom scroll
	$(".nice-scroll").niceScroll({
		autohidemode: "false",
		touchbehavior: "true"
	});
	//custom scroll === end

	//closeModal() - закрыть окна
	//initModal('data-name-attr') - Открыть нужное окно

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	$('.modal-content').click(function (event) {
		event.stopPropagation();
	});

	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflow: 'hidden',
				position: 'fixed',
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%'
			});
		}
		modalState.isModalShow = true;
	};
	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').removeClass('modal__show');
		$('.slide-menu').removeClass('slide-menu--open');
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close, .hide-modal').click(function () {
		closeModal();
	});
	//modals===end

	//mobile menu
	//Фиксируем скрол
	$('.head-toggle--open').click(function () {
		$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
	});

	$('.head-toggle').click(function (event) {
		$('.slide-menu').addClass('slide-menu--open');
		openModal();
		event.stopPropagation();
	});

	$('.slide-menu-close').click(function(){
		$('.slide-menu').removeClass('slide-menu--open');
		closeModal();
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

/*	$(document).on("click", function () {
		$('.head-wrap').removeClass('head--up');
		$('.head-toggle').removeClass('head-toggle--open');
		$('.slide-menu').removeClass('slide-menu--open');
		console.log(modalState.isModalShow);
		if (modalState.isModalShow == false) {
			$('body').removeClass('body-fix')
		}
	});*/
	//mobile menu===end



	// fix top-menu
	var shrinkHeader = 150;
	var heightHeader = $('.head-main-wrap').height();
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		if (scroll >= shrinkHeader) {
			$('body').css('paddingTop', heightHeader);
			$('.head-main-wrap').addClass('shrink');
		} else {
			$('body').css('paddingTop', 0);
			$('.head-main-wrap').removeClass('shrink');
		}
	});

	$(window).resize(function () {
		heightHeader = $('.header').height();
	});
	// fix top-menu === end


	// mobile cat
	$('.footer-panel-btn').click(function (event) {
		$(this).toggleClass('footer-panel-btn--active');
		if ($(".slide-cat").hasClass("slide-cat--active")) {
			closeModal();
		}else{
			openModal();
		}
		$(".slide-cat").toggleClass('slide-cat--active');
		event.stopPropagation();
	});


	$('.slide-cat').on("click", function (event) {
		event.stopPropagation();
	});

	$('.slide-cat .mobile-cat__el').click(function(){
		closeModal();
		$(".slide-cat").toggleClass('slide-cat--active');
		$('.footer-panel-btn').toggleClass('footer-panel-btn--active');
	})
	// mobile cat === end


	// toggle search
	$('.head-search').click(function () {
		$('.head-top-nav').toggleClass("head-top-nav--active");
		$('.head-top-search-wrap').fadeToggle("100");
	});
	// toggle search === end

	// sliders
	// Main slider
	$('.main-slider').slick({
		slidesToShow: 1,
		speed: 500,
		dots: false,
		arrows: false,
		autoplay: true,
		//fade: true,
		autoplaySpeed: 8000,
		customPaging: function (slider, i) {
			return '<span class="dot"></span>';
		}
	});
	// Main slider === end
	// === custom arrow el ===
	$('.slider-control--right').click(function () {
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
	});

	$('.slider-control--left').click(function () {
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
	});
	// custom arrow el === end

	$('.review-slider').slick({
		slidesToShow: 3,
		speed: 500,
		dots: true,
		arrows: false,
		//autoplay: true,
		//fade: true
		//autoplaySpeed: 8000, time between
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1
				}
			}
		],
		customPaging: function (slider, i) {
			return '<span class="dot"></span>';
		}
	});
	// sliders === end

	//increment field
	$('.incr__minus').click(function () {
		var countIncr = $(this).closest(".wrap-incr").find(".el-incr:visible").length; // число строк с инкриментом
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) - 1;
		if (count > 0) {
			$(this).closest(".elements-icr-block").addClass("elements-icr-block--active");
		} else {
			$(this).closest(".elements-icr-block").removeClass("elements-icr-block--active");
		}
		if (!$(this).hasClass("incr--one")) { // add class incr--one for 1 always
			if (count < 1) {
				count = 0;
			}
		} else {
			if (count < 1) {
				$('.incr-btn').removeClass("incr-btn--active");
				$(this).closest(".el-incr").slideUp(); // Анимация скрытия если < 1
				count = 1;
			}
		}
		$input.html(count);

	});

	$('.incr__plus').click(function () {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) + 1;
		count = count > 100 ? 100 : count;
		$input.html(count);
		if (count > 0) {
			$(this).closest(".elements-icr-block").addClass("elements-icr-block--active");
		} else {
			$(this).closest(".elements-icr-block").removeClass("elements-icr-block--active");
		}
	});
	//increment field === end

	// rating
	$('.star--edit .star-el').hover(function () {
		if (!$(this).parent().hasClass('star--fix')) {
			$('.star .star-el').removeClass('star-el--active');
			$(this).addClass('star-el--active');
			$(this).prevAll('.star-el').addClass('star-el--active')
		}
	});
	$('.star--edit .star-el').click(function () {
		$(this).parent().toggleClass('star--fix');
		$(this).addClass('star-el--active');
		$(this).prevAll('.star-el').addClass('star-el--active')
	});
	// rating === end

	// toggle descr more text
	$('.description__more').click(function () {
		$('.description__text--hidden').slideToggle();
		$(this).toggleClass('description__more--open');
	});
	// toggle descr more text === end

	// STICK
	var isMobile = function () {
		if ($(window).width() > 1025) {
			$(".panel-wrap").stick_in_parent({
				'offset_top': 100
			});
		}

		if ($(window).width() < 769) {
			$(".panel-wrap").trigger("sticky_kit:detach");
		}
	};
	$(window).resize(function () {
		isMobile();
		/*if($(window).width() > 769){
			initSlider();
		}*/
	});
	isMobile();
	// STICK === end

	// toggle energy info
	$('.goods-energy').click(function () {
		$('.food').slideToggle();
	});
	// toggle energy info === end

	//history accord
	$('.history-card__wrap').click(function () {
		var current = $(this).closest('.history-card');
		current.find('.history-card__wrap').hide(0);
		current.closest('.history-card').addClass('history-card--active');
		current.find('.history-info').slideToggle(600);
	});
	//history accord===end

	//order-tabs
	$('.order-tab__el').click(function () {
		if (!$(this).hasClass('order-tab__el--active')) {
			$('.order-tab__el').removeClass('order-tab__el--active');
			$(this).addClass('order-tab__el--active');
		}
		var current = $(this).data('tab');
		$('.order-cont__el').each(function () {
			if ($(this).data('tab') === current) {
				$(this).removeClass('hidden');
			} else {
				$(this).addClass('hidden');
			}
		})
	});

	$('.payment-card__el').click(function () {
		$('.payment-card__el').removeClass('payment-card__el--active')
		$(this).addClass('payment-card__el--active')
	});

	$('.payment__type__el').click(function () {
		if ($(this).data('tab') === 'card') {
			$('.payment__type-cont').removeClass('hidden');
		} else {
			$('.payment__type-cont').addClass('hidden');
		}
	});
	//order-tabs===end

	// bug adressbar !!! NOTE
	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', "${vh}px");

	window.addEventListener('resize', function(){
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', "${vh}px");
	});
	// bug adressbar === end

	//datepicker
	function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        var fitsLeft = (rect.left >= 0 && rect.left <= $(window).width());
        var fitsTop = (rect.top >= 0 && rect.top <= $(window).height());
        var fitsRight = (rect.right >= 0 && rect.right <= $(window).width());
        var fitsBottom = (rect.bottom >= 0 && rect.bottom <= $(window).height());
        return {
            top: fitsTop,
            left: fitsLeft,
            right: fitsRight,
            bottom: fitsBottom,
            all: (fitsLeft && fitsTop && fitsRight && fitsBottom)
        };
    }

	var dp = $('.getdate').datepicker({
		minDate: new Date(),
		autoClose: true,
		onHide: function(inst){
        inst.update('position', 'right center'); // Update the position to the default again
    },
    onShow: function(inst, animationComplete){
        // Just before showing the datepicker
        if(!animationComplete){
            var iFits = false;
            // Loop through a few possible position and see which one fits
            $.each(['right center', 'right bottom', 'right top', 'top center', 'bottom center'], function (i, pos) {
                if (!iFits) {
                    inst.update('position', pos);
                    var fits = isElementInViewport(inst.$datepicker[0]);
                    if (fits.all) {
                        iFits = true;
                    }
                }
            });
        }
    }
	}).data('datepicker');

	//При использовании в модальном окне чтобы при скроле оставалось в той же позиции
	$('.modal-wrap').on('scroll', function () {
		dp.update();
	});
	//datepicker===end

	// range row
	if($(".range").length>0){
		$(".range").ionRangeSlider({
			postfix: " баллов",
			prefix: "Списать "
		});
	}
	// range row === end
});
