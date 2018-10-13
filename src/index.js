import Board from './modules/Board/Board';
import DomBtn from './modules/DOM/DomBtn';
import Ships from './modules/Ships/Ships';
import UserShips from './modules/players/User/UserShips';

import './index.css';

// init
(function() {
	const gameButton = new DomBtn(document.querySelector('.btn-game'));
	const shipSelector = new DomBtn(document.querySelector('.ships'));
    console.log(shipSelector.element[0])
	const compBoard = new Board(document.querySelectorAll('.comp-cell'));
	const playerBoard = new Board(document.querySelectorAll('.player-cell'));

    const playerShips = new UserShips(playerBoard);
    
	playerShips.shipSelect(shipSelector);
    playerShips.placeShips()
    
	gameButton.toggleGame(playerBoard);
})();
