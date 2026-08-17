// Controller
import { getCategories } from "./api/mealdb.js";
import { renderAreas, renderCategories, renderLoadingSpinner, renderEmptyState, renderRecipes, renderRecipesList, renderDetails, renderNutritionFacts, calcBarWidth, renderLoggedItemsSection, renderWeeklyOverview, renderLoggedItem, renderProductCard, renderProductsGrid, renderProductsInitialState, renderProductsNotFoundState, renderProductCategories, renderToast, renderProductLogModal, renderProductLogToast } from "./ui/components.js";

import { getRecipesAreas, getRandomRecipes, filterByCategory, filterByArea, getSearchResults, getMealDetails, getNutritionAnalysis } from "./api/nutrition.js"
import { setSelectedCategory, getSelectedCategory, setSelectedArea, getSelectedArea, setCurrentRecipes, getRecipeById, getCurrentRecipes } from "./state/appState.js";
import { calculateTotals, clearTodayLog, getTodayKey, getTodayMeals, removeMealFromLog, logMeal, getFoodLog, saveFoodLog, getWeeklyData, getDateKeyOffset, calculateWeeklyStats } from "./state/foodLogState.js";
import { searchProducts, getProductsByCategory, getProductByBarcode, getProductCategories } from './api/products.js'

const searchFilterSection = document.getElementById("search-filters-section")
const mealCategoriesSection = document.getElementById("meal-categories-section")
const recipesSection = document.getElementById("all-recipes-section")
const mealDetailsSection = document.getElementById("meal-details")
const productsSection = document.getElementById("products-section")
const foodLoggingSection = document.getElementById("foodlog-section")

const navLinks = document.querySelectorAll("nav a")

const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

const categoriesGrid = document.getElementById("categories-grid")
const areasContainer = document.getElementById("areas-container")
const recipesGrid = document.getElementById("recipes-grid")
const recipesCount = document.getElementById("recipes-count");
const searchInput = document.getElementById("search-input")

const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const headerMenuBtn = document.getElementById("header-menu-btn");
const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

const headerTitle = document.getElementById("header-title");
const headerSubtitle = document.getElementById("header-subtitle");
let currentView = "grid";

function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
}

function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
}

headerMenuBtn.addEventListener("click", openSidebar);
sidebarCloseBtn.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

document.addEventListener("click", (e) => {
    if (!sidebar.classList.contains("open")) return;
    if (sidebar.contains(e.target) || e.target === headerMenuBtn || headerMenuBtn.contains(e.target)) return;
    closeSidebar();
});

function setHeaderText(title, subtitle) {
    headerTitle.textContent = title;
    headerSubtitle.textContent = subtitle;
}

function navigate(path) {
    window.location.hash = path;
}
function router() {
    const path = window.location.hash.slice(1) || "/home";

    if (path === "/home") {
        showHomePage();
        updateActiveNavLink(path);
        return;
    }

    if (path === "/products") {
        showProductsPage();
        updateActiveNavLink(path);
        return;
    }

    if (path === "/food-log") {
        showFoodLogPage();
        updateActiveNavLink(path);
        refreshFoodLogUI()
        return;
    }

    if (path.startsWith("/meal/")) {
        const mealID = path.split("/")[2];

        if (mealID) {
            showMealDetails(mealID);
            updateActiveNavLink("/home")
        }

        return;
    }

    navigate("/home");
}
window.addEventListener("hashchange", router);
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

function showHomePage() {
    showPage(
        searchFilterSection,
        mealCategoriesSection,
        recipesSection
    );
    setHeaderText("Meals & Recipes", "Discover delicious and nutritious recipes tailored for you");
}

function showMealDetailsPage() {
    showPage(mealDetailsSection);
}

function showProductsPage() {
    showPage(productsSection);
    setHeaderText("Product Scanner", "Search packaged foods by name or barcode");
}

function showFoodLogPage() {
    showPage(foodLoggingSection);
    setHeaderText("Food Log", "Track your daily nutrition and food intake");
}

