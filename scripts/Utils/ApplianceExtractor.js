export default class ApplianceExtractor {
	setRecipes(recipes) {
		this.recipes = recipes
	}

	extractDataDeDuplicated() {
		const appliances = new Set()
    
		this.recipes.forEach(recipe => {
            
			const appliance = recipe.appliance.toLowerCase()
			appliances.add(appliance)
		})
    
		return [...appliances]
	}
    
}
