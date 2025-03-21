import React from "react";
import SignUp from "../components/SignUp";
import { useAuthStore } from "../store/authStore";

const SignUpPage: React.FC = () => {
  const { username } = useAuthStore();
  if (username) {
    window.document.location.href = "/profile";
  }

  return (
    <div className="flex justify-center items-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
