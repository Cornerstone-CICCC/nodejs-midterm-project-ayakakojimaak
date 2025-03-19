import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cocktail } from "../types/Cocktail";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CocktailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [ingredients, setIngredients] = useState<{ name: string; measure: string }[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // お気に入り状態をサーバーに保存
  };

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();

        if (data.drinks && data.drinks.length > 0) {
          const drinkData = data.drinks[0];
          setCocktail(drinkData);

          const extractedIngredients = [];
          for (let i = 1; i <= 15; i++) {
            const ingredient = drinkData[`strIngredient${i}`];
            const measure = drinkData[`strMeasure${i}`];

            if (ingredient) {
              extractedIngredients.push({
                name: ingredient,
                measure: measure || "",
              });
            }
          }

          setIngredients(extractedIngredients);
        }
      } catch (error) {
        console.error("Error fetching cocktail:", error);
      }
    };

    fetchCocktail();
  }, [id]);

  if (!cocktail) {
    return <div className="flex items-center justify-center min-h-screen"></div>;
  }

  return (
    <>
      <div className="flex gap-3 items-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-800">{cocktail.strDrink}</h1>
        <button onClick={handleFavoriteClick} className="text-2xl transition-transform">
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-zinc-700" />}
        </button>
      </div>

      <div className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-auto object-cover" />
          </div>

          <div className="p-6 md:w-2/3">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-medium">{cocktail.strCategory}</span>
              <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-medium">{cocktail.strGlass}</span>
              <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-medium">{cocktail.strAlcoholic}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-zinc-800 pb-2">Ingredients</h2>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-zinc-700">
                      <span className="font-medium">{item.name}</span>
                      {item.measure && <span className="text-zinc-500"> - {item.measure}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-zinc-800 pb-2">Instructions</h2>
              <p className="text-zinc-700 leading-relaxed">{cocktail.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CocktailPage;
