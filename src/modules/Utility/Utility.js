export default class Utility {
	constructor() {
		this.filterArrayObjects = this.filterArrayObjects.bind(this);
	}
	// array turnicate
	static createGridArray(array, newGrid, size) {
		for (let i = 0; i < array.length; i += size) {
			newGrid.push(array.slice(i, i + size));
		}
	}

	// gives me the right number of array items to delete based on row or col value and shipsize
	static rightLength(shipSize, number) {
		if (shipSize === 4) {
			return number === 0 || number === 1 || number === 2 ? 4 : number === 3 ? 3 : number === 4 ? 2 : 1;
		} else if (shipSize === 3) {
			return number === 0 || number === 1 || number === 2 || number === 3 ? 3 : number === 2 ? 2 : 1;
		} else if (shipSize === 2) {
			return number === 0 || number === 1 || number === 2 || number === 3 || number === 4 ? 2 : 1;
		} else {
			return 1;
		}
	}
	// returns the object with matching prop and key
	static filterArrayObjects(arr, prop, key) {
		return arr.filter(el => el.prop === key)[0];
	}
}
