import { state } from '../index.js'
import { triggerSearchAndUpdateDOM } from '../index.js'

export function displayLabelCard(tags, type) {

	const labelBar = document.querySelector('.label_bar')

	tags.forEach(tag => {
		const label = document.createElement('li')
		const labelCardText = document.createElement('div')
		const closingBtn = document.createElement('img')
		closingBtn.setAttribute('src', '/assets/logos/closing-label-btn.svg')
		closingBtn.setAttribute('alt', 'bouton de fermeture')
		closingBtn.classList.add('closing_label_btn_ingredients')
    
		label.classList.add('label_card')
		label.setAttribute('data-type', type)
		labelCardText.classList.add('label_card_text')
		labelCardText.textContent = tag
		label.appendChild(labelCardText)
		label.appendChild(closingBtn)
		labelBar.appendChild(label)
    
		closingBtn.addEventListener('click', () => {
			label.style.display = 'none'
			const tagType = label.dataset.type
			removeTagFromState(tagType, tag)
		})
	})}
	
function removeTagFromState(type, tag) {
	let elementInState
	// dans quel type on va enlever un élément
	if (type === 'ingredient') {
		elementInState = state.ingClicked
	} else if (type === 'appliance') {
		elementInState = state.appClicked
	} else if (type === 'ustensil') {
		elementInState = state.ustClicked
	}
    
	// findIndex pour trouver l'index de l'élément à supprimer
	const indexToRemove = elementInState.findIndex(element => element === tag)
    
	// Si index trouvé, splice pour supprimer l'élément (-1 >>> aucun élement n'a été trouvé)
	if (indexToRemove !== -1) {
		elementInState.splice(indexToRemove, 1)
	}
    
	triggerSearchAndUpdateDOM()
}

