const STORAGE_KEY = "nutriplan_daily_log"

export function getTodayKey() {
    const today = new Date().toISOString().split("T")[0];
    return today
}

export function getFoodLog() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

export function saveFoodLog(log) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

export function logMeal(mealEntry) {
    const today = getTodayKey();
    const savedBefore = getFoodLog();
    if (!savedBefore[today]) {
        savedBefore[today] = { meals: [] };
    }
    savedBefore[today].meals.push(mealEntry);
    saveFoodLog(savedBefore);
}

export function removeMealFromLog(index) {
    const today = getTodayKey();
    const savedBefore = getFoodLog();
    if (!savedBefore[today]) return;
    savedBefore[today].meals = savedBefore[today].meals.filter((meal, i) => i !== index);
    saveFoodLog(savedBefore);
}

export function clearTodayLog() {
    const today = getTodayKey();
    const savedBefore = getFoodLog();
    if (!savedBefore[today]) return;
    savedBefore[today].meals = [];
    saveFoodLog(savedBefore)
}

export function getTodayMeals() {
    const today = getTodayKey();
    const savedBefore = getFoodLog();
    if (!savedBefore[today]) return [];
    return savedBefore[today].meals
}

export function calculateTotals(meals) {
    return meals.reduce((totals, item) => {
        totals.calories += item.nutrition.calories;
        totals.protein += item.nutrition.protein;
        totals.carbs += item.nutrition.carbs;
        totals.fat += item.nutrition.fat;
        return totals;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
}

// ---------weekly overview helpers--------------

export function getDateKeyOffset(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[0];
}

export function getWeeklyData() {
    const fullLog = getFoodLog();
    const days = [];

    for (let i = 6; i >= 0; i--) {
        const dateKey = getDateKeyOffset(i);
        const dayEntry = fullLog[dateKey];
        const meals = dayEntry ? dayEntry.meals : [];
        const totals = calculateTotals(meals);

        days.push({
            dateKey,
            date: new Date(dateKey),
            totals,
            itemCount: meals.length
        });
    }
    return days;
}

export function calculateWeeklyStats(days) {
    const totalCalories = days.reduce((sum, day) => sum + day.totals.calories, 0);
    const daysWithData = days.filter(day => day.itemCount > 0);
    const weeklyAverage = daysWithData.length > 0
        ? Math.round(totalCalories / daysWithData.length)
        : 0;

    const totalItems = days.reduce((sum, day) => sum + day.itemCount, 0);
    const daysOnGoal = days.filter(day => day.totals.calories >= 2000).length;

    return { weeklyAverage, totalItems, daysOnGoal };
}