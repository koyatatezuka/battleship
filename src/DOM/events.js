import dom from './dom';

const eventControl = (() => {
    const boardList = document.querySelectorAll(dom.strings.board);
    

    // switches board size based on target
    const switchSize = (targetList, otherPlayerList) => {
        dom.nodeListForEach(targetList, (cur,i) => {
            cur.setAttribute('style', 'width: 50px; height: 50px; border: 3px solid rgb(25, 185, 25)')
        });
        dom.nodeListForEach(otherPlayerList, (cur,i) => {
            cur.setAttribute('style', 'width: 15px; height: 15px; border: 1px solid rgb(25, 185, 25)')
        });
    }

	dom.nodeListForEach(boardList, (cur, i) => {
		cur.addEventListener('click', event => {
            const targetList = document.querySelectorAll('#'+event.target.id)
            const playerList = document.querySelectorAll('#player-cell')
            const compList = document.querySelectorAll('#comp-cell')
            
            if (event.target.id == 'player-cell') {
                switchSize(targetList, compList)
            } else if (event.target.id == 'comp-cell') {
                switchSize(targetList, playerList)
            }
           
		});
	});
})();
