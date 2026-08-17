const NUTRITION_API = {
    BASE_URL: 'https://nutriplan-api.vercel.app/api/'
}

export async function getProductCategories() {
    const response = await fetch(NUTRITION_API.BASE_URL + "products/categories");
    if (!response.ok) throw Error("Error happened when loading product categories");
    const categories = await response.json()
    return categories.results;
}

export async function getProductByBarcode(barcode) {
    const response = await fetch(NUTRITION_API.BASE_URL + `products/barcode/${barcode}`);
    if (!response.ok) throw Error("Error happened when looking up barcode (not found)");
    const result = await response.json();
    return result
}

export async function searchProducts(query) {
    const response = await fetch(NUTRITION_API.BASE_URL + `products/search?q=${query}`);
    if (!response.ok) throw Error("Error happened when searching products");
    const data = await response.json();
    return data.results;
}

export async function getProductsByCategory(category) {
    const response = await fetch(NUTRITION_API.BASE_URL + `products/category/${category}`);
    if (!response.ok) throw Error("Error happened when loading category products");
    const data = await response.json();
    return data.results;
}