function updateActiveNavLink(path) {
    navLinks.forEach(link => {
        if (link.getAttribute("data-route") === path) {
            link.classList.add("bg-emerald-50", "text-emerald-700")
            link.classList.remove("text-gray-600", "hover:bg-gray-50")
        } else {
            link.classList.remove("bg-emerald-50", "text-emerald-700")
            link.classList.add("text-gray-600", "hover:bg-gray-50")
        }
    })
}

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
        const route = link.getAttribute("data-route");
        navigate(route)
        closeSidebar();
    })
})

// ----------------------------------------------------

const VISIBLE_CATEGORY_LIMIT = 12;

function limitVisibleCategories() {
    const cards = document.querySelectorAll("#categories-grid .category-card");
    cards.forEach((card, index) => {
        if (index >= VISIBLE_CATEGORY_LIMIT) {
            card.classList.add("hidden");
        }
    });
}

function showAllCategories() {
    const cards = document.querySelectorAll("#categories-grid .category-card");
    cards.forEach(card => card.classList.remove("hidden"));
}

async function loadCategoriesCards() {
    try {
        const categories = await getCategories();
        categoriesGrid.innerHTML = renderCategories(categories)
        let categoriesCards = document.querySelectorAll("#categories-grid .category-card")
        limitVisibleCategories()
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

// loadCategoriesCards()

let categoriesExpanded = false;
function toggleCategoriesView() {
    const viewAllBtn = document.getElementById("view-all-categories-btn");

    if (categoriesExpanded) {
        limitVisibleCategories();
        viewAllBtn.innerHTML = `View All <i class="fa-solid fa-chevron-right text-xs"></i>`;
    } else {
        showAllCategories();
        viewAllBtn.innerHTML = `Show Less <i class="fa-solid fa-chevron-up text-xs"></i>`;
    }

    categoriesExpanded = !categoriesExpanded;
}

document.getElementById("view-all-categories-btn").addEventListener("click", toggleCategoriesView);

//-------------------------------------------------------

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

// loadAreas()

async function loadFilteredRecipes(fetchFn, value, label) {
    try {
        recipesGrid.innerHTML = renderLoadingSpinner();
        const recipes = await fetchFn(value);
        if (recipes.results.length === 0) {
            recipesGrid.innerHTML = renderEmptyState();
        } else {
            recipesGrid.innerHTML = renderCurrentView(recipes)
            recipesCount.textContent = "Showing " + recipes.results.length + ` ${label} recipes`
            setCurrentRecipes(recipes.results)
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
        recipesGrid.innerHTML = renderCurrentView(recipes)
        recipesCount.textContent = "Showing " + recipes.results.length + " recipes"
        setCurrentRecipes(recipes.results)
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
        recipesGrid.innerHTML = renderCurrentView(recipes)
        recipesCount.textContent = "Showing " + recipes.results.length + ` recipes for "${query}"`
        setCurrentRecipes(recipes.results)
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
        let meal = getRecipeById(id);
        if (!meal) {
            const mealData = await getMealDetails(id);
            meal = mealData.result || mealData.meals?.[0];
        }
        if (!meal) throw new Error("Meal data not found");
        mealDetailsSection.innerHTML = renderDetails(meal);
        showMealDetailsPage();
        const backButton = document.getElementById("back-to-meals-btn");
        if (backButton) backButton.addEventListener("click", () => history.back());
        const ingredientsList = formatIngredients(meal.ingredients || []);
        const nutrition = await getNutritionAnalysis(meal.name || meal.strMeal, ingredientsList);
        const nutritionData = nutrition.data || nutrition;
        const logMealBtn = document.getElementById("log-meal-btn");
        if (logMealBtn) {
            logMealBtn.disabled = false;
            logMealBtn.removeAttribute("title");
            logMealBtn.classList.remove("bg-gray-300", "text-gray-500", "cursor-not-allowed");
            logMealBtn.classList.add("bg-blue-600", "text-white", "hover:bg-blue-700");
            logMealBtn.innerHTML = `<i class="fa-solid fa-clipboard-list"></i><span>Log This Meal</span>`;

            logMealBtn.addEventListener("click", () => {
                openLogMealModal(meal, nutritionData);
            });
        }
        const nutritionContainer = document.getElementById("nutrition-facts-container");
        if (nutritionContainer) nutritionContainer.innerHTML = renderNutritionFacts(nutritionData);
        const heroServings = document.getElementById("hero-servings");
        if (heroServings) heroServings.textContent = (nutritionData?.servings || 1) + " servings";

        const heroCalories = document.getElementById("hero-calories");
        if (heroCalories) heroCalories.textContent = (nutritionData?.perServing?.calories || 0) + " cal/serving";

    } catch (error) {
        console.error("Error loading meal details:", error);
        mealDetailsSection.innerHTML = "<p>Failed to load meal details. Please try again.</p>";
        showMealDetailsPage();
    }
}

recipesGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;
    const mealID = card.getAttribute("data-meal-id");
    navigate(`/meal/${mealID}`);
})

function formatIngredients(ingredientsList) {
    return ingredientsList.map(item => `${item.measure} ${item.ingredient}`.trim())
}

// -----------------------------------------------------

function setGridView() {
    currentView = "grid";
    recipesGrid.classList.remove("grid-cols-2", "gap-4");
    recipesGrid.classList.add("grid-cols-4", "gap-5");
    recipesGrid.innerHTML = renderRecipes({ results: getCurrentRecipes() });
    gridViewBtn.classList.add("bg-white", "shadow-sm");
    gridViewBtn.querySelector("i").classList.remove("text-gray-500");
    gridViewBtn.querySelector("i").classList.add("text-gray-700");

    listViewBtn.classList.remove("bg-white", "shadow-sm");
    listViewBtn.querySelector("i").classList.remove("text-gray-700");
    listViewBtn.querySelector("i").classList.add("text-gray-500");
}

function setListView() {
    currentView = "list";
    recipesGrid.classList.remove("grid-cols-4", "gap-5");
    recipesGrid.classList.add("grid-cols-2", "gap-4");
    recipesGrid.innerHTML = renderRecipesList({ results: getCurrentRecipes() });
    listViewBtn.classList.add("bg-white", "shadow-sm");
    listViewBtn.querySelector("i").classList.remove("text-gray-500");
    listViewBtn.querySelector("i").classList.add("text-gray-700");

    gridViewBtn.classList.remove("bg-white", "shadow-sm");
    gridViewBtn.querySelector("i").classList.remove("text-gray-700");
    gridViewBtn.querySelector("i").classList.add("text-gray-500");
}

gridViewBtn.addEventListener("click", setGridView);
listViewBtn.addEventListener("click", setListView);


function renderCurrentView(recipes) {
    return currentView === "list" ? renderRecipesList(recipes) : renderRecipes(recipes);
}

function showLoadingOverlay() {
    const overlay = document.getElementById("app-loading-overlay");
    overlay.style.display = "flex";
    overlay.style.opacity = "1";
}

function hideLoadingOverlay() {
    const overlay = document.getElementById("app-loading-overlay");
    overlay.style.opacity = "0";
    overlay.addEventListener("transitionend", () => {
        overlay.style.display = "none";
    });
}

async function initApp() {
    showLoadingOverlay()
    await Promise.all([
        loadCategoriesCards(),
        loadAreas(),
        loadRandomRecipes(),
        loadProductsCategories()
    ]);
    hideLoadingOverlay()
}

// ---------------------------------------------------------------------------
function getToday() {
    const today = new Date();
    const formattedDate = today.toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
    });
    return formattedDate
}
const dateHeader = document.getElementById("date-header")
dateHeader.textContent = getToday()

