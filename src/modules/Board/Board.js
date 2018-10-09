import Utility from '../Utility/Utility';
import Ships from '../Ships/Ships';

export default class Board {
	constructor(element) {
        this.element = element;
        this.gameStarted = false;
        this.playerCellList = document.querySelectorAll('.player-cell');
		this.compCellList = document.querySelectorAll('.comp-cell');
    }

    switchBoard() {
		this.element.forEach(board => {
			Utility.addListenerMultiEvents(board, 'click mouseover', event => {
				if (event.target.className) {
					const targetClass = event.target.className;
					const targetList = document.querySelectorAll(`.${targetClass}`);
					// checks if the game is active
					if (this.gameStarted) {
						if (event.target.className == 'player-cell') {
							Ships.shipSize('48px', '48px', '2px dotted black');
							Utility.switchAttribute(
								targetList,
								this.compCellList,
								'style',
								'width: 50px; height: 50px; border: 2px solid rgb(25, 185, 25)',
								'width: 20px; height: 5px; border: 1px solid rgb(25, 185, 25)'
							);
						} else if (event.target.className == 'comp-cell') {
							Ships.shipSize('20px', '25px', '1px dotted black');
							Utility.switchAttribute(
								targetList,
								this.playerCellList,
								'style',
								'width: 50px; height: 50px; border: 2px solid rgb(25, 185, 25)',
								'width: 20px; height: 5px; border: 1px solid rgb(25, 185, 25)'
							);
						}
					}
				}
			});
		});
	}

}