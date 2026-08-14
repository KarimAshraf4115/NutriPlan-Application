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
    for (let i = 0; i < areasList.length; i++) {
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


function calcBarWidth(value, dailyValue) {
    const percent = (value / dailyValue) * 100;
    return Math.min(percent, 100);
}
export function renderDetails(meal, nutritionData) {
    const tags = meal.tags
    let tagsBox = '';
    tags.forEach((tag) => {
        tagsBox += `<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${tag}</span>`
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
            `               <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${index++}
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    ${instruction}
                  </p>
                </div>`
    })
        
      return`<div class="max-w-7xl mx-auto">
        <!-- Back Button -->
        <button id="back-to-meals-btn"
          class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Recipes</span>
        </button>

        <!-- Hero Section -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div class="relative h-80 md:h-96">
            <img src="${meal.thumbnail}"
              alt="${meal.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>
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
                  <span id="hero-servings">${nutritionData.servings} servings</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">${nutritionData.perServing.calories} cal/serving</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mb-8">
          <button id="log-meal-btn"
            class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            data-meal-id="${meal.id}">
            <i class="fa-solid fa-clipboard-list"></i>
            <span>Log This Meal</span>
          </button>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Ingredients & Instructions -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Ingredients -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-600"></i>
                Ingredients
                <span class="text-sm font-normal text-gray-500 ml-auto">9 items</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${ingredientsBox}
              </div>
            </div>

            <!-- Instructions -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                Instructions
              </h2>
              <div class="space-y-4">
                ${instructionsBox}
              </div>
            </div>

            <!-- Video Section -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
              </h2>
              <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <iframe src="${meal.youtube}" class="absolute inset-0 w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>

          <!-- Right Column - Nutrition -->
          <div class="space-y-6">
            <!-- Nutrition Facts -->
            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                Nutrition Facts
              </h2>
              <div id="nutrition-facts-container">
                <p class="text-sm text-gray-500 mb-4">Per serving</p>

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
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
}