function updateProgressBarInLogs(prefix, current, goal, unit, colorClass, textColorClass) {
    if (!goal || goal <= 0) return;
    const percent = calcBarWidth(current, goal);
    const bar = document.getElementById(`${prefix}-bar`);
    const percentText = document.getElementById(`${prefix}-percent`);
    const valueText = document.getElementById(`${prefix}-value`);
    const isOverGoal = current >= goal;

    percentText.textContent = `${Math.round(percent)}%`;
    bar.style.width = `${Math.min(100, percent)}%`;
    valueText.textContent = `${current} ${unit}`;

    const activeColor = isOverGoal ? "bg-red-500" : colorClass;
    const activeTextColor = isOverGoal ? "text-red-600" : textColorClass;

    bar.classList.remove(colorClass, "bg-red-500");
    bar.classList.add(activeColor);

    percentText.classList.remove(textColorClass, "text-red-600");
    percentText.classList.add(activeTextColor);

    valueText.classList.remove(textColorClass, "text-red-600");
    valueText.classList.add(activeTextColor);
}


const loggedItemsSection = document.getElementById("logged-items-section")
loggedItemsSection.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".remove-foodlog-item");
    if (deleteBtn) {
        const index = Number(deleteBtn.getAttribute("data-index"));
        removeMealFromLog(index);
        refreshFoodLogUI();
        return;
    }

    const clearBtn = e.target.closest("#clear-foodlog");
    if (clearBtn) {
        Swal.fire({
            title: "Clear Today's Log?",
            text: "This will remove all logged food items for today.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, clear it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                clearTodayLog();
                refreshFoodLogUI();
                Swal.fire({
                    title: "Cleared!",
                    text: "Your food log has been cleared.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });

    }

    const navBtn = e.target.closest("[data-route]");
    if (navBtn) {
        e.preventDefault();
        navigate(navBtn.getAttribute("data-route"));
    }
})

loggedItemsSection.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.onerror = null;
        e.target.parentElement.innerHTML = `<div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
            <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i>
        </div>`;
    }
}, true);

