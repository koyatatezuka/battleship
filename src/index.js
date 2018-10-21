import Board from './modules/Board/Board';
import DomBtn from './modules/DOM/DomBtn';
import UserShips from './modules/players/User/UserShips';
import CompShips from './modules/players/Comp/CompShips';
import UserActions from './modules/players/User/UserActions';
import CompActions from './modules/players/Comp/CompActions';
import { preStartMusic } from './modules/Sound/Sound';

import './index.css';

// init
(function() {
	// btn and selects
	const gameButton = new DomBtn(document.querySelector('.btn-game'));
	const shipSelector = new DomBtn(document.querySelector('.ships'));
	// board intsance for both players
	const compBoard = new Board(document.querySelectorAll('#comp-cell'));
	const playerBoard = new Board(document.querySelectorAll('#player-cell'));
	// players ship intances
	const playerShips = new UserShips(playerBoard);
	const compShips = new CompShips(compBoard);
	// players action instances
	const playerAction = new UserActions(playerBoard);
	const compAction = new CompActions(compBoard);
	// on load music start

	document.onreadystatechange = function() {
		if (document.readyState == 'interactive') {
			preStartMusic.play();
		}
	};
	// ship actions
	playerShips.selectShip(shipSelector);
	playerShips.placeShips();
	// actions
	playerAction.fire(compBoard, compAction);
	// toggle game
	gameButton.toggleGame(playerBoard, compBoard, compShips);
})();
