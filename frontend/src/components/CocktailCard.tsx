import React, { useEffect, useState } from "react";
import { Cocktail } from "../types/Cocktail";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { favoriteCocktails } from "../assets/favoriteCocktails";
import { useAuthStore } from "../store/authStore";

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { username } = useAuthStore();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (username) {
      const isFavorite = favoriteCocktails.some((fav) => fav.idDrink === cocktail.idDrink);
      setIsFavorite(isFavorite);
    }
  }, [cocktail.idDrink]);

  return (
    <Link to={`/cocktails/${cocktail.idDrink}`}>
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className="object-cover w-full h-full transition-all duration-300 hover:brightness-80"
        />
        <div className="absolute top-3 right-3">
          <button onClick={handleFavoriteClick} className="text-white text-xl transition-transform cursor-pointer">
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-white">{cocktail.strDrink}</h3>
              <p className="text-sm text-stone-200">{cocktail.strCategory}</p>
            </div>
          </div>

          {/* s{cocktail.strGlass || cocktail.strTags?.length ? (
            <div className="flex flex-wrap gap-1 mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100/80 text-stone-800">
                {cocktail.strGlass}
              </span>
              {cocktail.strTags &&
                cocktail.strTags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100/80 text-stone-800">
                    {tag}
                  </span>
                ))}
            </div>
          ) : null} */}
        </div>
      </div>
    </Link>
  );
};

export default CocktailCard;
