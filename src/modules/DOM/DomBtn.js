
import Ships from '../Ships/Ships';
import Board from '../Board/Board';

export default class DomBtn {
	constructor(element) {
		this.element = element;
	}

	// start and reset function
	toggleGame(board) {
		this.element.addEventListener('click', event => {
			this.selectFocus()
			if (board.ships.length === 4 && !board.gameStarted) {
				board.gameStarted = true;
				board.initGrid()
				this.element.classList.add('active');
				this.element.textContent = 'RESET';
				

			} else if (board.gameStarted) {
				
				board.resetGridShips();
				board.resetBoard();
				this.element.classList.remove('active');
				this.element.textContent = 'START';
				// removes ships from board
				while(board.ships.length > 0) {
					board.ships.pop()
				}
			
			}
		});
	}

	selectFocus() {
		const selector = document.querySelector('.ships');

		selector.item(0).focus()
	}

}
