// Renderer

export function renderLoadingSpinner() {
  return `<div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>`
}

export function renderEmptyState() {
  return `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`
}

const categoriesStyles = [
  {
    category: "Beef",
    bgColor: "from-red-50 to-rose-50",
    borderColor: "border-red-200 hover:border-red-400",
    iconBgColor: "from-red-400 to-rose-500",
    iconName: "fa-drumstick-bite",
  },
  {
    category: "Chicken",
    bgColor: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200 hover:border-amber-400",
    iconBgColor: "from-amber-400 to-orange-500",
    iconName: "fa-drumstick-bite",
  },
  {
    category: "Dessert",
    bgColor: "from-pink-50 to-rose-50",
    borderColor: "border-pink-200 hover:border-pink-400",
    iconBgColor: "from-pink-400 to-rose-500",
    iconName: "fa-cake-candles",
  },
  {
    category: "Lamb",
    bgColor: "from-orange-50 to-amber-50",
    borderColor: "border-orange-200 hover:border-orange-400",
    iconBgColor: "from-orange-400 to-amber-500",
    iconName: "fa-drumstick-bite",
  },
  {
    category: "Miscellaneous",
    bgColor: "from-slate-50 to-gray-50",
    borderColor: "border-slate-200 hover:border-slate-400",
    iconBgColor: "from-slate-400 to-gray-500",
    iconName: "fa-bowl-rice",
  },
  {
    category: "Pasta",
    bgColor: "from-yellow-50 to-amber-50",
    borderColor: "border-yellow-200 hover:border-yellow-400",
    iconBgColor: "from-yellow-400 to-amber-500",
    iconName: "fa-bowl-food",
  },
  {
    category: "Pork",
    bgColor: "from-rose-50 to-red-50",
    borderColor: "border-rose-200 hover:border-rose-400",
    iconBgColor: "from-rose-400 to-red-500",
    iconName: "fa-bacon",
  },
  {
    category: "Seafood",
    bgColor: "from-cyan-50 to-blue-50",
    borderColor: "border-cyan-200 hover:border-cyan-400",
    iconBgColor: "from-cyan-400 to-blue-500",
    iconName: "fa-fish",
  },
  {
    category: "Side",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-200 hover:border-green-400",
    iconBgColor: "from-green-400 to-emerald-500",
    iconName: "fa-plate-wheat",
  },
  {
    category: "Starter",
    bgColor: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-200 hover:border-teal-400",
    iconBgColor: "from-teal-400 to-cyan-500",
    iconName: "fa-utensils",
  },
  {
    category: "Vegan",
    bgColor: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    iconBgColor: "from-emerald-400 to-green-500",
    iconName: "fa-leaf",
  },
  {
    category: "Vegetarian",
    bgColor: "from-lime-50 to-green-50",
    borderColor: "border-lime-200 hover:border-lime-400",
    iconBgColor: "from-lime-400 to-green-500",
    iconName: "fa-seedling",
  },
  {
    category: "Breakfast",
    bgColor: "from-lime-50 to-green-50",
    borderColor: "border-lime-200 hover:border-lime-400",
    iconBgColor: "from-lime-400 to-green-500",
    iconName: "fa-seedling",
  },
  {
    category: "Goat",
    bgColor: "from-red-50 to-rose-50",
    borderColor: "border-red-200 hover:border-red-400",
    iconBgColor: "from-red-400 to-rose-500",
    iconName: "fa-drumstick-bite",
  }
];

export function renderCategories(data) {
  let categoriesList = data.categories
  let box = ''
  categoriesList.forEach(category => {
    let categoryName = category.strCategory;
    let categoryStyle = categoriesStyles.find(
      item => item.category === categoryName
    );
    if (!categoryStyle) {
      categoryStyle = {
        bgColor: "from-gray-50 to-gray-100",
        borderColor: "border-gray-200 hover:border-gray-400",
        iconBgColor: "from-gray-400 to-gray-500",
        iconName: "fa-utensils",
      };
    }
    box +=
      `<div class="category-card bg-gradient-to-br ${categoryStyle.bgColor} rounded-xl p-3 border ${categoryStyle.borderColor} hover:shadow-md cursor-pointer transition-all group" data-category="${categoryName}">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 bg-gradient-to-br ${categoryStyle.iconBgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <i class="fa-solid ${categoryStyle.iconName} text-sm text-white"></i>                
                </div>
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${categoryName}</h3>
                </div>
            </div>
        </div>`
  })
  return box
}

