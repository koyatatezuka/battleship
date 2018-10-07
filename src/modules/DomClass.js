export class DomClass {
	constructor(element) {
		this.element = element;
		this.active = false;
	}
}

export class DomBtn extends DomClass {
	constructor(element) {
		super(element);
		this.toggleAttr = this.toggleAttr.bind(this);
	}

	toggleAttr(domEle, attribute = 'style', after, before) {
		this.element.addEventListener('click', event => {
			if (!this.active) {
				this.active = !this.active;
				document.querySelector(domEle).setAttribute(attribute, after);
			} else if (this.active) {
				this.active = !this.active;
				document.querySelector(domEle).setAttribute(attribute, before);
			}
		});
	}
}
