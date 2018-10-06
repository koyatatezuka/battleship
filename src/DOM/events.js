import dom from './dom';
import Ships from '../modules/Ships';

// all board related events
const boardControl = (() => {
	const boardList = document.querySelectorAll(dom.str.board);

	// switch board sizes based on event target
	dom.f.nodeListForEach(boardList, cur => {
		dom.f.addListenerMulti(cur, 'click mouseover', event => {
			if (event.target.className) {
				let targetClass = event.target.className;
				// list based on event target element
				const targetList = document.querySelectorAll(`.${targetClass}`);
				const playerList = document.querySelectorAll('.player-cell');
				const compList = document.querySelectorAll('.comp-cell');
				// change css attibute based on target
				if (event.target.className == 'player-cell') {
					dom.f.switchAttribute(
						targetList,
						compList,
						'style',
						'width: 50px; height: 50px; border: 3px solid rgb(25, 185, 25)',
						'width: 20px; height: 5px; border: 1px solid rgb(25, 185, 25)'
					);
				} else if (event.target.className == 'comp-cell') {
					dom.f.switchAttribute(
						targetList,
						playerList,
						'style',
						'width: 50px; height: 50px; border: 3px solid rgb(25, 185, 25)',
						'width: 20px; height: 5px; border: 1px solid rgb(25, 185, 25)'
					);
				}
			}
		});
	});
})();

// all ship related events

const shipControl = (() => {
	const battleship = new Ships('battleship', 4),
		cruiser = new Ships('cruiser', 3),
		submarine = new Ships('submarine', 2),
		destroyer = new Ships('destroyer', 1);

    const turnBtnList = document.querySelectorAll(dom.str.turnBtn);
    let started = false;

	// ship turn button

	dom.f.nodeListForEach(turnBtnList, cur => {
		cur.addEventListener('click', event => {
			const target = event.target.previousSibling.previousSibling;

			target.classList.toggle('ship-turn');
		});
	});

	// game start button
 
	document.querySelector(dom.str.gameBtn).addEventListener('click', event => {
		// toggle start / reset

        if (!started) {
            started = !started
            document.querySelector(dom.str.shipCont).setAttribute('style', 'display: none');
        } else if (started) {
            started = !started;
            document.querySelector(dom.str.shipCont).setAttribute('style', 'display: show');
        }
		
    });
    
})();