export function renderAreas(data) {
  const areasList = data.results

  let box = `<button class="px-4 py-2 rounded-full font-medium bg-emerald-600 text-white text-sm whitespace-nowrap hover:bg-emerald-700 transition-all" data-area = "all">All Cuisines</button>`
  for (let i = 0; i < 10; i++) {
    box +=
      ` <button
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all" data-area = "${areasList[i].name}">
            ${areasList[i].name}
          </button>`
  }
  return box
}

export function renderRecipes(data) {
  const filteredList = data.results;
  let box = ''
  filteredList.forEach((meal) => {
    box +=
      `<div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="${meal.id}">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="${meal.thumbnail}" alt="${meal.name}"
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  ${meal.category}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                  ${meal.area || "International"}
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                ${meal.name}
              </h3>
              <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${meal.instructions}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                  <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                  ${meal.category}
                </span>
                <span class="font-semibold text-gray-500">
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                  ${meal.area || "International"}
                </span>
              </div>
            </div>
          </div>`
  })

  return box
}

export function renderRecipesList(data) {
  const filteredList = data.results;
  let box = ''
  filteredList.forEach((meal) => {
    box +=
      `<div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex" data-meal-id="${meal.id}">
                <img class="w-48 h-auto object-cover flex-shrink-0" src="${meal.thumbnail}" alt="${meal.name}" loading="lazy" />
                <div class="p-4 flex flex-col justify-center">
                    <h3 class="text-base font-bold text-gray-900 mb-1">${meal.name}</h3>
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">${meal.instructions}</p>
                    <div class="flex items-center gap-4 text-xs">
                        <span class="font-semibold text-gray-900">
                            <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>${meal.category}
                        </span>
                        <span class="font-semibold text-gray-500">
                            <i class="fa-solid fa-globe text-blue-500 mr-1"></i>${meal.area || "International"}
                        </span>
                    </div>
                </div>
            </div>`
  })
  return box
}

export function renderDetails(meal) {
  const tags = meal.tags
  let tagsBox = '';
  tags.forEach((tag) => {
    if (tag) {
      tagsBox += `<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${tag}</span>`
    }
  })

  const ingredients = meal.ingredients;
  let ingredientsBox = '';
  ingredients.forEach(ingredient => {
    ingredientsBox +=
      `   <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">${ingredient.measure}</span> ${ingredient.ingredient}
                  </span>
                </div>`
  })

  const instructions = meal.instructions;
  let instructionsBox = '';
  let index = 1;
  instructions.forEach(instruction => {
    instructionsBox +=
      `  <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${index++}
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    ${instruction}
                  </p>
                </div>`
  })

  const videoId = meal.youtube ? meal.youtube.split("v=")[1].split("&")[0] : null;

  return `<div class="max-w-7xl mx-auto">
        <button id="back-to-meals-btn"
          class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Recipes</span>
        </button>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div class="relative h-80 md:h-96">
            <img src="${meal.thumbnail}"
              alt="${meal.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area || "International"}</span>
                ${tagsBox}
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                ${meal.name}
              </h1>
              <div class="flex items-center gap-6 text-white/90">
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <span>30 min</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-utensils"></i>
                  <span id="hero-servings">Calculating...</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">Calculating...</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">
<button id="log-meal-btn"
  class="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed transition-all"
  data-meal-id="${meal.id}" disabled title="Waiting for nutrition data...">
  <i class="fa-solid fa-spinner fa-spin"></i>
  <span>Calculating...</span>
</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-600"></i>
                Ingredients
                <span class="text-sm font-normal text-gray-500 ml-auto">${ingredients.length} items</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${ingredientsBox}
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                Instructions
              </h2>
              <div class="space-y-4">
                ${instructionsBox}
              </div>
            </div>

              <div id="video-tutorial-section" class="bg-white rounded-2xl shadow-lg p-6 ">
                <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <iframe id="video-tutorial-iframe" src="https://www.youtube.com/embed/${videoId}" class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                  </iframe>
                </div>
              </div>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                Nutrition Facts
              </h2>
              <div id="nutrition-facts-container">
                ${renderNutritionFacts(null)}
              </div>
            </div>
          </div>
        </div>
      </div>`
}

export function calcBarWidth(value, dailyValue) {
  const percent = (value / dailyValue) * 100;
  return Math.min(percent, 100);
}

