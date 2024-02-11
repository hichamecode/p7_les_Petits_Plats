import { recipes } from '../../data/recipes.js'
import ExtractDataToObject from '../Utils/ExtractDataToObject.js'

export default class Recipes {

	findAll() {
		return recipes
	}

	search(tag) {
		const allRecipes = this.findAll()
		const pattern = new RegExp('.*' + tag + '.*', 'i')
    
		const result = allRecipes.filter(recipe => 
			this.tagInNameOrDescription(recipe, pattern) || this.tagInIngredients(recipe, pattern)
		)
		return result
	}

	tagInNameOrDescription(recipe, pattern) {
		return pattern.test(recipe.name) || pattern.test(recipe.description)
	}

	tagInIngredients(recipe, pattern) {
		const ingredientNames = ExtractDataToObject.extractInArray(recipe.ingredients, 'ingredient')
		ingredientNames.forEach(ingredientName => {
			if (pattern.test(ingredientName)) {
				return true
			}
		})
		return false
	}

	searchBy(recipes, tags, type) {

		return recipes.filter(recipe => {

			if (type === 'ingredient' && tags.length > 0) {
				return tags.every (tag => recipe.ingredients.some (ingredient => ingredient.ingredient === tag))
			} 
			else if (type === 'appliance' && tags.length > 0) {
				return tags.every (tag => recipe.appliance.toLowerCase() === tag)
			}
			else if (type === 'ustensil' && tags.length > 0) {
				return tags.every (tag => recipe.ustensils.some (ustensil => ustensil.toLowerCase() === tag))
			}
			return false 
		})
	}
}
