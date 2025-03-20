import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CocktailPage from "./pages/CocktailPage";
import FavoritesPage from "./pages/FavoritesPage";
import IngredientPage from "./pages/IngredientPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <SignInPage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpPage />
            </Layout>
          }
        />
        <Route
          path="/cocktails/:id"
          element={
            <Layout>
              <CocktailPage />
            </Layout>
          }
        />
        <Route
          path="/favorites"
          element={
            <Layout>
              <FavoritesPage />
            </Layout>
          }
        />
        <Route
          path="/ingredient/:id"
          element={
            <Layout>
              <IngredientPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
