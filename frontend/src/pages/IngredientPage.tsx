import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Cocktail, CocktailResponse } from "../types/Cocktail";
import { IngredientDetail } from "../types/Ingredient";
import CocktailBord from "../components/CocktailBord";

const IngredientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [ingredient, setIngredient] = useState<IngredientDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCocktailsByIngredient = async () => {
      try {
        setLoading(true);
        // URLパラメータから取得した材料名を直接使用
        const ingredientName = decodeURIComponent(id || "");

        // 材料の詳細情報を取得
        const ingredientResponse = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${encodeURIComponent(ingredientName)}`
        );
        const ingredientData = await ingredientResponse.json();

        if (ingredientData.ingredients && ingredientData.ingredients.length > 0) {
          setIngredient(ingredientData.ingredients[0]);

          // 材料名を使ってカクテルを検索
          const cocktailsResponse = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredientName)}`
          );
          const cocktailsData: CocktailResponse = await cocktailsResponse.json();

          if (cocktailsData.drinks) {
            setCocktails(cocktailsData.drinks);
          }
        } else {
          // 材料が見つからない場合はエラー表示
          setError("Ingredient not found");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching cocktails by ingredient:", err);
        setError("Error loading ingredient data");
        setLoading(false);
      }
    };

    fetchCocktailsByIngredient();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {ingredient && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {ingredient.strIngredient} is used in {cocktails.length} cocktails
          </h1>
          {ingredient.strDescription && (
            <div className="bg-stone-50 p-4 rounded-lg mb-6">
              <p className="text-stone-700">{ingredient.strDescription}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {ingredient.strType && (
              <span className="px-3 py-1 bg-stone-100 rounded-full text-sm font-medium">
                type: {ingredient.strType}
              </span>
            )}
            {ingredient.strAlcohol && (
              <span className="px-3 py-1 bg-stone-100 rounded-full text-sm font-medium">
                alcohol: {ingredient.strAlcohol}
              </span>
            )}
            {ingredient.strABV && (
              <span className="px-3 py-1 bg-stone-100 rounded-full text-sm font-medium">
                alcohol content: {ingredient.strABV}%
              </span>
            )}
          </div>
        </div>
      )}

      {cocktails.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No cocktails found</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Found {cocktails.length} cocktails</h2>
          <CocktailBord cocktails={cocktails} />
        </>
      )}
    </div>
  );
};

export default IngredientPage;
