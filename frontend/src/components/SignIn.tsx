import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  error?: string;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Sign In</h2>
      </div>

      {error && <div className="mb-4 p-3 bg-zinc-100 border border-zinc-300 text-zinc-900 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Password
            </label>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-zinc-600">Don't have an account?</span>{" "}
        <Link to="/signup" className="font-medium text-zinc-900 hover:text-zinc-700">
          Sign up
        </Link>
      </div>
    </Card>
  );
};

export default SignIn;