export function renderNutritionFacts(nutritionData) {
  if (!nutritionData) {
    return `<div class="text-center py-8">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
                <i class="fa-solid fa-calculator animate-pulse text-emerald-600 text-xl"></i>
            </div>
            <p class="text-gray-700 font-medium mb-1">Calculating Nutrition</p>
            <p class="text-sm text-gray-500">Analyzing ingredients...</p>
            <div class="mt-4 flex justify-center">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
            </div>
        </div>`;
  }

  return `<p class="text-sm text-gray-500 mb-4">Per serving</p>

        <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
          <p class="text-sm text-gray-600">Calories per serving</p>
          <p class="text-4xl font-bold text-emerald-600">${nutritionData.perServing.calories}</p>
          <p class="text-xs text-gray-500 mt-1">Total: ${nutritionData.totals.calories} cal</p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span class="text-gray-700">Protein</span>
            </div>
            <span class="font-bold text-gray-900">${nutritionData.perServing.protein}g</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="bg-emerald-500 h-2 rounded-full" style="width: ${calcBarWidth(nutritionData.perServing.protein, 50)}%"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span class="text-gray-700">Carbs</span>
            </div>
            <span class="font-bold text-gray-900">${nutritionData.perServing.carbs}g</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="bg-blue-500 h-2 rounded-full" style="width: ${calcBarWidth(nutritionData.perServing.carbs, 275)}%"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-purple-500"></div>
              <span class="text-gray-700">Fat</span>
            </div>
            <span class="font-bold text-gray-900">${nutritionData.perServing.fat}g</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="bg-purple-500 h-2 rounded-full" style="width: ${calcBarWidth(nutritionData.perServing.fat, 78)}%"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-orange-500"></div>
              <span class="text-gray-700">Fiber</span>
            </div>
            <span class="font-bold text-gray-900">${nutritionData.perServing.fiber}g</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="bg-orange-500 h-2 rounded-full" style="width: ${calcBarWidth(nutritionData.perServing.fiber, 28)}%"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-pink-500"></div>
              <span class="text-gray-700">Sugar</span>
            </div>
            <span class="font-bold text-gray-900">${nutritionData.perServing.sugar}g</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="bg-pink-500 h-2 rounded-full" style="width: ${calcBarWidth(nutritionData.perServing.sugar, 50)}%"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <span class="text-gray-700">Saturated Fat</span>
            </div>
            <span class="font-bold text-gray-900">${nutritionData.perServing.saturatedFat}g</span>
         </div>
         <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="bg-red-500 h-2 rounded-full" style="width: ${calcBarWidth(nutritionData.perServing.saturatedFat, 20)}%"></div>
            </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
        <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="flex justify-between">
                <span class="text-gray-600">Cholesterol</span>
                <span class="font-medium">${nutritionData.perServing.cholesterol}mg</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Sodium</span>
                <span class="font-medium">${nutritionData.perServing.sodium}mg</span>
            </div>
        </div>
    </div>`;
}

