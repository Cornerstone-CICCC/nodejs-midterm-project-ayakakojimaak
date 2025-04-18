import React from "react";
import { Cocktail } from "../types/Cocktail";
import CocktailCard from "./CocktailCard";

interface CocktailBordProps {
  cocktails: Cocktail[];
}

const CocktailBord: React.FC<CocktailBordProps> = ({ cocktails }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
      {cocktails.map((cocktail) => (
        <div key={cocktail.idDrink} className="h-full">
          <CocktailCard cocktail={cocktail} />
        </div>
      ))}
    </div>
  );
};

export default CocktailBord;
