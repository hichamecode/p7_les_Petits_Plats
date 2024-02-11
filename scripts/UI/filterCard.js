export class FilterCard {
	constructor(dropdownMenu, filterExpBtn) {
		this.dropdownMenu = document.querySelector(dropdownMenu)
		this.filterExpBtn = document.querySelector(filterExpBtn)
		this.attachEventListeners()
		this.reduceDropdown()
	}

	reduceDropdown() {
		this.dropdownMenu.style.display = 'none'
		this.filterExpBtn.classList.remove('expanded')
	}

	toggleFilterCard() {
		if (this.filterExpBtn.classList.contains('expanded')) {
			this.reduceDropdown()
		} else {
			this.dropdownMenu.style.display = 'flex'
			this.filterExpBtn.classList.add('expanded')
		}
	}

	attachEventListeners() {
		this.filterExpBtn.addEventListener('click', () => {
			this.toggleFilterCard()
		}) 
	}
}

