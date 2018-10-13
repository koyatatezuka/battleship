import Utility from '../Utility/Utility';
import Ships from '../Ships/Ships';

export default class Board {
	constructor(element) {
		this.element = element;
		this.gameStarted = false;
		this.ships = [];
		this.grid = [];
	}
	// checks if input obj is already in the ships array
	checkDouble(inp) {
		return this.ships.every(el => el.name !== inp.name);
	}

	addShips(ship) {
		if (this.checkDouble(ship)) {
			this.ships.push(ship);
		}
	}

	initGrid() {
		const valueArray = [];

		this.element.forEach(cell => {
			valueArray.push(cell.getAttribute('value'));
		});

		Utility.createGridArray(valueArray, this.grid, 6);
	}

	resetGridShips() {
		this.ships = [];
		this.grid = [];
		this.gameStarted = false;
	}

	resetBoard() {
		this.element.forEach(cell => {
			cell.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.6); border: 1px solid rgb(25, 185, 25)')  
		});

		this.element.forEach(cell => {
			cell.setAttribute('value', 'empty')
		}) 
	}
}
