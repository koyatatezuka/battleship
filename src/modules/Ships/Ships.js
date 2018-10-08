export default class Ships {
	constructor(name, size) {
		this._name = name;
		this._size = size;
	}
	get name() {
		return this._name;
	}
	get size() {
		return this._size;
	}

	static shipSize(width, height, borderStyle) {
        const shipPartsList = document.querySelectorAll('.ship-parts');
        
        shipPartsList.forEach(ship => {
            ship.setAttribute('style', `width:${width}; height:${height}; border:${borderStyle}`)
        })
	}
}
