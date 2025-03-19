import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Cocktail } from "../types/Cocktail";
import { FaHeart, FaRegHeart, FaTrashAlt, FaStar, FaBookmark, FaRegBookmark } from "react-icons/fa";

const CocktailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [ingredients, setIngredients] = useState<{ name: string; measure: string; isFavorite: boolean }[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Dummy admin status
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      comment: "The perfect martini! Clean, crisp and elegant.",
      date: "2023-05-15",
    },
    {
      id: 2,
      author: "Emma Wilson",
      rating: 4,
      comment: "Very refreshing! I added a bit more lime and it was perfect.",
      date: "2023-06-02",
    },
    {
      id: 3,
      author: "Michael Brown",
      rating: 5,
      comment: "My go-to cocktail for summer evenings. Absolutely delicious!",
      date: "2023-06-20",
    },
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // お気に入り状態をサーバーに保存
  };

  const handleIngredientFavoriteClick = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].isFavorite = !updatedIngredients[index].isFavorite;
    setIngredients(updatedIngredients);
    // In a real app, save favorite ingredients to backend/localStorage
  };

  const handleDeleteReview = (reviewId: number) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    // In a real app, you would also delete from the backend
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review = {
        id: Date.now(),
        author: "Current User",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
    }
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
                isFavorite: false, // 初期状態は非お気に入り
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

          <div className="py-6 md:p-6 md:w-2/3">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-medium">{cocktail.strCategory}</span>
              <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-medium">{cocktail.strGlass}</span>
              <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-medium">{cocktail.strAlcoholic}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-zinc-800 pb-2">Ingredients</h2>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <button
                      onClick={() => handleIngredientFavoriteClick(index)}
                      className="ml-2 text-lg transition-colors"
                      title={item.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                      {item.isFavorite ? (
                        <FaBookmark className="text-zinc-500" />
                      ) : (
                        <FaRegBookmark className="text-zinc-400 hover:text-blue-500" />
                      )}
                    </button>
                    <Link
                      to={`/ingredient/${encodeURIComponent(item.name)}`}
                      className="flex items-center text-zinc-700 hover:text-zinc-600 transition">
                      <span className="font-medium">{item.name}</span>
                      {item.measure && <span className="text-zinc-500"> - {item.measure}</span>}
                    </Link>
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

      {/* Review Section */}
      <div className="mt-12">
        {/* Reviews List */}
        <div className="space-y-6 py-8">
          {reviews.length === 0 ? (
            <p className="text-zinc-500 italic">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.author}</span>
                      <span className="text-zinc-400 text-sm">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-zinc-300"} />
                      ))}
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-zinc-400 hover:text-zinc-500 transition"
                      title="Delete review">
                      <FaTrashAlt />
                    </button>
                  )}
                </div>
                <p className="text-zinc-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
        {/* Review Form */}
        <div className="mb-8 bg-white p-6 rounded-lg ">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-zinc-700 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="text-xl focus:outline-none">
                    <FaStar className={star <= newReview.rating ? "text-yellow-400" : "text-zinc-300"} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-zinc-700 mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this cocktail..."></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CocktailPage;
