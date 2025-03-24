import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Cocktail } from "../types/Cocktail";
import CocktailBord from "../components/CocktailBord";
import { favoriteCocktails } from "../assets/favoriteCocktails";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { username } = useAuthStore();

  const ingredients = [{ name: "Gin" }, { name: "Tequila" }, { name: "Tonic Water" }, { name: "Lime Juice" }];

  useEffect(() => {
    // お気に入りデータを取得
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // ダミーデータ
        setFavorites(favoriteCocktails);
        setLoading(false);
      } catch (err) {
        setError("error");
        setLoading(false);
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

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
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      {favorites.length === 0 || !username ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No favorites cocktails yet</p>
          <p className="mt-2 text-gray-500">Explore cocktails and add to favorites by clicking the heart icon</p>
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">Favorites</h3>
            {favorites.length > 0 ? <CocktailBord cocktails={favorites} /> : <p className="text-gray-500">Not found</p>}
          </div>
          {/* Ingredientsのお気に入り */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3 text-stone-800 pb-2">Ingredients</h2>
            <ul className="space-y-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <button className="ml-2 text-lg transition-colors cursor-pointer" title={"favorites"}>
                    <FaBookmark className="text-stone-500" />
                  </button>
                  <Link
                    to={`/ingredient/${encodeURIComponent(item.name)}`}
                    className="flex items-center text-stone-700 hover:text-stone-600 transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
