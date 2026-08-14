// The MealDB Endpoint
const THE_MEAL_DB_API = {
    BASE_URL: 'https://www.themealdb.com/api/json/v1/1/',
}

export async function getCategories() {
        const response = await fetch(`${THE_MEAL_DB_API.BASE_URL}` + `categories.php`)
        if (!response.ok) {
            throw Error("Error happened when load Categories")
        }
        const categories = await response.json()
        return categories
}


