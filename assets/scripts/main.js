const button = document.querySelector('.toggle');
button.addEventListener('click', SwitchTheme);
let checked = true;
function SwitchTheme() {
	if(checked) {
		this.setAttribute('aria-checked', !checked);		
		document.body.className = 'light';
	} else {
		this.setAttribute('aria-checked', !checked);
		document.body.classList.remove("light");
	}

	checked = !checked
}


const DOM = {
	contactButton: document.querySelector('.reach'),
	contact: document.querySelector('.contact'),
	form: document.querySelector('form'),
	input: document.querySelector('.form'),
	message: document.querySelector('.message'),
	cancelButtons: Array.from(document.querySelectorAll('.cancel')),	
	submitButton: document.querySelector('.submit')
}

const open = e => {
	e.preventDefault();
	DOM.contact.style.pointerEvents = 'auto';
	DOM.input.style.pointerEvents = 'auto;'
	anime.remove(DOM.form);
	anime({
		targets: DOM.form,
		duration: 300,
		opacity: 1,
		scale: [0, 1],
		easing: 'easeInQuad'
	})

	anime.remove(DOM.contact);
	anime({
		targets: DOM.contact,
		duration: 300,
		opacity: 1,
		easing: 'easeInQuad'
	})
}

const close = () => {
	DOM.contact.style.pointerEvents = 'none';
	anime.remove(DOM.form);
	anime({
		targets: DOM.form,
		duration: 300,
		opacity: {
			value: 0, duration: 150, delay: 100, easing: 'easeOutQuad'
		},
		scale: [1, 0],
		easing: 'easeOutQuad'
	})

	anime.remove(DOM.contact);
	anime({
		targets: DOM.contact,
		duration: 300,
		opacity: 0,
		easing: 'easeInQuad'
	})

	reset();
}

const reset = () => {
	DOM.input.style.pointerEvents = 'auto';
	DOM.message.style.pointerEvents = 'none';

	anime.remove(DOM.input);
	anime({
		targets: DOM.input,
		duration: 1200,
		scale: { value: 1, delay: 1000 },
		easing: 'easeInSine'
	})

	anime.remove(DOM.message);
	anime({
		targets: DOM.message,
		duration: 300,
		opacity: 0,
		scale: 0,
		easing: 'easeInSine'
	})

}

const submit = () => {
	DOM.input.style.pointerEvents = 'none';
	anime.remove(DOM.input);
	anime({
		targets: DOM.input,
		duration: 300,
		scale: [1, 0],
		easing: 'easeOutSine'
	})

	DOM.message.style.pointerEvents = 'auto';
	anime.remove(DOM.message);
	anime({
		targets: DOM.message,
		duration: 300,
		delay: 100,
		opacity: 1,
		scale: [0, 1],
		easing: 'easeInSine'
	})
}

DOM.contactButton.addEventListener('click', open);
DOM.cancelButtons.forEach(button => {
	button.addEventListener('click', close);
});
DOM.submitButton.addEventListener('click', submit)