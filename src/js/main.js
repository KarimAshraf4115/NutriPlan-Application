// Controller
import { getCategories } from "./api/mealdb.js";
import { renderAreas, renderCategories, renderLoadingSpinner, renderEmptyState, renderRecipes, renderDetails } from "./ui/components.js";

import { getRecipesAreas, getRandomRecipes, filterByCategory, filterByArea, getSearchResults, getMealDetails, getNutritionAnalysis } from "./api/nutrition.js"
import { setSelectedCategory, getSelectedCategory, setSelectedArea, getSelectedArea } from "./state/appState.js";

const searchFilterSection = document.getElementById("search-filters-section")
const mealCategoriesSection = document.getElementById("meal-categories-section")
const recipesSection = document.getElementById("all-recipes-section")
const mealDetailsSection = document.getElementById("meal-details")
const productsSection = document.getElementById("products-section")
const foodLoggingSection = document.getElementById("foodlog-section")

const navLinks = document.querySelectorAll("nav li")

const categoriesGrid = document.getElementById("categories-grid")
const areasContainer = document.getElementById("areas-container")
const recipesGrid = document.getElementById("recipes-grid")
const recipesCount = document.getElementById("recipes-count");
const searchInput = document.getElementById("search-input")

loadRandomRecipes()

const sections = [
    mealDetailsSection,
    productsSection,
    foodLoggingSection,
    searchFilterSection,
    mealCategoriesSection,
    recipesSection
];

function showPage(...visibleSections) {
    sections.forEach(section => {
        section.classList.add("hidden");
    });
    
    visibleSections.forEach(section => {
        section.classList.remove("hidden");
    });
}
showHomePage()

function showHomePage() {
    showPage(
        searchFilterSection,
        mealCategoriesSection,
        recipesSection
    );
}

function showMealDetailsPage() {
    showPage(mealDetailsSection);
}

function showProductsPage() {
    showPage(productsSection);
}

function showFoodLogPage() {
    showPage(foodLoggingSection);
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => {
            item.classList.remove("bg-emerald-50", "text-emerald-700")
            item.classList.add("text-gray-600", "hover:bg-gray-50")
        })
        link.classList.add("bg-emerald-50" , "text-emerald-700")
    })
})

async function loadCategoriesCards() {
    try {
        const categories = await getCategories();
        categoriesGrid.innerHTML = renderCategories(categories)
        let categoriesCards = document.querySelectorAll("#categories-grid .category-card")
        categoriesCards.forEach(card => {
            card.addEventListener("click", (e) => {
                let category = card.getAttribute("data-category");
                setSelectedCategory(category)
                loadFilterByCategories(category)
            })
        })
    } catch (error) {
        categoriesGrid.innerHTML = "<p>Failed to load categories. Please try again later.</p>"
    }
}

loadCategoriesCards()

async function loadAreas() {
    try {
        const areas = await getRecipesAreas();
        areasContainer.innerHTML = renderAreas(areas);
        let areasButtons = document.querySelectorAll("#areas-container button");
        const ACTIVE_CLASSES = ["bg-emerald-600", "text-white"]
        const INACTIVE_CLASSES = ["bg-gray-100", "text-gray-700"]
        areasButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const area = btn.getAttribute('data-area');
                setSelectedArea(area);
                areasButtons.forEach((button) => {
                    if (button !== btn) {
                        button.classList.remove(...ACTIVE_CLASSES)
                        button.classList.add(...INACTIVE_CLASSES)
                    }
                })
                btn.classList.remove(...INACTIVE_CLASSES)
                btn.classList.add(...ACTIVE_CLASSES)
                loadFilterByAreas(area)
            })
        })
    } catch (error) {
        areasContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>"
    }
}

loadAreas()

async function loadFilteredRecipes(fetchFn, value, label) {
    try {
        recipesGrid.innerHTML = renderLoadingSpinner();
        const recipes = await fetchFn(value);
        if (recipes.results.length === 0) {
            recipesGrid.innerHTML = renderEmptyState();
        } else {
            recipesGrid.innerHTML = renderRecipes(recipes)
            recipesCount.textContent = "Showing " + recipes.results.length + ` ${label} recipes`
        }
    } catch (error) {
        recipesGrid.innerHTML = "<p>Failed to load recipes. Please try again later.</p>"
        recipesCount.textContent = "Showing 0 recipes"
    }
}

function loadFilterByCategories(category) {
    loadFilteredRecipes(filterByCategory, category, category)
}

function loadFilterByAreas(area) {
    loadFilteredRecipes(filterByArea, area, area)
}

async function loadRandomRecipes() {
    try {
        recipesGrid.innerHTML = renderLoadingSpinner();
        const recipes = await getRandomRecipes(25);
        recipesGrid.innerHTML = renderRecipes(recipes)
        recipesCount.textContent = "Showing " + recipes.results.length + " recipes"
    } catch (error) {
        recipesGrid.innerHTML = "<p>Failed to load recipes. Please try again later.</p>"
        recipesCount.textContent = "Showing 0 recipes"
    }
}

async function loadSearchResults(query) {
    try {
        recipesGrid.innerHTML = renderLoadingSpinner();
        const recipes = await getSearchResults(query);
        if (recipes.results.length === 0) {
            recipesGrid.innerHTML = renderEmptyState()
            return
        }
        recipesGrid.innerHTML = renderRecipes(recipes)
        recipesCount.textContent = "Showing " + recipes.results.length + ` recipes for "${query}"`
    } catch (error) {
        recipesGrid.innerHTML = "<p>Failed to load recipes. Please try again later.</p>"
        recipesCount.textContent = "Showing 0 recipes"
    }
}

let searchTimer;

searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    let query = e.target.value.trim()

    if (query.length === 0) {
        loadRandomRecipes()
        return
    }
    if (query.length < 2) return

    searchTimer = setTimeout(() => {
        loadSearchResults(query)
    }, 300);
})

async function showMealDetails(id) {
    try {
        let mealData = await getMealDetails(id);
        const meal = mealData.result // the render param
        const ingredientsList = formatIngredients(meal.ingredients)
        const nutrition = await getNutritionAnalysis(meal.name, ingredientsList);
        const nutritionData = nutrition.data // the render param
        mealDetailsSection.innerHTML = renderDetails(meal, nutritionData);
        showMealDetailsPage()

        const backButton = document.getElementById("back-to-meals-btn")
        backButton.addEventListener("click", () => {
            showHomePage()
        })
    } catch (error) {
        console.log(error);
        mealDetailsSection.innerHTML = "<p>Failed to load meal details.</p>";
    }
}

recipesGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;
    const mealID = card.getAttribute("data-meal-id");
    showMealDetails(mealID)
})

function formatIngredients(ingredientsList) {
    return ingredientsList.map(item => `${item.measure} ${item.ingredient}`.trim())
}



