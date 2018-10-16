import User from './User';
import Utility from '../../Utility/Utility';
import Ships from '../../Ships/Ships';

export default class UserShips extends User {
	constructor(board) {
		super(board);
		this.direction = 'vertical';
	}

	placeShips() {
		let row,
			col,
			selectedShip,
			shipGrid = [],
			selectedNodes = [],
			nodeArr;

		Utility.createGridArray([...this.board.element], shipGrid, 6);
		// hover effect for placement
		this.board.element.forEach(cell => {
			cell.addEventListener('mouseover', event => {
				row = +event.target.getAttribute('data-row');
				col = +event.target.getAttribute('data-col');

				if (this.board.ships.length > 0 && !this.board.gameStarted) {
					selectedShip = this.board.ships.filter(el => el.name === this.name)[0];

					// checks for valid ships
					if (selectedShip.name && selectedShip.name !== '0' && !selectedShip.dropped) {
						if (selectedShip.direction === 'vertical') {
							// vertical
							for (let i = 0; i < selectedShip.size; i++) {
								if (row + i <= 5) {
									selectedNodes.push(shipGrid[row + i][col]);
								}
							}
							while (selectedNodes.length > Utility.rightLength(selectedShip.size, row)) {
								selectedNodes.shift();
							}
						} else {
							// horizonal
							for (let i = 0; i < selectedShip.size; i++) {
								if (col + i <= 5) {
									selectedNodes.push(shipGrid[row][col + i]);
								}
							}
							while (selectedNodes.length > Utility.rightLength(selectedShip.size, col)) {
								selectedNodes.shift();
							}
						}
						nodeArr = selectedNodes.map(el => el.getAttribute('value'));
						if (nodeArr.every(el => el == 'empty')) {
							selectedNodes.forEach(el => (el.style.backgroundColor = 'black'));
						}
					}
				}
			});
			// drops ship on click
			this.board.element.forEach(cell => {
				cell.addEventListener('click', () => {
					// checks if ships are initalized
					if (this.board.ships.length > 0 && !this.board.gameStarted) {
						selectedShip = this.board.ships.filter(el => el.name === this.name)[0];
						// checks if the ship is the board and the cells are empty
						if (
							selectedShip.size === selectedNodes.length &&
							!selectedShip.dropped &&
							nodeArr.every(el => el == 'empty')
						) {
							selectedNodes.forEach(el => {
								el.setAttribute('style', 'background-color: rgb(25, 185, 25); border: 1px solid black');
								el.setAttribute('value', selectedShip.name);
								selectedShip.dropped = true;
							});
						}
					}
				});
			});

			// erases hover if not dropped
			this.board.element.forEach(cell => {
				cell.addEventListener('mouseleave', event => {
					if (this.board.ships.length > 0 && !this.board.gameStarted) {
						selectedShip = this.board.ships.filter(el => el.name === this.name)[0];
						if (!selectedShip.dropped && nodeArr.every(el => el == 'empty')) {
							selectedNodes.forEach(el => (el.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'));
						}
					}
				});
			});
		});
	}

	shipSelect(shipSelector) {
		const turn = document.querySelector('.ship-turn');

		// changes direction based on ship turn btn
		turn.addEventListener('click', () => {
			let selectedShip = this.board.ships.filter(el => el.name === this.name)[0];
			if (this.board.ships.length > 0 && selectedShip.dropped === false) {
				if (turn.textContent == 'vertical') {
					turn.textContent = 'horizonal';
					this.board.ships[this.board.ships.length - 1].direction = turn.textContent;
					this.direction = turn.textContent;
				} else if (turn.textContent == 'horizonal') {
					turn.textContent = 'vertical';
					this.board.ships[this.board.ships.length - 1].direction = turn.textContent;
					this.direction = turn.textContent;
				}
			}
		});
		// changes target ship based on option select
		shipSelector.element.addEventListener('change', event => {
			this.name = event.target.value;
			// makes sure the targets have valid names
			if (this.name !== '0') {
				switch (this.name) {
					case 'battleship':
						this.size = 4;
						break;
					case 'cruiser':
						this.size = 3;
						break;
					case 'submarine':
						this.size = 2;
						break;
					case 'destroyer':
						this.size = 1;
						break;
					default:
						break;
				}
				this.board.addShips(new Ships(this.name, this.size, this.direction));
			}
		});
	}
}
