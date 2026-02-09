import { Routes, Route } from "react-router-dom";
import TestApi from "../pages/TestApi";
import MenuPage from "../pages/MenuPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestApi />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/menu" element={<MenuPage />} />
    </Routes>
  );
}
