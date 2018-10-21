import Players from '../Players';
import Utility from '../../Utility/Utility';

export default class CompActions extends Players {
	constructor(board) {
		super(board);
		this.turn = false;
	}

	fire(playerBoard) {
		if (playerBoard.ships.length > 0) {
			while (this.turn) {
				let playerGrid = [];
				let col = Math.floor(Math.random() * 6);
				let row = Math.floor(Math.random() * 6);

				Utility.createGridArray([...playerBoard.element], playerGrid, 6);
				const selectedCell = playerGrid[row][col];
				// if shot misses
				if (selectedCell.getAttribute('value') === 'empty') {
					selectedCell.setAttribute('value', 'miss');
					selectedCell.setAttribute('style', 'background-color: rgba(31, 118, 153, 0.78)');
					this.turn = false;
					// if shot hits a ship
				} else if (
					selectedCell.getAttribute('value') !== 'miss' &&
					selectedCell.getAttribute('value') !== 'hit'
				) {
					// gets the instance of the ship hit
					const ship = playerBoard.ships.filter(ship => ship.name == selectedCell.getAttribute('value'))[0];

					selectedCell.setAttribute('value', 'hit');
					selectedCell.setAttribute('style', 'background-color: rgba(146, 57, 57, 0.78)');
					// removes size of ship hit
					ship.size -= 1;
					// checks if ship has size left and removes off board if not
					setTimeout(() => {
						if (ship.size == 0) {
							playerBoard.ships.splice(playerBoard.ships.indexOf(ship), 1);
						}
					}, 1);
					// checks if game is over
					setTimeout(() => {
						if (playerBoard.ships.length === 0) {
							document.getElementById('message').textContent = `computer wins!`;
						}
					}, 2);

					this.turn = false;
				}
			}
		}
	}
}
