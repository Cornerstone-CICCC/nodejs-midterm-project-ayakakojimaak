import React, { useEffect, useState } from "react";
// import { Cocktail } from "../types/Cocktail";
import { FaPen, FaSignOutAlt, FaCheck } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";
// import CocktailCard from "../components/CocktailCard";

const Profile: React.FC = () => {
  const { username, email, signout, updateEmail, updateUsername } = useAuthStore();
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    if (username) setName(username);
    if (email) setNewEmail(email);
  }, [username, email]);

  const handleSave = () => {
    // APIを呼んでデータを更新する処理
  };
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="bg-white rounded-lg p-5 mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4 text-lg">
          {isEditingName ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <label className="block p-2 text-gray-700 h-10">{username}</label>
          )}
          <button onClick={() => setIsEditingName(!isEditingName)} className="text-stone-500 cursor-pointer">
            {isEditingName ? <FaCheck size={12} onClick={() => updateUsername(name)} /> : <FaPen size={12} />}
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 text-lg">
          {isEditingEmail ? (
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onBlur={() => setIsEditingEmail(false)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <label className="block p-2 text-gray-700 h-10">{newEmail}</label>
          )}
          <button onClick={() => setIsEditingEmail(!isEditingEmail)} className="text-stone-500 cursor-pointer">
            {isEditingEmail ? (
              <FaCheck
                size={12}
                onClick={() => {
                  console.log(newEmail);
                  updateEmail(newEmail);
                }}
              />
            ) : (
              <FaPen size={12} />
            )}
          </button>
        </div>
        <Button onClick={signout} className="mt-10 flex items-center text-stone-500 cursor-pointer gap-2">
          <FaSignOutAlt />
          <span>Sign Out</span>
        </Button>
      </div>

      <h3 className="text-xl font-semibold mb-3">Favorites</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* {favorites.length ? (
          favorites.map((cocktail) => <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />)
        ) : (
          <p className="text-gray-500">Not found</p>
        )} */}
      </div>

      <h3 className="text-xl font-semibold mb-3">Your Reviews</h3>
      <div className="space-y-4">
        {/* {reviews.length ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="text-lg font-bold">{review.cocktailName}</h4>
              <p className="text-gray-700 mt-2">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Not Found</p>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
