import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signin = useAuthStore((state) => state.signin);
  // const checkAuth = useAuthStore((state) => state.checkAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signin(email, password);
    if (success) {
      // checkAuth();
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Sign In</h2>
      </div>

      {error && <div className="py-4 text-red-700">* {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-stone-700">
              Password
            </label>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-stone-600">Don't have an account?</span>{" "}
        <Link to="/signup" className="font-medium text-stone-900 hover:text-stone-700">
          Sign up
        </Link>
      </div>
    </Card>
  );
};

export default SignIn;
