
export function createRecipeCard(recipes) {

	const recipeCardsContainer = document.querySelector('.recipe_cards_container')

	recipes.forEach(recipe => {
		let { image, name, time, description, ingredients } = recipe

		let recipeCard = document.createElement('article')
		recipeCard.classList.add('recipe_card')
		recipeCardsContainer.appendChild(recipeCard)

		let recipeCardHeader = document.createElement('header')
		recipeCardHeader.classList.add('recipe_card_header')
		recipeCard.appendChild(recipeCardHeader)

		let recipeCardHeaderImg = document.createElement('img')
		recipeCardHeaderImg.classList.add('recipe_card_header_img')
		recipeCardHeaderImg.setAttribute('src', `./assets/images/${image}`)
		recipeCardHeaderImg.setAttribute('alt', `${name}`)
		recipeCardHeader.appendChild(recipeCardHeaderImg)

		let recipeCardHeaderLabel = document.createElement('p')
		recipeCardHeaderLabel.classList.add('recipe_card_header_label')
		recipeCardHeaderLabel.textContent = `${time}min`
		recipeCardHeader.appendChild(recipeCardHeaderLabel)

		let recipeCardBottom = document.createElement('section')
		recipeCardBottom.classList.add('recipe_card_bottom')
		recipeCard.append(recipeCardBottom)

		let recipeCardTitle = document.createElement('h2')
		recipeCardTitle.classList.add('recipe_card_title')
		recipeCardTitle.textContent = `${name}`
		recipeCardBottom.appendChild(recipeCardTitle)

		let recipeCardBottomUpperPart = document.createElement('article')
		recipeCardBottomUpperPart.classList.add('recipe_card_bottom_upper_part')
		recipeCardBottom.appendChild(recipeCardBottomUpperPart)

		let recipeCardHowTo = document.createElement('h3')
		recipeCardHowTo.classList.add('recipe_card_how_to')
		recipeCardHowTo.textContent = 'RECETTE'
		recipeCardBottomUpperPart.appendChild(recipeCardHowTo)

		let recipeCardText = document.createElement('p')
		recipeCardText.classList.add('recipe_card_text')
		recipeCardText.textContent = `${description}`
		recipeCardBottomUpperPart.appendChild(recipeCardText)

		let recipeCardBottomLowerPart = document.createElement('article')
		recipeCardBottomLowerPart.classList.add('recipe_card_bottom_lower_part')
		recipeCardBottom.appendChild(recipeCardBottomLowerPart)

		let recipeCardIngredients = document.createElement('h3')
		recipeCardIngredients.classList.add('recipe_card_ingredients')
		recipeCardIngredients.textContent = 'INGREDIENTS'
		recipeCardBottomLowerPart.appendChild(recipeCardIngredients)

		let ingredientsContainer = document.createElement('div')
		ingredientsContainer.classList.add('ingredients_container')
		recipeCardBottomLowerPart.appendChild(ingredientsContainer)

		for (const { ingredient, quantity, unit } of ingredients) {
			let ingredientContainer = document.createElement('div')
			ingredientContainer.classList.add('ingredient_container')
			ingredientsContainer.appendChild(ingredientContainer)

			let ingredientName = document.createElement('p')
			ingredientName.classList.add('ingredient_name')
			ingredientName.textContent = `${ingredient}`
			ingredientContainer.appendChild(ingredientName)

			let ingredientQuantity = document.createElement('p')
			ingredientQuantity.classList.add('ingredient_quantity')

			if (quantity != undefined) {
				ingredientQuantity.textContent = `${quantity}`
			} else {
				ingredientQuantity.textContent = ''
			}
			ingredientContainer.appendChild(ingredientQuantity)

			let ingredientUnit = document.createElement('span')
			ingredientUnit.classList.add('ingredient_unit')

			if (unit != undefined) {
				ingredientUnit.textContent = ` ${unit}`
			} else {
				ingredientUnit.textContent = ''
			}
			ingredientQuantity.appendChild(ingredientUnit)
		}
	}
	)}
