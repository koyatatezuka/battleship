import Board from './modules/Board/Board';
import DomBtn from './modules/DOM/DomBtn';
import interact from 'interactjs';

import './index.css';

// init
(function() {
	const gameButton = new DomBtn(document.querySelector('.btn-game'));
	const turnButton = new DomBtn(document.querySelectorAll('.btn-ship'));
	const board = new Board(document.querySelectorAll('.board'));

	board.switchBoard();
	gameButton.toggleGame(board);
	turnButton.turnShip();
})();

// trying to figure it out
function nodeListForEach(list, callback) {
	for (let i = 0; i < list.length; i++) {
		callback(list[i], i);
	}
}

function dragMoveListener(event) {
	nodeListForEach(event.target.parentNode.children, cur => {
		let target = cur;

		// keep the dragged position in the data-x/data-y attributes
		let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
		let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform = target.style.transform =
			'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	});
}

function revertBack(event) {
	nodeListForEach(event.target.parentNode.children, cur => {
		let target = cur;

		target.style.webkitTransform = target.style.transform =
			'translate(0px, 0px)';

		target.setAttribute('data-x', 0);
		target.setAttribute('data-y', 0);
	});
}

interact('.board').dropzone({
	accept: '.ship-parts',
	overlap: 0.75,
	ondragenter: function(event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
		var dropRect = interact.getElementRect(event.target),
			dropCenter = {
				x: dropRect.left + dropRect.width / 2,
				y: dropRect.top + dropRect.height / 2
			};

		event.draggable.snap({
			anchors: [dropCenter]
		});
    },
    ondragleave: function(event) {
        event.draggable.snap(false);
    }
});

interact('.ship-parts').draggable({
	inertia: true,
	max: Infinity,
	maxPerElement: 4,
    autoScroll: true,
    restrict: {
        drag: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
	// dragMoveListener from the dragging demo above
	onmove: dragMoveListener,
	//onend: revertBack
});

interact('.ship-parts').snap({
    mode: 'anchor',
    anchors: [],
    range: Infinity,
    elementOrigin: { x: 0.5, y: 2 },
    endOnly: true
});