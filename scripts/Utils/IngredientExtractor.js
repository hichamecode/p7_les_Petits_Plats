import ExtractDataToObject from './ExtractDataToObject.js'

export default class IngredientExtractor
{
	setRecipes(recipes) {
		this.recipes = recipes
	}

	extractDataDeDuplicated(key) {
		const result = []
		let ingredients = []
		for (let i = 0; i < this.recipes.length; i++) {
			ingredients = [...ingredients, ...this.recipes[i].ingredients]
		}

		for (let j = 0; j < ingredients.length; j++) {
			const data = ExtractDataToObject.extractInArray(ingredients, key)
			for (let h = 0; h < data.length; h++) {
				let isInArray =  false

				for (let k = 0; k < result.length; k++) {
					if (result[k].toLowerCase() == data[h].toLowerCase()) {
						isInArray = true
					}
				}

				if (isInArray == false) { 
					result[result.length] = data[h]
				}
			}
		}
		return result
	}

	containsTag(tag) {
		for (let i = 0; i < this.ingredients.length; i++) {
			if (this.ingredients[i] === tag) {
				return true
			} else {
				return false
			}
		}
	}
}



