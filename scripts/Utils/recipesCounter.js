

export function counterOfRecipes(recipes) {
    const filterBar = document.querySelector('.filter_bar');
    let recipesCounter = document.querySelector('.recipes_counter');

    // création de recipesCounter uniquement s'il n'existe pas déja (pour affichage inital)
    if (!recipesCounter) {
        recipesCounter = document.createElement('div');
        recipesCounter.classList.add('recipes_counter');
        filterBar.appendChild(recipesCounter);
    }
    let recipesLength = recipes.length;
    if (recipesLength <= 1) {
        recipesCounter.textContent = `${recipesLength} recette`
    } else
    recipesCounter.textContent = `${recipesLength} recettes`
}
