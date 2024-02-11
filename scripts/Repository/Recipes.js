import { recipes } from '../../data/recipes.js'
import ExtractDataToObject from '../Utils/ExtractDataToObject.js'

export default class Recipes {

	findAll() {
		return recipes
	}

	search(tag) {
		const result = [], allRecipes = this.findAll(), recipesLength = allRecipes.length

		for (let i = 0; i < recipesLength; i++) {
			const recipe = allRecipes[i]

			let pattern = new RegExp('.*' + tag + '.*', 'i')
			if (this.tagInNameOrDescription(recipe, pattern) || this.tagInIngredients(recipe, pattern)) {
				result[result.length] = recipe
				continue
			}
			continue
		}
		return result
	}

	tagInNameOrDescription(recipe, pattern) {
		return pattern.test(recipe.name) || pattern.test(recipe.description)
	}

	tagInIngredients(recipe, pattern) {
		const ingredientNames = ExtractDataToObject.extractInArray(recipe.ingredients, 'ingredient')
		for (let i = 0; i < ingredientNames.length; i++) {
			const ingredientName = ingredientNames[i]
			if (pattern.test(ingredientName)) {
				return true
			}
		}
		return false
	}

	searchBy(recipes, tags, type) {
		let result = []
		let resultIndex = 0

		for (let i = 0; i < recipes.length; i++) {
			let recipe = recipes[i]
			let isMatch = true // initialisation à true 

			if (type === 'ingredient' && tags.length > 0) {
				for (let t = 0; t < tags.length; t++) {
					let tagFound = false
					for (let j = 0; j < recipe.ingredients.length; j++) {
						if (recipe.ingredients[j].ingredient === tags[t]) {
							tagFound = true
							break // on arrete la recherche sur ce tag
						}
					}
					if (!tagFound) {
						isMatch = false
						break
					}
				}
			} else if (type === 'appliance' && tags.length > 0) {
				for (let t = 0; t < tags.length; t++) {
					let tagFound = false
					let recipeApplianceToLowerCase = recipe.appliance.toLowerCase()
					if (recipeApplianceToLowerCase === tags[t]) {
						tagFound = true
						break
					}
					if (!tagFound) {
						isMatch = false
					}
				}

			} else if (type === 'ustensil' && tags.length > 0) {
				for (let t = 0; t < tags.length; t++) {
					let tagFound = false
					for (let j = 0; j < recipe.ustensils.length; j++) {
						let recipeUstensilToLowerCase = recipe.ustensils[j].toLowerCase()
						if (recipeUstensilToLowerCase === tags[t]) {
							tagFound = true
							break
						}
					}
					if (!tagFound) {
						isMatch = false
						break
					}
				}
			}

			if (isMatch) {
				result[resultIndex++] = recipe
			}
		}
		return result
	}
}
