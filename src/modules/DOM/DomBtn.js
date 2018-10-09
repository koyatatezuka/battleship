import DomClass from './DomClass';
import Ships from '../Ships/Ships';
import Utility from '../Utility/Utility'

export default class DomBtn extends DomClass {
	constructor(element) {
		super(element);
	}

	// start and reset function
	toggleGame(boardInstance) {
		this.element.addEventListener('click', event => {
			if (!this.active) {
				this.active = !this.active;
				boardInstance.gameStarted = true
				document
					.querySelector('.ship-container')
					.setAttribute('style', 'display: none');

				this.element.classList.add('active');
				this.element.textContent = 'RESET';
			} else if (this.active) {
				this.active = !this.active;
				boardInstance.gameStarted = false
				document
					.querySelector('.ship-container')
					.setAttribute('style', 'display: show');

				this.element.classList.remove('active');
				this.element.textContent = 'START';

				Ships.shipSize('48px', '48px', '2px dotted black');
				Utility.switchAttribute(
					boardInstance.playerCellList,
					boardInstance.compCellList,
					'style',
					'width: 50px; height: 50px; border: 2px solid rgb(25, 185, 25)',
					'width: 20px; height: 5px; border: 1px solid rgb(25, 185, 25)'
				);
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