export function renderLoggedItem(meal, index) {
  const time = new Date(meal.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return `<div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                                <div class="w-14 h-14 flex-shrink-0">
        <img src="${meal.thumbnail}" alt="${meal.name}" class="w-14 h-14 rounded-xl object-cover">
                                </div>
                            <div>
                                <p class="font-semibold text-gray-900">${meal.name}</p>
                                <p class="text-sm text-gray-500">
                                    ${meal.servings} serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">${meal.type === "product" ? "Product" : "Recipe"}</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">${time}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${meal.nutrition.calories}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${meal.nutrition.protein}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${meal.nutrition.carbs}g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${meal.nutrition.fat}g F</span>
                            </div>
                            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="${index}">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>`

}

export function renderLoggedItemsSection(meals) {
  if (meals.length === 0) {
    return `<div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-700">Logged Items (0)</h4>

            </div>
            <div class="text-center py-12">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="text-3xl text-gray-300" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils"
                    data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true"
                    data-fa-i2svg="">
                    <path fill="currentColor"
                      d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z">
                    </path>
                  </svg></i>
              </div>
              <p class="text-gray-500 font-medium mb-2">No food logged today</p>
              <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning products
              </p>
              <div class="flex justify-center gap-3">
                <a href="#meals"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
                  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img"
                      viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg="">
                      <path fill="currentColor"
                        d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z">
                      </path>
                    </svg></i>
                  Browse Recipes
                </a>
                <a href="/products"
                  class="nav-link inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-barcode" data-prefix="fas" data-icon="barcode"
                      role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg="">
                      <path fill="currentColor"
                        d="M32 32C14.3 32 0 46.3 0 64L0 448c0 17.7 14.3 32 32 32s32-14.3 32-32L64 64c0-17.7-14.3-32-32-32zm88 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24zm72 32l0 384c0 17.7 14.3 32 32 32s32-14.3 32-32l0-384c0-17.7-14.3-32-32-32s-32 14.3-32 32zm208-8l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24s-24 10.7-24 24zm-96 0l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24s-24 10.7-24 24z">
                      </path>
                    </svg></i>
                  Scan Product
                </a>
              </div>
            </div>`
  } else {
    const itemsHtml = meals.map((meal, index) => renderLoggedItem(meal, index)).join('');
    return `
    <div class="flex items-center justify-between mb-3">
  <h4 class="text-sm font-semibold text-gray-700">Logged Items (${meals.length})</h4>

  <button id="clear-foodlog" class="text-red-500 hover:text-red-600 text-sm font-medium">
    <i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-trash" data-prefix="fas" data-icon="trash" role="img"
        viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg="">
        <path fill="currentColor"
          d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z">
        </path>
      </svg></i>Clear All
  </button>

</div>

<div class="space-y-3 max-h-96 overflow-y-auto">
    ${itemsHtml}
</div>`
  }
}

// ----------------------Weekly Overview-------------------------
export function renderWeeklyOverview(days) {
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayKey = new Date().toISOString().split("T")[0];

  let box = '';
  days.forEach((day) => {
    const isToday = day.dateKey === todayKey;
    const hasData = day.itemCount > 0;
    const dayLabel = dayLabels[day.date.getDay()];
    const dayNumber = day.date.getDate();

    box += `<div class="text-center ${isToday ? 'bg-indigo-100 rounded-xl' : ''}">
            <p class="text-xs text-gray-500 mb-1">${dayLabel}</p>
            <p class="text-sm font-medium text-gray-900">${dayNumber}</p>
            <div class="mt-2 ${hasData ? 'text-emerald-600' : 'text-gray-300'}">
                <p class="text-lg font-bold">${day.totals.calories}</p>
                <p class="text-xs">kcal</p>
            </div>
            ${hasData ? `<p class="text-xs text-gray-400 mt-1">${day.itemCount} items</p>` : ''}
        </div>`;
  });
  return box;
}


// -----------------------Products-------------------------------
function getNutriScoreColor(grade) {
  const colors = {
    a: "bg-green-500",
    b: "bg-lime-500",
    c: "bg-yellow-500",
    d: "bg-orange-500",
    e: "bg-red-500"
  };
  return colors[grade?.toLowerCase()] || "bg-gray-400";
}

function getNovaColor(novaGroup) {
  const colors = {
    1: "bg-green-500",
    2: "bg-lime-500",
    3: "bg-orange-500",
    4: "bg-red-500"
  };
  return colors[novaGroup] || "bg-gray-400";
}

function formatNumber(value, decimals = 1) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "N/A";
  }

  return number.toFixed(decimals);
}