const logMealModal = document.getElementById("log-meal-modal");
let modalMeal = null;
let modalNutrition = null;

function openLogMealModal(meal, nutritionData) {
    modalMeal = meal;
    modalNutrition = nutritionData;

    document.getElementById("modal-meal-thumbnail").src = meal.thumbnail;
    document.getElementById("modal-meal-thumbnail").alt = meal.name;
    document.getElementById("modal-meal-name").textContent = meal.name;
    document.getElementById("meal-servings").value = 1;

    updateModalNutritionDisplay(1);

    logMealModal.classList.remove("hidden");
}

function updateModalNutritionDisplay(servings) {
    document.getElementById("modal-calories").textContent = Math.round(modalNutrition.perServing.calories * servings);
    document.getElementById("modal-protein").textContent = Math.round(modalNutrition.perServing.protein * servings) + "g";
    document.getElementById("modal-carbs").textContent = Math.round(modalNutrition.perServing.carbs * servings) + "g";
    document.getElementById("modal-fat").textContent = Math.round(modalNutrition.perServing.fat * servings) + "g";
}

function refreshFoodLogUI() { // MAIN FUNCTION IN THIS PART 
    const meals = getTodayMeals();
    const totals = calculateTotals(meals);

    updateProgressBarInLogs("calories", totals.calories, 2000, "kcal", "bg-emerald-500", "text-emerald-600");
    updateProgressBarInLogs("protein", totals.protein, 50, "g", "bg-blue-500", "text-blue-600");
    updateProgressBarInLogs("carbs", totals.carbs, 250, "g", "bg-amber-500", "text-amber-600");
    updateProgressBarInLogs("fat", totals.fat, 65, "g", "bg-purple-500", "text-purple-600");

    document.getElementById("logged-items-section").innerHTML = renderLoggedItemsSection(meals);

    const weeklyDays = getWeeklyData();
    document.getElementById("weekly-overview-grid").innerHTML = renderWeeklyOverview(weeklyDays);

    const stats = calculateWeeklyStats(weeklyDays);
    document.getElementById("weekly-average").textContent = stats.weeklyAverage + " kcal";
    document.getElementById("total-items-week").textContent = stats.totalItems + " items";
    document.getElementById("days-on-goal").textContent = stats.daysOnGoal + " / 7";
}

const servingsInput = document.getElementById("meal-servings");
const decreaseBtn = document.getElementById("decrease-servings");
const increaseBtn = document.getElementById("increase-servings");
const cancelLogBtn = document.getElementById("cancel-log-meal");
const confirmLogBtn = document.getElementById("confirm-log-meal");

function closeLogMealModal() {
    logMealModal.classList.add("hidden");
    modalMeal = null;
    modalNutrition = null;
}

decreaseBtn.addEventListener("click", () => {
    let servings = parseFloat(servingsInput.value);
    servings = Math.max(0.5, servings - 0.5);
    servingsInput.value = servings;
    updateModalNutritionDisplay(servings);
});

increaseBtn.addEventListener("click", () => {
    let servings = parseFloat(servingsInput.value);
    servings = Math.min(10, servings + 0.5);
    servingsInput.value = servings;
    updateModalNutritionDisplay(servings);
});

