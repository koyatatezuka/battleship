import DomClass from './DomClass';

export default class DomBtn extends DomClass {
	constructor(element) {
		super(element);
	}

	// start and reset function
	toggleGame() {
		this.element.addEventListener('click', event => {
			if (!this.active) {
				this.active = !this.active;

				document
					.querySelector('.ship-container')
					.setAttribute('style', 'display: none');

				this.element.classList.add('active');
				
				this.element.textContent = 'RESET'

			} else if (this.active) {
				this.active = !this.active;
				document
					.querySelector('.ship-container')
					.setAttribute('style', 'display: show');

				this.element.classList.remove('active');

				this.element.textContent = 'START'
			}
		});
	}

	turnShip() {
		// element must be a node list
		this.element.forEach(cur => {
			cur.addEventListener('click', event => {
				const target = event.target.previousSibling.previousSibling;

				target.classList.toggle('ship-turn');
			});
		});
	}
}
