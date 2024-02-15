import ExtractDataToObject from './ExtractDataToObject.js'

export default class IngredientExtractor {
	setRecipes(recipes) {
		this.recipes = recipes
	}

	extractDataDeDuplicated(key) {
		const result = []
		let ingredients = []
		this.recipes.forEach(recipe => {
			ingredients = [...ingredients, ...recipe.ingredients]
		})

		ingredients.forEach(ingredient => {
			const data = ExtractDataToObject.extractInArray([ingredient], key)
			data.forEach(item => {
				if (!result.some(res => res.toLowerCase() === item.toLowerCase())) {
					result.push(item)
				}
			})
		})
		return result
	}

	containsTag(tag) {
		return this.ingredients.some(ingredient => ingredient.toLowerCase() === tag.toLowerCase())
	}
}
