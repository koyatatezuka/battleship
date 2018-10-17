import User from './User';
import Sound from '../../Sound/Sound';

export const water = new Sound('http://koo.corpus.cam.ac.uk/naturesound/waves/waterSPLASH.WAV')
export const explosion = new Sound('http://d-gun.com/files/sounds/XPLOMAS2.WAV')

water.sound.loop = false;
explosion.sound.loop = false;

export default class UserActions extends User {
	constructor(board) {
		super(board);
	}

	fire(enemyBoard, enemyAction) {
		const message = document.getElementById('message');

		enemyBoard.element.forEach(cell => {
			cell.addEventListener('click', event => {
                // valid if ships are on both boards, is your turn ans game started
				if (
					enemyBoard.gameStarted &&
					enemyBoard.ships.length > 0 &&
					!enemyAction.turn &&
					this.board.ships.length > 0
				) {
					// miss sound
					water.play()
					
					const cell = event.target;
                    // if shot in empty spot
					if (event.target.getAttribute('value') === 'empty') {
						cell.setAttribute('value', 'miss');
						cell.setAttribute('style', 'background-color: rgba(31, 118, 153, 0.78)');
                        message.textContent = `miss`;
                        // enemy turn and fires back
						enemyAction.turn = true;
						enemyAction.fire(this.board);
						 
                        // if shot on a ship
					} else if (
						event.target.getAttribute('value') !== 'miss' &&
						event.target.getAttribute('value') !== 'hit'
					) {
						// hit sound
						explosion.play()
					
                        // gets the ship instance of the ship hit
						const ship = enemyBoard.ships.filter(ship => ship.name == event.target.getAttribute('value'))[0];

						cell.setAttribute('value', 'hit');
                        cell.setAttribute('style', 'background-color: rgba(146, 57, 57, 0.78)');
                        // removes ship size if upon hit
						ship.size -= 1;
						enemyAction.turn = true;
                        // checks if hit ship has no more spots and removes off board
						setTimeout(() => {
							if (ship.size == 0) {
								message.textContent = `You Sunk Their ${ship.name}!`;
								enemyBoard.ships.splice(enemyBoard.ships.indexOf(ship), 1);
							}
						}, 1);
                        // checks if all ships have sunk
						setTimeout(() => {
							if (enemyBoard.ships.length === 0) {
								message.textContent = `player wins!`;
								enemyAction.turn = false;
							}
						}, 2);
                        // allows computer to fire back if game is still active
						setTimeout(() => {
							if (enemyBoard.ships.length > 0) {
								enemyAction.fire(this.board);
							}
						}, 3);

						message.textContent = `hit`;
					}
				}
			});
		});
	}
}
