import Comp from './Comp';
import Utility from '../../Utility/Utility';
import Ships from '../../Ships/Ships';

export default class CompShips extends Comp {
	constructor(board) {
		super(board);
	}

	randomPlacement() {
		let row,
			col,
			selectedNodes = [],
			shipGrid = [];
		// create ship instances and randomizes directions
		const battleShip = new Ships('battleship', 4, Math.round(Math.random()) > 0 ? 'vertical' : 'horizonal');
		const cruiser = new Ships('cruiser', 3, Math.round(Math.random()) > 0 ? 'vertical' : 'horizonal');
		const submarine = new Ships('submarine', 2, Math.round(Math.random()) > 0 ? 'vertical' : 'horizonal');
		const destroyer = new Ships('destroyer', 1, 'vertical');

		// array of ship intances
		const ships = [battleShip, cruiser, submarine, destroyer];

		// init nodes into 6 * 6 grid
		Utility.createGridArray([...this.board.element], shipGrid, 6);

		// keeps looking for place to drop if any ship hasnt dropped
		while (ships.some(ship => ship.dropped === false)) {
			ships.forEach(ship => {
				row = Math.floor(Math.random() * 6);
				col = Math.floor(Math.random() * 6);
				if (ship.dropped === false) {
					for (let i = 0; i < ship.size; i++) {
						// vertical drop
						if (ship.direction === 'vertical') {
							if (row + ship.size < 6) {
								// slices selected nodes based on ships size
								selectedNodes.push(shipGrid[row + i][col]);
							}
						} else if (ship.direction === 'horizonal') {
							if (col + ship.size < 6) {
								// slices selected nodes based on ships size
								selectedNodes.push(shipGrid[row][col + i]);
							}
						}
					}
				}
				// creates an array of values of selected nodes
				let valid = selectedNodes.map(node => node.getAttribute('value'));
				// if every item an the valid array is empty allows drop
				if (
					valid.every(value => value === 'empty') &&
					ship.dropped === false &&
					ship.size === selectedNodes.length
				) {
					selectedNodes.forEach(cell => cell.setAttribute('value', ship.name));
					ship.dropped = true;
					this.board.addShips(ship);

					//clear selected nodes if dropped or isnt valid drop option
					selectedNodes = [];
				} else {
					selectedNodes = [];
				}
			});
		}

		this.board.element.forEach(el => {
			if (el.getAttribute('value') !== 'empty') {
				el.setAttribute('style', 'background-color: green ');
			}
		});
	}
}
