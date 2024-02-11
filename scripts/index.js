
import RecipesRepository from './Repository/Recipes.js'
import IngredientExtractor from './Utils/IngredientExtractor.js'
import ApplianceExtractor from './Utils/ApplianceExtractor.js'
import UstensilExtractor from './Utils/UstensilExtractor.js'
import TagFinder from './Utils/SearchByTag.js'
import { searchEngine } from './Utils/searchEngine.js'
import { FilterCard } from './UI/filterCard.js'
import { displayLabelCard } from './UI/labelCard.js'

const recipesRepository = new RecipesRepository()
let recipes = recipesRepository.findAll()

export let state = {
	searchKeys: '',
	ingClicked: [],
	appClicked: [],
	ustClicked: []
}

export function updateState(type, tag) {
	let elementInState
	if (type === 'ingredient') {
		elementInState = state.ingClicked
	} else if (type === 'appliance') {
		elementInState = state.appClicked
	} else if (type === 'ustensil') {
		elementInState = state.ustClicked
	}

	let tagFound = false
	for (let i = 0; i < elementInState.length; i++) {
		if (elementInState[i] === tag) {
			tagFound = true
			break
		}
	}

	if (!tagFound) {
		elementInState[elementInState.length] = tag
	}
}

function createLists(recipes) {

	const ingredientExtractor = new IngredientExtractor()
	ingredientExtractor.setRecipes(recipes)
	const ingredients = ingredientExtractor.extractDataDeDuplicated('ingredient')

	const applianceExtractor = new ApplianceExtractor()
	applianceExtractor.setRecipes(recipes)
	const appliances = applianceExtractor.extractDataDeDuplicated('appliance')

	const ustensilExtractor = new UstensilExtractor()
	ustensilExtractor.setRecipes(recipes)
	const ustensils = ustensilExtractor.extractDataDeDuplicated('ustensil')

	return { ingredients, appliances, ustensils }
}

const { ingredients, appliances, ustensils } = createLists(recipes)

function addListToDOM(listName, arrayOfElements, elementClass) {
	const list = document.querySelector(listName)
	list.innerHTML = ''

	for (let i = 0; i < arrayOfElements.length; i++) {
		const element = document.createElement('li')
		element.classList.add(elementClass)
		element.classList.add('tag_element')
		element.textContent = arrayOfElements[i]
		list.appendChild(element)
	}
}

export function triggerSearchAndUpdateDOM() {
	const recipes = searchEngine(state.searchKeys, state.ingClicked, state.appClicked, state.ustClicked)
	const { ingredients, appliances, ustensils } = createLists(recipes)
	addListToDOM('.ingredients_list', ingredients, 'ingredient_element')
	addListToDOM('.appliances_list', appliances, 'appliance_element')
	addListToDOM('.ustensils_list', ustensils, 'ustensil_element')

	const statesWithTypes = [
		{tags: state.ingClicked, type :'ingredient'},
		{tags: state.appClicked, type : 'appliance'},
		{tags: state.ustClicked, type : 'ustensil'}
	]

	displayLabelCard(state.ingClicked, 'ingredient')
	displayLabelCard(state.ustClicked, 'ustensil')
	displayLabelCard(state.appClicked, 'appliance')

	const labelBar = document.querySelector('.label_bar')
	labelBar.innerHTML = ''

	for (let i = 0; i < statesWithTypes.length; i++) {
		const { tags, type } = statesWithTypes[i]
		displayLabelCard(tags, type)
	}
}

const form = document.querySelector('.search_bar_form')
form.addEventListener('submit', (event) => {
	event.preventDefault()
})

const filterCardsForm = document.querySelectorAll('.filter_card_form')
for (let i = 0; i < filterCardsForm.length; i++) {
	filterCardsForm[i].addEventListener('submit', (event) => {
		event.preventDefault()
		console.log('test ok for preventing')
	})
}

// initialisation de la recherche et du DOM
triggerSearchAndUpdateDOM()

const searchBar = document.querySelector('.search_bar')
searchBar.addEventListener('input', () => {
	let value = searchBar.value

	if (value.length >= 3) {
		state.searchKeys = value
	} else {
		state.searchKeys = ''
	}
	triggerSearchAndUpdateDOM()
})

// Initialisation de TagFinder pour chaque catégorie
new TagFinder(ingredients, '.ingredients_list', 'ingredient')
new TagFinder(appliances, '.appliances_list', 'appliance')
new TagFinder(ustensils, '.ustensils_list', 'ustensil')

function filterSearch(inputSelector, dataList, listSelector, elementClass) {
	const inputField = document.querySelector(inputSelector)

	inputField.addEventListener('input', () => {
		const inputValue = inputField.value.toLowerCase()
		const regex = new RegExp(inputValue)

		const list = document.querySelector(listSelector)
		list.innerHTML = ''

		const filteredData = []
		let index = 0
		for (let i = 0; i < dataList.length; i++) {
			if (regex.test(dataList[i].toLowerCase())) {
				filteredData[index] = dataList[i]
				index++
			}
		}
		addListToDOM(listSelector, filteredData, elementClass)
	})
}

filterSearch('.filter_card_search_ingredients', ingredients, '.ingredients_list', 'ingredient_element')
filterSearch('.filter_card_search_appliances', appliances, '.appliances_list', 'appliance_element')
filterSearch('.filter_card_search_ustensils', ustensils, '.ustensils_list', 'ustensil_element')

new FilterCard('.dropdown_menu_ingredients', '.filter_ingredients_card')
new FilterCard('.dropdown_menu_appliances', '.filter_appliances_card')
new FilterCard('.dropdown_menu_ustensils', '.filter_ustensils_card')