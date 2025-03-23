import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Cocktail } from "../types/Cocktail";
import {
  FaHeart,
  FaRegHeart,
  FaTrashAlt,
  FaStar,
  FaBookmark,
  FaRegBookmark,
  FaPen,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import type { Comment } from "../types/Comment";
import { useCommentStore } from "../store/commentStore";
import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";

const CocktailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [ingredients, setIngredients] = useState<{ name: string; measure: string; isFavorite: boolean }[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [newReview, setNewReview] = useState({ rate: 5, comment: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({ rate: 5, comment: "" });
  const { role, id: userId } = useAuthStore();

  const comments = useCommentStore((state) => state.comments);
  const getCommentsByCocktailId = useCommentStore((state) => state.getCommentsByCocktailId);
  const addComment = useCommentStore((state) => state.addComment);
  const editComment = useCommentStore((state) => state.editComment);
  const deleteComment = useCommentStore((state) => state.deleteComment);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // お気に入り状態をサーバーに保存
  };

  const handleIngredientFavoriteClick = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].isFavorite = !updatedIngredients[index].isFavorite;
    setIngredients(updatedIngredients);
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newReview.rate || !newReview.comment) {
      setError("Please fill in all fields");
      return;
    }
    if (id && cocktail) {
      await addComment(id, cocktail.strDrink, newReview.comment, newReview.rate);
      getCommentsByCocktailId(id);
    }
    //form reset
    setNewReview({ rate: 5, comment: "" });
  };

  const handleEditComment = async (commentId: string, text: string, rate: number) => {
    if (id) {
      await editComment(commentId, text, rate);
      getCommentsByCocktailId(id);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (id) {
      if (!confirm("Are you sure you want to delete this review?")) return;
      await deleteComment(commentId);
      getCommentsByCocktailId(id);
    }
  };
  // get comments by cocktail id
  useEffect(() => {
    if (id) {
      getCommentsByCocktailId(id);
    }
  }, [id]);

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
      <div className="flex gap-3 items-center mb-5 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">{cocktail.strDrink}</h1>
        <button onClick={handleFavoriteClick} className="text-2xl transition-transform cursor-pointer">
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-stone-700" />}
        </button>
      </div>
      <div className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-auto object-cover" />
          </div>

          <div className="py-6 md:p-6 md:w-2/3">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-stone-100 rounded-full text-sm font-medium">{cocktail.strCategory}</span>
              <span className="px-3 py-1 bg-stone-100 rounded-full text-sm font-medium">{cocktail.strGlass}</span>
              <span className="px-3 py-1 bg-stone-100 rounded-full text-sm font-medium">{cocktail.strAlcoholic}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-stone-800 pb-2">Ingredients</h2>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <button
                      onClick={() => handleIngredientFavoriteClick(index)}
                      className="ml-2 text-lg transition-colors cursor-pointer"
                      title={item.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                      {item.isFavorite ? (
                        <FaBookmark className="text-stone-500" />
                      ) : (
                        <FaRegBookmark className="text-stone-400" />
                      )}
                    </button>
                    <Link
                      to={`/ingredient/${encodeURIComponent(item.name)}`}
                      className="flex items-center text-stone-700 hover:text-stone-600 transition">
                      <span className="font-medium">{item.name}</span>
                      {item.measure && <span className="text-stone-500"> - {item.measure}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-stone-800 pb-2">Instructions</h2>
              <p className="text-stone-700 leading-relaxed">{cocktail.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        {/* Reviews List */}
        <div className="space-y-6 py-8">
          {comments.length === 0 ? (
            <p className="text-stone-500 italic">No reviews yet. Be the first to review!</p>
          ) : (
            comments.map((comment: Comment) => (
              <div key={comment.id} className="pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.authorName}</span>
                    </div>
                    {isEditing && comment.authorId === userId ? (
                      <div className="mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setEditedReview({ ...editedReview, rate: star })}
                              className="focus:outline-none cursor-pointer">
                              <FaStar className={star <= editedReview.rate ? "text-yellow-400" : "text-stone-300"} />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < comment.rate ? "text-yellow-400" : "text-stone-300"} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {comment.authorId === userId && isEditing ? (
                      <>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditedReview({ rate: comment.rate, comment: comment.text });
                          }}
                          className="text-stone-400 hover:text-stone-500 transition cursor-pointer"
                          title="Cancel edit">
                          <FaTimes />
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            handleEditComment(comment.id, editedReview.comment, editedReview.rate);
                          }}
                          className="text-stone-400 hover:text-stone-500 transition cursor-pointer"
                          title="Cancel edit">
                          <FaCheck />
                        </button>
                      </>
                    ) : (
                      comment.authorId === userId && (
                        <button
                          onClick={() => {
                            setIsEditing(true);
                          }}
                          className="text-stone-400 hover:text-stone-500 transition cursor-pointer"
                          title="Edit review">
                          <FaPen />
                        </button>
                      )
                    )}
                    {(role === "admin" || comment.authorId === userId) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-stone-400 hover:text-stone-500 transition cursor-pointer"
                        title="Delete review">
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                </div>
                {isEditing && comment.authorId === userId ? (
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={comment.text}
                    onChange={(e) => setEditedReview({ ...editedReview, comment: e.target.value })}
                    placeholder="Share your experience with this cocktail..."></textarea>
                ) : (
                  <p className="text-stone-700">{comment.text}</p>
                )}
              </div>
            ))
          )}
        </div>
        {/* Review Form */}
        {role ? (
          <div className="mb-8 bg-white p-6 rounded-lg ">
            <h3 className="text-lg font-medium mb-4">Write a Review</h3>
            <form onSubmit={(e) => handleAddComment(e)}>
              <div className="mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rate: star })}
                      className="text-xl focus:outline-none cursor-pointer">
                      <FaStar className={star <= newReview.rate ? "text-yellow-400" : "text-stone-300"} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience with this cocktail..."></textarea>
              </div>
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <Button type="submit">Submit Review</Button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-stone-500">Please sign in to write a review</p>
            <Link to="/signin" className="text-stone-700 hover:text-stone-600 transition mt-2 block">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CocktailPage;
