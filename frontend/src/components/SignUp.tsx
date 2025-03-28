import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!(name && email && password && confirmPassword)) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    const success = await signup(name, email, password);
    if (success) {
      checkAuth();
      navigate("/profile");
    } else {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Sign Up</h2>
      </div>

      {error && <div className="py-4 text-red-700 text-sm">* {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-900 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-900 mb-1">
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
          <label htmlFor="password" className="block text-sm font-medium text-stone-900 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-stone-900 mb-1">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            required
          />
          {passwordError && <p className="mt-1 text-sm text-red-700">* {passwordError}</p>}
        </div>

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-stone-400">Already have an account?</span>{" "}
        <Link to="/signin" className="font-medium text-stone-900 hover:text-stone-700">
          Sign in
        </Link>
      </div>
    </Card>
  );
};

export default SignUp;