servingsInput.addEventListener("input", () => {
    let servings = parseFloat(servingsInput.value);
    if (isNaN(servings) || servings < 0.5) servings = 0.5;
    if (servings > 10) servings = 10;
    updateModalNutritionDisplay(servings);
});

cancelLogBtn.addEventListener("click", () => {
    closeLogMealModal();
});

logMealModal.addEventListener("click", (e) => {
    if (e.target === logMealModal) {
        closeLogMealModal();
    }
});

confirmLogBtn.addEventListener("click", () => {
    const servings = parseFloat(servingsInput.value);

    const mealEntry = {
        mealId: modalMeal.id,
        name: modalMeal.name,
        category: modalMeal.category,
        thumbnail: modalMeal.thumbnail,
        servings: servings,
        nutrition: {
            calories: Math.round(modalNutrition.perServing.calories * servings),
            protein: Math.round(modalNutrition.perServing.protein * servings),
            carbs: Math.round(modalNutrition.perServing.carbs * servings),
            fat: Math.round(modalNutrition.perServing.fat * servings)
        },
        loggedAt: new Date().toISOString(),
        type: "meal"
    };

    logMeal(mealEntry);
    closeLogMealModal();

    if (!foodLoggingSection.classList.contains("hidden")) {
        refreshFoodLogUI();
    }


    Swal.fire({
        icon: "success",
        title: "Meal logged!",
        html: `<p class="text-gray-600">${mealEntry.name} (${mealEntry.servings} servings) has been added to your food log.</p>
        ${mealEntry.nutrition.calories > 0 ? `<p class="text-emerald-600 font-semibold mt-2">+${mealEntry.nutrition.calories} calories</p>` : ""}`,
        timer: 1800,
        showConfirmButton: false
    });
});

// =========================================================================================

const productSearchInput = document.getElementById("product-search-input");
const searchProductBtn = document.getElementById("search-product-btn");
const barcodeInput = document.getElementById("barcode-input");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const productsGrid = document.getElementById("products-grid");
const productsCount = document.getElementById("products-count");
const productCategoryButtons = document.querySelectorAll(".product-category-btn");
const nutriScoreButtons = document.querySelectorAll(".nutri-score-filter");
const ProductsCategories = document.getElementById("products-categories")
const PRODUCTS_GRID_CLASSES = ["grid", "grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5", "gap-5"];
const productDetailModal = document.getElementById("product-detail-modal")
const addProductToLog = document.getElementById("add-product-to-log")
const closeProductLog = document.getElementById("close-product-modal")
let currentProducts = [];
let currentLoggedProduct = null;

function setProductsGridLayout(hasProducts) {
    if (hasProducts) {
        productsGrid.classList.add(...PRODUCTS_GRID_CLASSES);
    } else {
        productsGrid.classList.remove(...PRODUCTS_GRID_CLASSES);
    }
}

setProductsGridLayout(false);
productsGrid.innerHTML = renderProductsInitialState();

async function loadProductsCategories() {
    try {
        const categories = await getProductCategories()
        ProductsCategories.innerHTML = renderProductCategories(categories)
        ProductsCategories.querySelectorAll(".product-category-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const category = btn.getAttribute("data-category");
                loadProducts(getProductsByCategory, category);
            });
        });
    } catch (error) {
        ProductsCategories.innerHTML = `<p>Failed to load product. Please try again.</p>`
    }
}

async function loadProducts(fetchFn, ...args) {
    try {
        setProductsGridLayout(false);
        productsGrid.innerHTML = renderLoadingSpinner();
        const products = await fetchFn(...args);
        currentProducts = products;
        setProductsGridLayout(products.length > 0);
        productsGrid.innerHTML = renderProductsGrid(products);
        if (products.length === 0) {
            productsCount.textContent = `No products found for "${args}"`
        } else {
            productsCount.textContent = `Found ${products.length} products for "${args}"`
        }
    } catch (error) {
        setProductsGridLayout(false);
        productsGrid.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        productsCount.textContent = "0 products found";
    }
}

