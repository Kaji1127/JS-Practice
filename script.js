'use strict';

// Variables
const slider = document.querySelector('#slider');
const btnViewMore = document.querySelector('.btn--view');

// Scroll Event
btnViewMore.addEventListener('click', function () {
	slider.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();

	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
		});
	}
});

// Sticky Navigation
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const stickyNav = function (entries) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			nav.classList.add('sticky');
		} else {
			nav.classList.remove('sticky');
		}
	});
};

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: '-80px',
});

headerObserver.observe(header);

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');
const dots = document.querySelectorAll('.dots__dot');
const maxSlide = slides.length;
let curSlide = 0;

const createDots = function () {
	slides.forEach((_, i) => {
		dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
	});
};

const activeDot = function (slide) {
	document.querySelectorAll('.dots__dot').forEach((dot) => {
		dot.classList.remove('dots__dot--active');
	});
	document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add('dots__dot--active');
};
const goToSlide = function (slide) {
	slides.forEach((s, i) => {
		s.style.transform = `translateX(${100 * (i - slide)}%)`;
	});
};

const prevSlide = function () {
	if (curSlide === 0) {
		curSlide = maxSlide - 1;
	} else {
		curSlide--;
	}
	goToSlide(curSlide);
	activeDot(curSlide);
};
const nextSlide = function () {
	if (curSlide === maxSlide - 1) {
		curSlide = 0;
	} else {
		curSlide++;
	}
	goToSlide(curSlide);
	activeDot(curSlide);
};

const init = function () {
	goToSlide(0);
	createDots();

	activeDot(0);
};
init();

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);
dotsContainer.addEventListener('click', function (e) {
	if (e.target.classList.contains('dots__dot')) {
		const { slide } = e.target.dataset;
		goToSlide(slide);
		activeDot(slide);
	}
});
