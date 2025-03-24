import React from "react";
import CocktailBord from "../components/CocktailBord";
import { initialCocktails } from "../assets/initialCocktails";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <CocktailBord cocktails={initialCocktails} />
    </div>
  );
};

export default HomePage;
