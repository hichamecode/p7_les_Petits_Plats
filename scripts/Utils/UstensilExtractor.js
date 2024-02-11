
export default class UstensilExtractor {
	setRecipes(recipes) {
		this.recipes = recipes
	}

	extractDataDeDuplicated() {
		const result = []
		for (let i = 0; i < this.recipes.length; i++) {
			const ustensils = this.recipes[i].ustensils
    
			for (let j = 0; j < ustensils.length; j++) {
				let isInArray = false
				for (let k = 0; k < result.length; k++) {
					if (result[k] === ustensils[j].toLowerCase()) {
						isInArray = true
						break
					}
				}
				if (!isInArray) {
					result[result.length] = ustensils[j].toLowerCase()
				}
			}
		}
		return result
	}
    
}

