import React from "react";
import SignIn from "../components/SignIn";
import { useAuthStore } from "../store/authStore";

const SignInPage: React.FC = () => {
  const { username } = useAuthStore();
  if (username) {
    window.document.location.href = "/profile";
  }
  return (
    <div className="flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
