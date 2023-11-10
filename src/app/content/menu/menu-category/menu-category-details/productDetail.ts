export interface ProductDetail {
    name: string,
    selectedIngredients: [{
        id: number;
        name: string;
    }],
    selectedCategory: string,
    categories: [{
        id: number;
        name: string;
    }],
    ingredients: [{
        id: number;
        name: string;
    }]
}