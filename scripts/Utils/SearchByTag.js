import { updateState } from '../index.js'
import { triggerSearchAndUpdateDOM } from '../index.js'

export default class TagFinder {
	constructor(list, parentSelector, type) {
		this.list = list
		this.parent = document.querySelector(parentSelector)
		this.type = type
		this.attachEventListener()
	}

	attachEventListener() {
		this.parent.addEventListener('click', (event) => {
			if (event.target && event.target.matches('.tag_element')) {
				const tag = event.target.textContent
				updateState(this.type, tag)
				triggerSearchAndUpdateDOM()
			}
		})
	}
}