export function renderProductCard(product) {

  return `
    <div
  class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
  data-barcode="${product.barcode}">
  <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">

<img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
  src="${product.image || ''}" alt="${product.name}"
  loading="lazy"
  >


    <!-- Nutri-Score Badge -->

<div class="absolute top-2 left-2 ${getNutriScoreColor(product.nutritionGrade)} text-white text-xs font-bold px-2 py-1 rounded uppercase">
  Nutri-Score ${product.nutritionGrade ? product.nutritionGrade.toUpperCase() : "N/A"}
</div>


    <!-- NOVA Badge -->

<div class="absolute top-2 right-2 ${getNovaColor(product.novaGroup)} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
  title="NOVA ${product.novaGroup || 'N/A'}">
  ${product.novaGroup || '?'}
</div>

  </div>

  <div class="p-4">
    <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${product.brand}</p>
    <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
      ${product.name}
    </h3>

    <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">

      <span><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-fire" data-prefix="fas" data-icon="fire"
            role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg="">
            <path fill="currentColor"
              d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z">
            </path>
          </svg></i>${formatNumber(product.nutrients.calories, 0)} kcal/100g</span>
    </div>

    <!-- Mini Nutrition -->
    <div class="grid grid-cols-4 gap-1 text-center">
      <div class="bg-emerald-50 rounded p-1.5">
        <p class="text-xs font-bold text-emerald-700">${formatNumber(product.nutrients.protein, 1)}g</p>
        <p class="text-[10px] text-gray-500">Protein</p>
      </div>
      <div class="bg-blue-50 rounded p-1.5">
        <p class="text-xs font-bold text-blue-700">${formatNumber(product.nutrients.carbs, 1)}g</p>
        <p class="text-[10px] text-gray-500">Carbs</p>
      </div>
      <div class="bg-purple-50 rounded p-1.5">
        <p class="text-xs font-bold text-purple-700">${formatNumber(product.nutrients.fat, 1)}g</p>
        <p class="text-[10px] text-gray-500">Fat</p>
      </div>
      <div class="bg-orange-50 rounded p-1.5">
        <p class="text-xs font-bold text-orange-700">${formatNumber(product.nutrients.sugar, 1)}g</p>
        <p class="text-[10px] text-gray-500">Sugar</p>
      </div>
    </div>
  </div>
</div>`
}

export function renderProductsInitialState() {
  return `<div class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa-solid fa-box-open text-3xl text-gray-400"></i>
        </div>
        <p class="text-gray-500 text-lg mb-2">No products to display</p>
        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
    </div>`;
}

export function renderProductsNotFoundState() {
  return `<div class="flex flex-col items-center justify-center py-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fa-solid fa-magnifying-glass text-2xl text-gray-400"></i>
        </div>
        <p class="text-gray-500 text-lg">No products found</p>
        <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
    </div>`;
}

export function renderProductsGrid(products) {
  if (products.length === 0) {
    return renderProductsNotFoundState();
  }
  return products.map((product) => renderProductCard(product)).join('');
}

export function renderProductCategories(data) {
  const styleMap = {
    "breakfast-cereals": { gradient: "from-amber-500 to-orange-500", icon: "fa-wheat-awn" },
    beverages: { gradient: "from-blue-500 to-cyan-500", icon: "fa-bottle-water" },
    snacks: { gradient: "from-purple-500 to-pink-500", icon: "fa-cookie" },
    dairies: { gradient: "from-sky-400 to-blue-500", icon: "fa-cheese" },
    fruits: { gradient: "from-red-500 to-rose-500", icon: "fa-apple-whole" },
    vegetables: { gradient: "from-green-500 to-emerald-500", icon: "fa-carrot" },
    breads: { gradient: "from-amber-600 to-yellow-500", icon: "fa-bread-slice" },
    meats: { gradient: "from-red-600 to-rose-600", icon: "fa-drumstick-bite" },
    sauces: { gradient: "from-orange-500 to-red-500", icon: "fa-jar" },
    cheeses: { gradient: "from-yellow-400 to-amber-500", icon: "fa-cheese" },
    yogurts: { gradient: "from-cyan-400 to-blue-500", icon: "fa-bowl-food" },
    chocolates: { gradient: "from-amber-600 to-orange-500", icon: "fa-cookie-bite" },
    biscuits: { gradient: "from-orange-400 to-amber-500", icon: "fa-cookie" },
    "ice-creams": { gradient: "from-pink-400 to-rose-500", icon: "fa-ice-cream" },
    waters: { gradient: "from-cyan-400 to-blue-500", icon: "fa-glass-water" },
    sodas: { gradient: "from-red-400 to-pink-500", icon: "fa-bottle-water" },
    coffees: { gradient: "from-stone-400 to-amber-500", icon: "fa-mug-hot" },
    teas: { gradient: "from-green-400 to-emerald-500", icon: "fa-mug-hot" },
    fishes: { gradient: "from-teal-400 to-cyan-500", icon: "fa-fish" },
    "plant-based-foods": { gradient: "from-lime-400 to-green-500", icon: "fa-seedling" },
    "chips-and-fries": { gradient: "from-yellow-400 to-orange-500", icon: "fa-cookie" },
    spreads: { gradient: "from-amber-500 to-orange-500", icon: "fa-jar" },
    pastas: { gradient: "from-yellow-400 to-amber-500", icon: "fa-bowl-food" },
    desserts: { gradient: "from-pink-400 to-purple-600", icon: "fa-ice-cream" }
  };
  const defaultStyle = { gradient: "from-blue-400 to-blue-500", icon: "fa-utensils" };

  const categories = data;
  let box = '';
  categories.forEach((category) => {
    const style = styleMap[category.id] || defaultStyle;
    box += `<button class="product-category-btn flex-shrink-0 px-5 py-3 bg-gradient-to-r ${style.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all" data-category="${category.id}">
            <i class="fa-solid ${style.icon} mr-2"></i>${category.name}
        </button>`;
  });
  return box;
}

