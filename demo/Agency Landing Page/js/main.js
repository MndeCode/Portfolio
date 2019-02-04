const DOM = {
	menu: document.querySelector('#menu'),
	headerMenu: document.querySelector('.header__menu'),
	gallery: document.querySelector('.work__gallery')
}

const open = () => {
	if(DOM.headerMenu.classList.contains('open')) {
		DOM.headerMenu.classList.remove('open');	
	} else { 
		DOM.headerMenu.classList.add('open');
	}
}

// const iso = new Isotope(DOM.gallery, {
// 	itemSelector: '.work__wrapper',
// 	layoutMode: 'fitRows'
// })

DOM.menu.addEventListener('click', open)