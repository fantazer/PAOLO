$(document).ready(function () {

	// scroll to id
	$("a[rel='m_PageScroll2id']").mPageScroll2id({
			offset:100,
			highlightClass:"head-nav__el--active",
			onComplete:function(){
				$('.header-navs').hide();
			}
	});
	// scroll to id === end

	// nice select
	$('.select-beauty').niceSelect();
	// nice select === end

	//custom scroll
	$(".nice-scroll").niceScroll({
		autohidemode:"false",
		touchbehavior:"true"
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
	$('.head-toggle--open').click(function(){
		$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
	});

	$('.head-toggle').click(function(event){
		event.stopPropagation();
		$(this).toggleClass('head-toggle--open');
		$('.slide-menu').toggleClass('slide-menu--open');
		//$('body').toggleClass('body-fix')
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
			$('.head-wrap').removeClass('head--up');
			$('.head-toggle').removeClass('head-toggle--open');
			$('.slide-menu').removeClass('slide-menu--open');
			console.log(modalState.isModalShow);
			if(modalState.isModalShow == false){
				$('body').removeClass('body-fix')
		}
	});
	//mobile menu===end

	// fix top-menu
	var shrinkHeader = 150;
	var heightHeader=$('.head-main-wrap').height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				$('body').css('paddingTop',heightHeader);
				$('.head-main-wrap').addClass('shrink');
			}
			else {
					$('body').css('paddingTop',0);
					$('.head-main-wrap').removeClass('shrink');
			}
	});

	$(window).resize(function(){
		heightHeader=$('.header').height();
	});
	// fix top-menu === end

	// toggle search
	$('.head-search').click(function(){
		$('.head-top-nav').toggleClass("head-top-nav--active");
		$('.head-top-search-wrap').fadeToggle("100");
	});
	// toggle search === end
	
	// sliders
		// Main slider
		$('.main-slider').slick({
				slidesToShow: 1,
				speed: 500,
				dots:false,
				arrows:false,
				//autoplay: true,
				//fade: true
				//autoplaySpeed: 8000, time between
				customPaging : function(slider, i) {
					return '<span class="dot"></span>';
				}
		});
		// Main slider === end
		// === custom arrow el ===
		$('.slider-control--right').click(function(){
			$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
		});

		$('.slider-control--left').click(function(){
			$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
		});
		// custom arrow el === end

		$('.review-slider').slick({
			slidesToShow: 3,
			speed: 500,
			dots:true,
			arrows:false,
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
			customPaging : function(slider, i) {
				return '<span class="dot"></span>';
			}
		});
	// sliders === end

	//increment field
	$('.incr__minus').click(function () {
		var countIncr = $(this).closest(".wrap-incr").find(".el-incr:visible").length; // число строк с инкриментом
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) - 1;
		if(count > 0){
			$(this).closest(".elements-icr-block").addClass("elements-icr-block--active");
		}else{
			$(this).closest(".elements-icr-block").removeClass("elements-icr-block--active");
		}
		if(!$(this).hasClass("incr--one")){ // add class incr--one for 1 always
			if(count < 1){
				count = 0;
			}
		}else{
			if(count < 1){
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
		if(count > 0){
			$(this).closest(".elements-icr-block").addClass("elements-icr-block--active");
		}else{
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
	$('.description__more').click(function(){
		$('.description__text--hidden').slideToggle();
		$(this).toggleClass('description__more--open');
	});
	// toggle descr more text === end

	// STICK
	var isMobile = function(){
		if($(window).width() > 1025 ){
			$(".panel-wrap").stick_in_parent({
				'offset_top':100
			});
		}

		if($(window).width() < 769 ){
			$(".panel-wrap").trigger("sticky_kit:detach");
		}
	};
	$(window).resize(function(){
		isMobile();
		/*if($(window).width() > 769){
			initSlider();
		}*/
	});
	isMobile();
	// STICK === end

	// toggle energy info
	$('.goods-energy').click(function(){
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
	$('.order-tab__el').click(function(){
		if(!$(this).hasClass('order-tab__el--active')){
			$('.order-tab__el').removeClass('order-tab__el--active');
			$(this).addClass('order-tab__el--active');
		}
		var current = $(this).data('tab');
		$('.order-cont__el').each(function(){
			if($(this).data('tab')===current){
				$(this).removeClass('hidden');
			}else{
				$(this).addClass('hidden');
			}
		})
	});

	$('.payment-card__el').click(function(){
		$('.payment-card__el').removeClass('payment-card__el--active')
		$(this).addClass('payment-card__el--active')
	});

	$('.payment__type__el ').click(function(){
		if($(this).data('tab')==='card'){
				$('.payment__type-cont').removeClass('hidden');
			}else{
				$('.payment__type-cont').addClass('hidden');
		}
	});
	//order-tabs===end
});
