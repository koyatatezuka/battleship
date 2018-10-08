

import DomBtn from './modules/DOM/DomBtn';
import DomBoard from './modules/DOM/DomBoard';

import './index.css';


// init
(function() {
    const gameButton = new DomBtn(document.querySelector('.btn-game'));
    const turnButton = new DomBtn(document.querySelectorAll('.btn-ship'))
    const board = new DomBoard(document.querySelectorAll('.board'))
  
    board.switchBoard()
	gameButton.toggleGame();
    turnButton.turnShip()
})();
