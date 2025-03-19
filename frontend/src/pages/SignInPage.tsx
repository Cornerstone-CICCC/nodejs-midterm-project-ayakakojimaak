import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
const API_URL = import.meta.env.VITE_API_URL;

const SignInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/user/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("err:", error);
      setError(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <SignIn onSignIn={handleSubmit} />
    </div>
  );
};

export default SignInPage;
