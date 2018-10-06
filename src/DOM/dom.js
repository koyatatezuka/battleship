const dom = (() => {
	return {
		str: {
			board: '.board',
			turnBtn: '.btn-ship',
			gameBtn: '.btn-game',
			shipCont: '.ship-container'
		},
		f: {
			// node forEach()
			nodeListForEach(list, callback) {
				for (let i = 0; i < list.length; i++) {
					callback(list[i], i);
				}
			},
			// mutli events in one listener
			addListenerMulti(element, eventNames, listener) {
				let events = eventNames.split(' ');
				for (let i = 0; i < events.length; i++) {
					element.addEventListener(events[i], listener, false);
				}
			},
			// switch attribute
			switchAttribute(targetList, otherPlayerList, attr = 'style', targetAttr, otherAttr) {
				this.nodeListForEach(targetList , (cur, i) => {
					cur.setAttribute(attr,targetAttr);
				});
				this.nodeListForEach(otherPlayerList, (cur, i) => {
					cur.setAttribute(attr, otherAttr)
				});
			}
		}
	};
})();

export default dom;
