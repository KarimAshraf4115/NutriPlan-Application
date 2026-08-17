// Nutrition Endpoint
const NUTRITION_API = {
    USDA_API_KEY: 'KwaYaUP0tG2zfVs7AOKGjEnOSw7FsT4iAbHQdvXJ',
    BASE_URL: 'https://nutriplan-api.vercel.app/api/'
}

export async function getRecipesAreas() {
    const response = await fetch('https://nutriplan-api.vercel.app/api/meals/areas');
    if (!response.ok) {
        throw new Error("Error happened when load Recipes areas")
    }
    const areas = await response.json();
    return areas
}

export async function filterByCategory(category, limit = 20) {
    const response = await fetch(NUTRITION_API.BASE_URL + "meals/filter?category=" + `${category}` + `&limit=${limit}`)
    if (!response.ok) {
        throw new Error("Error happened when Filteration By Category")
    }
    const recipes = await response.json();
    return recipes
}

export async function filterByArea(area) {
    const response = await fetch(NUTRITION_API.BASE_URL + 'meals/filter?area=' + area)
    if (!response.ok) {
        throw new Error("Error happened when Filteration By Area")
    }
    const recipes = await response.json();
    return recipes
}

export async function getRandomRecipes(count = 25) {
    const response = await fetch(NUTRITION_API.BASE_URL + 'meals/random?count=' + count)
    if (!response.ok) {
        throw new Error("Error happened when Filteration By Area")
    }
    const recipes = await response.json();
    return recipes
}

export async function getSearchResults(query) {
    const response = await fetch(NUTRITION_API.BASE_URL + 'meals/search?q=' + query)
    if (!response.ok) {
        throw new Error("Error happend when Searching")
    }
    const recipes = await response.json();
    return recipes
}

export async function getMealDetails(id) {
    const response = await fetch(NUTRITION_API.BASE_URL + 'meals/' + id);
    if(!response.ok){
        throw new Error("Error happens when displaying recipe details");
    }
    const details = await response.json();
    console.log(details)
    return details;
}

export async function getNutritionAnalysis(recipeName , ingredients) {
    const response = await fetch(NUTRITION_API.BASE_URL + 'nutrition/analyze',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key' : `${NUTRITION_API.USDA_API_KEY}`
        },
        body:JSON.stringify({
            recipeName: recipeName,
            ingredients: ingredients
        })
    })
    if(!response.ok){
        throw new Error("Error happened when analyzing nutrition")
    }
    const nutrition = await response.json()
    return nutrition
} 