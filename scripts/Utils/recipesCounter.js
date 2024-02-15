import { state } from '../index.js'

export function counterOfRecipes(recipes) {
	const filterBar = document.querySelector('.filter_bar')
	let recipesCounter = document.querySelector('.recipes_counter')

	// création de recipesCounter uniquement s'il n'existe pas déja (pour affichage inital)
	if (!recipesCounter) {
		recipesCounter = document.createElement('div')
		recipesCounter.classList.add('recipes_counter')
		filterBar.appendChild(recipesCounter)
	}
	let recipesLength = recipes.length
	if (recipesLength == 1) {
		recipesCounter.textContent = `${recipesLength} recette`

	} else if (recipesLength == 0) {
		recipesCounter.textContent = `${recipesLength} recette`

		const noRecipeContainer = document.createElement('div')
		const noRecipeMessage = document.createElement('p')
		console.log(state.searchKeys)
		noRecipeMessage.textContent = `Aucune recette ne contient '${state.searchKeys}' vous pouvez chercher "tarte aux pommes", "poisson", etc.`
		noRecipeContainer.appendChild(noRecipeMessage)

		const recipesCardsContainer = document.querySelector('.recipe_cards_container')
		recipesCardsContainer.appendChild(noRecipeContainer)
		recipesCardsContainer.style.display = 'flex'
		recipesCardsContainer.style.justifyContent = 'center'
	}
	
	else {
		recipesCounter.textContent = `${recipesLength} recettes`

	}
}
