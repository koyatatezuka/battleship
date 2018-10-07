import './modules/events';
import Ships from './modules/Ships';
import { DomClass, DomBtn } from './modules/DomClass';

import './index.css';

// init
(function() {
    const gameButton = new DomBtn(document.querySelector('.btn-game'));
    

    // toggle start - reset button
	gameButton.toggleAttr(
		'.ship-container',
		'style',
		'display: none',
		'display: show'
	);
})();
