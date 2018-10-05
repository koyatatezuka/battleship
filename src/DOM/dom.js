const dom = (() => {
	return {
		strings: {
			board: '.board'
		},
		nodeListForEach(list, callback) {
			for (let i = 0; i < list.length; i++) {
				callback(list[i], i);
			}
		},
	};
})();

export default dom;