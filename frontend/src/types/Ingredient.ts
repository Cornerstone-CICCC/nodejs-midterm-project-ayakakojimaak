export interface IngredientDetail {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
  strAlcohol: string | null;
  strABV: string | null;
}

export interface IngredientResponse {
  ingredients: IngredientDetail[];
}