async function loadProductByBarcode(barcode) {
    try {
        setProductsGridLayout(false);
        productsGrid.innerHTML = renderLoadingSpinner();
        const data = await getProductByBarcode(barcode);
        const products = data.result ? [data.result] : [];
        currentProducts = products;
        setProductsGridLayout(products.length > 0);
        productsGrid.innerHTML = renderProductsGrid(products);
        productsCount.textContent = products.length + " products found";
        if (products.length === 0) {
            showToast("Product not found in database");
        }
    } catch (error) {
        setProductsGridLayout(false);
        productsGrid.innerHTML = renderProductsInitialState();
        productsCount.textContent = `No product found with barcode: ${barcode}`;
        showToast("Product not found in database");
    }
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.innerHTML = renderToast(message);
    const toastEl = toast.firstElementChild;
    document.body.appendChild(toastEl);

    setTimeout(() => {
        toastEl.remove();
    }, 3000);
}

lookupBarcodeBtn.addEventListener("click", () => {
    const barcode = barcodeInput.value.trim();
    if (barcode.length === 0) {
        setProductsGridLayout(false);
        productsGrid.innerHTML = renderProductsInitialState();
        productsCount.textContent = "Search for products to see results";
        return;
    }
    loadProductByBarcode(barcode);
});

searchProductBtn.addEventListener("click", () => {
    const query = productSearchInput.value.trim();
    if (query.length === 0) {
        setProductsGridLayout(false);
        productsGrid.innerHTML = renderProductsInitialState();
        productsCount.textContent = "Search for products to see results";
        return;
    }
    loadProducts(searchProducts, query);
});


productCategoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        loadProducts(getProductsByCategory, category);
    });
});

const ACTIVE_RING_CLASSES = ["ring-2", "ring-gray-900"];

nutriScoreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const grade = btn.getAttribute("data-grade");

        nutriScoreButtons.forEach((button) => {
            button.classList.remove(...ACTIVE_RING_CLASSES);
        });
        btn.classList.add(...ACTIVE_RING_CLASSES);

        const filteredProducts = grade
            ? currentProducts.filter(
                product => product.nutritionGrade?.toLowerCase() === grade
            )
            : currentProducts;

        setProductsGridLayout(filteredProducts.length > 0);
        productsGrid.innerHTML = renderProductsGrid(filteredProducts);
        productsCount.textContent = filteredProducts.length + " products found";
    });
});

productsGrid.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.onerror = null;
        e.target.parentElement.innerHTML = `<div class="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
            <i class="fa-solid fa-box text-gray-400 text-2xl"></i>
        </div>`;
    }
}, true);

productsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const barcode = card.getAttribute("data-barcode");
    const product = currentProducts.find(p => String(p.barcode) === String(barcode));
    if (product) {
        openLogProductModal(product);
    }
});

function openLogProductModal(product) {
    currentLoggedProduct = product;
    productDetailModal.innerHTML = renderProductLogModal(product);
    productDetailModal.classList.remove("hidden");
}

function closeLogProductModal() {
    productDetailModal.classList.add("hidden");
    currentLoggedProduct = null;
}

productDetailModal.addEventListener("click", (e) => {
    if (e.target === productDetailModal || e.target.closest(".close-product-modal")) {
        closeLogProductModal();
    }
});


function showProductLogToast(name) {
    const toast = document.createElement("div");
    toast.innerHTML = renderProductLogToast(name);
    const toastEl = toast.firstElementChild;
    document.body.appendChild(toastEl);

    setTimeout(() => {
        toastEl.remove();
    }, 3000);
}

productDetailModal.addEventListener("click", (e) => {
    const logBtn = e.target.closest(".add-product-to-log");
    if (!logBtn || !currentLoggedProduct) return;

    const product = currentLoggedProduct;
    const nutrients = product.nutrients || {};

    const productEntry = {
        mealId: product.barcode,
        name: product.name,
        category: product.brand || "Product",
        thumbnail: product.image || "",
        servings: 1,
        nutrition: {
            calories: Math.round(nutrients.calories || 0),
            protein: Math.round(nutrients.protein || 0),
            carbs: Math.round(nutrients.carbs || 0),
            fat: Math.round(nutrients.fat || 0)
        },
        loggedAt: new Date().toISOString(),
        type: "product"
    };

    logMeal(productEntry);          // reuse logMeal()
    closeLogProductModal();

    if (!foodLoggingSection.classList.contains("hidden")) {
        refreshFoodLogUI();          // reuse refresh
    }

    showProductLogToast(productEntry.name);
});


initApp();
router()

