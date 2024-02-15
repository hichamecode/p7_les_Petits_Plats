export default class UstensilExtractor {
	setRecipes(recipes) {
		this.recipes = recipes
	}

	extractDataDeDuplicated() {
		// flatMap pour récupérer tous les ustensils + map pour tout passer en lowercase
		const allUstensils = this.recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
		const filteredUstensils = Array.from(new Set(allUstensils))

		return filteredUstensils
	}
}