import DomClass from './DomClass';
import Utility from '../Utility/Utility';
import Ships from '../Ships/Ships'

export default class DomBoard extends DomClass {
	constructor(element) {
		super(element);
		this.playerList = document.querySelectorAll('.player-cell');
		this.compList = document.querySelectorAll('.comp-cell');
	}

	// switch board size based on events
	switchBoard() {
		this.element.forEach(board => {
			Utility.addListenerMultiEvents(board, 'click mouseover', event => {
				if (event.target.className) {
					const targetClass = event.target.className;
                    const targetList = document.querySelectorAll(`.${targetClass}`);
                    
					if (event.target.className == 'player-cell') {
                        Ships.shipSize('50px', '50px', '2px dotted black')
						Utility.switchAttribute(
							targetList,
							this.compList,
							'style',
							'width: 50px; height: 50px; border: 3px solid rgb(25, 185, 25)',
							'width: 20px; height: 5px; border: 1px solid rgb(25, 185, 25)'
						);
					} else if (event.target.className == 'comp-cell') {
                        Ships.shipSize('20px', '25px', '1px dotted black')
						Utility.switchAttribute(
							targetList,
							this.playerList,
							'style',
							'width: 50px; height: 50px; border: 3px solid rgb(25, 185, 25)',
							'width: 20px; height: 5px; border: 1px solid rgb(25, 185, 25)'
						);
					}
				}
			});
		});
	}
}
