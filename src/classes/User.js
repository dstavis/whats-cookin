class User {
  constructor(userData = {}) {
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = userData.pantry || [];
    this.recipesToCook = [];
    this.selectedInput = [];
    this.filteredResults = [];
  }

  findIngredientByID(ingredientID){
    return this.pantry.find( (ingredient) => ingredient.id === ingredientID)
  }

  changeUserStock(ingredientID, originalAmount, newAmount) {
    let ingredient = this.findIngredientByID(ingredientID)
    this.updateStockInPantry(ingredient, newAmount - originalAmount)
  }

  updateStockInPantry(ingredient, change) {
    let postData = {
      "userID": this.id,
      "ingredientID": ingredient.id,
      "ingredientModification": change
    }
    fetch('http://localhost:3001/api/v1/users', {
      method: "POST",
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify(postData)
    })
    .then((response) => response.json())
    .then( (data) => {
      // {message: '"User # <userID> has 7 units of item # <ingredientID>"' }
      console.log(data)
    })
    .catch( (error) => { console.error("Error: ", error) } )
  }

  addRecipeToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    }
  }

  addInputToSearch(keyword) {
    let lowerCaseInput = keyword.toLowerCase();
    if (!this.selectedInput.includes(lowerCaseInput)) {
      this.selectedInput.push(lowerCaseInput);
    }
  }

  lowerCaseIngredients() {
    this.recipesToCook.forEach((recipe) => {
      recipe.portions = recipe.portions.reduce((newPortions, portion) => {
        newPortions.push({
          ingredientId: portion.ingredientId,
          name: portion.name.toLowerCase(),
          amount: portion.amount,
          cost: portion.cost,
          unit: portion.unit,
        });
        return newPortions;
      }, []);
    });
  }

  removeRecipeToCook(recipe) {
    let indexOfRecipeToRemove = this.recipesToCook.indexOf(recipe);
    if (indexOfRecipeToRemove < 0) {
      return `There are no recipes to remove!`;
    }
    this.recipesToCook.splice(indexOfRecipeToRemove, 1);
    return this.recipesToCook;
  }

  filterByMultipleTags() {
    this.filteredResults = this.recipesToCook.filter((recipe) => {
      let containsOr = false;
      if (
        this.selectedInput.some((keyword) => {
          return recipe.tags.includes(keyword);
        })
      ) {
        containsOr = true;
      }
      return containsOr;
    });
    return this.filteredResults;
  }

  filterByMultipleRecipeNames() {
    this.filteredResults = this.recipesToCook.filter((recipe) => {
      let lowerCaseRecipeName = recipe.name.toLowerCase();
      let containsOr = false;
      if (
        this.selectedInput.some((keyword) => {
          return lowerCaseRecipeName.includes(keyword);
        })
      ) {
        containsOr = true;
      }
      return containsOr;
    });
    return this.filteredResults;
  }

  filterByMultipleIngredients() {
    this.filteredResults = this.recipesToCook.filter((recipe) => {
      let containsOr = false;
      recipe.portions.forEach((portion) => {
        if (
          this.selectedInput.some((keyword) => {
            return portion.name.includes(keyword);
          })
        ) {
          containsOr = true;
        }
      });
      return containsOr;
    });
    return this.filteredResults;
  }

  clearData() {
    this.selectedInput = [];
    this.filteredResults = [];
  }
}

export default User;
