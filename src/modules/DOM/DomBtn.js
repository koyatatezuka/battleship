import Ships from '../Ships/Ships';
import Board from '../Board/Board';
import Sound from '../Sound/Sound';
import { water, explosion, preStartMusic, gameMusic } from '../Sound/Sound';

export default class DomBtn {
	constructor(element) {
		this.element = element;
	}

	// start and reset function
	toggleGame(playerBoard, computerBoard, compShips) {
		//audio actions

		this.toggleSound([preStartMusic, gameMusic, water, explosion]);

		const messageBox = document.querySelector('.message-box');
		const message = document.getElementById('message');
		const actionContainer = document.querySelector('.action-container');
		this.element.addEventListener('click', event => {
			if (playerBoard.ships.length === 4 && !playerBoard.gameStarted) {
				// game start music
				preStartMusic.stop();
				gameMusic.play();
				// init board and game
				playerBoard.gameStarted = true;
				computerBoard.gameStarted = true;
				compShips.randomPlacement();

				computerBoard.initGrid();
				playerBoard.initGrid();

				this.element.classList.add('active');
				this.element.textContent = 'RESET';

				actionContainer.setAttribute('style', 'display: none');
				messageBox.setAttribute('style', 'display: show');
				message.textContent = 'Game Has Started';
			} else if (playerBoard.gameStarted) {
				actionContainer.setAttribute('style', 'display: show');
				// game reset music
				gameMusic.stop();
				preStartMusic.play();
				//reset board and game
				playerBoard.resetGridShips();
				playerBoard.resetPlayerBoard();
				computerBoard.resetGridShips();
				computerBoard.resetCompBoard();

				this.element.classList.remove('active');
				this.element.textContent = 'START';

				//init first ship
				this.initFirstShip(playerBoard);
				message.textContent = '';
				messageBox.setAttribute('style', 'display: none');
			}
		});
	}

	initFirstShip(playerBoard) {
		const seleted = document.querySelector('.ships');
		const turn = document.querySelector('.ship-turn');
		const size = parseInt(seleted.options[seleted.selectedIndex].textContent.match(/\d/g)[0]);
		const name = seleted.options[seleted.selectedIndex].value;
		const direction = turn.textContent;

		playerBoard.addShips(new Ships(name, size, direction));
	}

	toggleSound(soundArr) {
		document.getElementById('sound-btn').addEventListener('click', event => {
			if (event.target.textContent === 'sound off') {
				event.target.textContent = 'sound on';
				soundArr.forEach(sound => (sound.sound.muted = true));
			} else if (event.target.textContent === 'sound on') {
				event.target.textContent = 'sound off';
				soundArr.forEach(sound => (sound.sound.muted = false));
			}
		});
	}
}
