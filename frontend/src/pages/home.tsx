import React from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <SignUp />
      <SignIn />
    </div>
  );
};

export default Home;
