import React, { useEffect, useState } from "react";
// import { Cocktail } from "../types/Cocktail";
import { Comment } from "../types/Comment"; // Make sure to import the Comment type¥
import { useAuthStore } from "../store/authStore";
import { useCommentStore } from "../store/commentStore";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { FaPen, FaSignOutAlt, FaCheck, FaStar } from "react-icons/fa";

// import CocktailCard from "../components/CocktailCard";

const Profile: React.FC = () => {
  const { username, email, role, signout, updateEmail, updateUsername } = useAuthStore();
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [myComment, setMyComment] = useState<Comment[]>([]);
  const getCommentsByAuthorId = useCommentStore((state) => state.getCommentsByAuthorId);

  const [newComment, setNewComment] = useState<Comment[]>([]);
  const getComments = useCommentStore((state) => state.getComments);

  useEffect(() => {
    if (username) setName(username);
    if (email) setNewEmail(email);
    getCommentsByAuthorId().then((data) => setMyComment(data));
    if (role !== "admin") return;
    getComments().then((data) => setNewComment(data));
  }, [username, email]);

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
            {isEditingEmail ? <FaCheck size={12} onClick={() => updateEmail(newEmail)} /> : <FaPen size={12} />}
          </button>
        </div>
        <div className="mt-10 flex items-center gap-2">
          <Button onClick={signout} className="flex items-center gap-2">
            <FaSignOutAlt />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
      {role !== "admin" ? (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3">Your Reviews</h3>
          <div className="space-y-4">
            {myComment.length ? (
              myComment.map((comment) => (
                <Link to={`/cocktails/${comment.cocktailId}`} key={comment.id}>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="mb-3 font-bold">{comment.cocktailName}</div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < comment.rate ? "text-yellow-400" : "text-stone-300"} />
                      ))}
                    </div>
                    <p className="text-gray-700 mt-2">{comment.text}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">Not Found</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">Usage Statistics</h3>
            <div className="space-y-2">
              {/* User Statistics */}
              <div className=" p-4 rounded-md">
                <h4 className="font-semibold mb-2">User Statistics</h4>
                <p className="text-gray-500">Total Users: 1,234</p>
                <p className="text-gray-500">Active Users (Last 30 Days): 567</p>
                <p className="text-gray-500">New Users (This Month): 123</p>
              </div>

              {/* Page View Statistics */}
              <div className=" p-4 rounded-md">
                <h4 className="font-semibold mb-2">Page View Statistics</h4>
                <p className="text-gray-500">Total Page Views: 123,456</p>
                <p className="text-gray-500">Average Page Stay Time: 2 minutes 30 seconds</p>
                <p className="text-gray-500">Most Visited Page: /products/123 (12,345 views)</p>
              </div>
            </div>
          </div>
          <div className="mb-10 ">
            <h3 className="text-xl font-semibold mb-3">New Reviews</h3>
            <div className="space-y-4 h-96 overflow-y-auto">
              {newComment.length ? (
                newComment.map((comment) => (
                  <Link to={`/cocktails/${comment.cocktailId}`} key={comment.id}>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="mb-3 font-bold">{comment.cocktailName}</div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < comment.rate ? "text-yellow-400" : "text-stone-300"} />
                        ))}
                      </div>
                      <p className="text-gray-700 mt-2">{comment.text}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">Not Found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
