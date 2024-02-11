export default class ApplianceExtractor {
	setRecipes(recipes) {
		this.recipes = recipes
	}

	extractDataDeDuplicated() {
		const result = []
		for (let i = 0; i < this.recipes.length; i++) {
			const appliance = this.recipes[i].appliance.toLowerCase()

			let isInArray = false
			for (let j = 0; j < result.length; j++) {
				if (result[j] === appliance) {
					isInArray = true
					break
				}
			}
			if (!isInArray) {
				result[result.length] = appliance
			}
		}
		return result
	}
}
