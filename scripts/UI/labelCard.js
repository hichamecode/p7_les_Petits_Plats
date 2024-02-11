import { state } from '../index.js'
import { triggerSearchAndUpdateDOM } from '../index.js'

export function displayLabelCard(tags, type) {

	const labelBar = document.querySelector('.label_bar')

	for (let i = 0; i < tags.length; i++) {
		const tag = tags[i]
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
		console.log('dataType ', type)
		console.log('labelBar ', labelBar)

		closingBtn.addEventListener('click', () => {
			label.style.display = 'none'
			const tagType = label.dataset.type
			removeTagFromState(tagType, tag)
		})
	}
}

function removeTagFromState(type, tag) {
	let elementInState
	// dans quel type va t on enlever un element
	if (type == 'ingredient') {
		elementInState = state.ingClicked
	} else if (type == 'appliance') {
		elementInState = state.appClicked
        
	} else if (type == 'ustensil') {
		elementInState = state.ustClicked
		console.log('ust, ', elementInState)
	}
	// on initialise indexToRemove à -1
	let indexToRemove = -1
	for (let i = 0; i < elementInState.length; i++) {
		if (elementInState[i] === tag) {
			indexToRemove = i
			break
		}
	}
	// si le tag est trouvé, on décale tous les elements vers la gauche
	// pas de boucle sur le dernier element car le dernier est dupliqué
	if (indexToRemove !== -1) {
		for (let i = indexToRemove; i < elementInState.length - 1; i++) {
			elementInState[i] = elementInState[i + 1]
		}
		// on ajuste la taille du tableau
		elementInState.length = elementInState.length - 1
	}
	triggerSearchAndUpdateDOM()
}

