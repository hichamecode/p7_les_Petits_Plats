
import { createRecipeCard } from './recipeDisplay.js'
import { counterOfRecipes } from './recipesCounter.js'
import Recipes from '../Repository/Recipes.js'

export function searchEngine(searchKeys, ingClicked, appClicked, ustClicked) {
    
	const recipeCardsContainer = document.querySelector('.recipe_cards_container')
	recipeCardsContainer.innerHTML = ''
	let instanceOfRecipes = new Recipes
	let allRecipes = instanceOfRecipes.findAll()
        
	let filteredRecipes = allRecipes
	if (searchKeys) {
		let instanceOfRecipes = new Recipes
		filteredRecipes = instanceOfRecipes.search(searchKeys)
	}
    
	if (ingClicked.length > 0) {
		let instanceOfRecipes = new Recipes
		filteredRecipes = instanceOfRecipes.searchBy(filteredRecipes, ingClicked, 'ingredient')
	}
    
	if (appClicked.length > 0) {
		let instanceOfRecipes = new Recipes
		filteredRecipes = instanceOfRecipes.searchBy(filteredRecipes, appClicked, 'appliance')
	}
    
	if (ustClicked.length > 0) {
		let instanceOfRecipes = new Recipes
		filteredRecipes = instanceOfRecipes.searchBy(filteredRecipes, ustClicked, 'ustensil')
	}
    
	createRecipeCard(filteredRecipes)
	counterOfRecipes(filteredRecipes)
	return filteredRecipes
}
