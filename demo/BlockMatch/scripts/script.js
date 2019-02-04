let cards = document.querySelectorAll('.card');
let flipped = false;
let lockBoard = false;
let cardOne, cardTwo;
let flipCount = 0;
function flip() {
	if(lockBoard) return;
	if(this == cardOne) return;
	this.classList.add('flip');
	if(!flipped) {
		// Store the first card
		cardOne = this;
		flipped = true;
	} else {
		// Store the second card
		cardTwo = this;
		flipped = false;
		checkMatch();
	} 
	// flipped = !flipped
}

function checkMatch() {
	// if the card match remove event listener (disabling cards)
	if(cardOne.dataset.country == cardTwo.dataset.country) {
		cardOne.removeEventListener('click', flip);
		cardTwo.removeEventListener('click', flip);
		resetBoard();
	} else {
		// if they do not match unturn card
		lockBoard = true;
		setTimeout(() => {
			cardOne.classList.remove('flip');
			cardTwo.classList.remove('flip');

			resetBoard();
		}, 1500)
		
	}
}

function resetBoard() {
	[cardOne, cardTwo] = [null, null];
	[flipped, lockBoard] = [false, false]
}

(function shuffleCards() {
	cards.forEach(card => {
		let randomNum = Math.floor(Math.random() * 12);
		card.style.order = randomNum;
	})	
})();

cards.forEach(card => {
	card.addEventListener('click', flip)
})