export function renderToast(message) {
  return `<div class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 toast-notification">${message}</div>`;
}

export function renderProductLogToast(name) {
  return `<div class="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 toast-notification">${name} logged to your daily intake! 📝</div>`
}

const gradeInfo = {
  a: { color: "#1e8f4e", label: "Excellent" },
  b: { color: "#7ac547", label: "Good" },
  c: { color: "#f9c700", label: "Average" },
  d: { color: "#f2762e", label: "Poor" },
  e: { color: "#e63e11", label: "Bad" },
  unknown: { color: "#9ca3af", label: "Unknown" },
};

const novaInfo = {
  1: "Unprocessed",
  2: "Processed culinary",
  3: "Processed",
  4: "Ultra-processed",
};

const novaToGradeColor = {
  1: "a",
  2: "b",
  3: "d",
  4: "e",
};

export function renderProductLogModal(product) {
  const grade = product.nutritionGrade?.toLowerCase();
  const gradeData = gradeInfo[grade] || gradeInfo.unknown;
  const novaLabel = novaInfo[product.novaGroup] || "Unknown";
  const novaGradeKey = novaToGradeColor[product.novaGroup];
  const novaColor = gradeInfo[novaGradeKey]?.color || "#9ca3af";

  const nutrients = product.nutrients || {};

  return `
    <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-start gap-6 mb-6">
          <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="${product.image || ''}" alt="${product.name}" class="w-full h-full object-contain">
          </div>
          <div class="flex-1">
            <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand || ''}</p>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>

            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${gradeData.color}20">
                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: ${gradeData.color}">
                  ${grade ? grade.toUpperCase() : "?"}
                </span>
                <div>
                  <p class="text-xs font-bold" style="color: ${gradeData.color}">Nutri-Score</p>
                  <p class="text-[10px] text-gray-600">${gradeData.label}</p>
                </div>
              </div>

<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${novaColor}20">
  <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${novaColor}">
    ${product.novaGroup || "?"}
  </span>
  <div>
    <p class="text-xs font-bold" style="color: ${novaColor}">NOVA</p>
    <p class="text-[10px] text-gray-600">${novaLabel}</p>
  </div>
</div>
            </div>
          </div>
          <button class="close-product-modal text-gray-400 hover:text-gray-600">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <!-- Nutrition Facts -->
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-emerald-600"></i>
            Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
          </h3>

          <div class="text-center mb-4 pb-4 border-b border-emerald-200">
            <p class="text-4xl font-bold text-gray-900">${formatNumber(nutrients.calories, 0)}</p>
            <p class="text-sm text-gray-500">Calories</p>
          </div>

          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-emerald-500 h-2 rounded-full" style="width: ${calcBarWidth(nutrients.protein, 50)}%"></div>
              </div>
              <p class="text-lg font-bold text-emerald-600">${formatNumber(nutrients.protein, 1)}g</p>
              <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: ${calcBarWidth(nutrients.carbs, 275)}%"></div>
              </div>
              <p class="text-lg font-bold text-blue-600">${formatNumber(nutrients.carbs, 1)}g</p>
              <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-purple-500 h-2 rounded-full" style="width: ${calcBarWidth(nutrients.fat, 78)}%"></div>
              </div>
              <p class="text-lg font-bold text-purple-600">${formatNumber(nutrients.fat, 1)}g</p>
              <p class="text-xs text-gray-500">Fat</p>
            </div>
            <div class="text-center">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-orange-500 h-2 rounded-full" style="width: ${calcBarWidth(nutrients.sugar, 50)}%"></div>
              </div>
              <p class="text-lg font-bold text-orange-600">${formatNumber(nutrients.sugar, 1)}g</p>
              <p class="text-xs text-gray-500">Sugar</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="${product.barcode}">
            <i class="fa-solid fa-plus mr-2"></i>Log This Food
          </button>
          <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
            Close
          </button>
        </div>
      </div>
    </div>`;
}