export default class Utility {
    constructor() {

    }

    static addListenerMultiEvents(element, eventNames, listener) {
        let events = eventNames.split(' ');
        for (let i = 0; i < events.length; i++) {
            element.addEventListener(events[i], listener, false);
        }
    }
    // switch attributes between two node lists
    static switchAttribute(targetList, otherPlayerList, attr = 'style', targetAttr, otherAttr) {
        targetList.forEach((cur, i) => {
            cur.setAttribute(attr,targetAttr);
        });
        otherPlayerList.forEach((cur, i) => {
            cur.setAttribute(attr, otherAttr)
        });
    }
}