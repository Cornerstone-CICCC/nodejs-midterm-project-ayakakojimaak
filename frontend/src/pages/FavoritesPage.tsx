import React, { useState, useEffect } from "react";
import { Cocktail } from "../types/Cocktail";
import CocktailBord from "../components/CocktailBord";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // お気に入りデータを取得
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // ダミーデータ
        const dummyFavorites: Cocktail[] = [];

        setFavorites(dummyFavorites);
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
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No favorites cocktails yet</p>
          <p className="mt-2 text-gray-500">Explore cocktails and add to favorites by clicking the heart icon</p>
        </div>
      ) : (
        <CocktailBord cocktails={favorites} />
      )}
    </div>
  );
};

export default FavoritesPage;
