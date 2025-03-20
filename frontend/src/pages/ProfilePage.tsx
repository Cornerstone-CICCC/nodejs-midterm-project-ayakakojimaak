import React from "react";
import { useAuthStore } from "../store/authStore";

const ProfilePage: React.FC = () => {
  const { username, email } = useAuthStore();

  return (
    <div className="flex justify-center items-center">
      {username}
      {email}
      <button>Sign Out</button>
    </div>
  );
};

export default ProfilePage;
