// Keep What we need of data

// Category
let selectedCategory = null;

export function setSelectedCategory(category) {
    selectedCategory = category;
}

export function getSelectedCategory(){
    return selectedCategory;
}

// Area
let selectedArea = null
export function setSelectedArea(area){
    selectedArea = area;
}

export function getSelectedArea(){
    return selectedArea;
}

// Current Recipes

let currentRecipes = [];
export function setCurrentRecipes(recipes) {
    currentRecipes = recipes;
}

export function getCurrentRecipes() {
    return currentRecipes;
}

export function getRecipeById(id) {
    return currentRecipes.find(recipe => recipe.id === id)
}
