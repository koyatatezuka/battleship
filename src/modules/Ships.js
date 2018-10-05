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
}