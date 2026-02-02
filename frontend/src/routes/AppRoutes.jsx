import { Routes, Route } from "react-router-dom";
import TestApi from "../pages/TestApi";
import MenuPage from "../pages/MenuPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/test" element={<TestApi />} />
      <Route path="/menu" element={<MenuPage />} />
    </Routes>
  );
}
