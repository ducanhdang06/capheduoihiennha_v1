import { Routes, Route } from "react-router-dom";
import TestApi from "../pages/TestApi";
import MenuPage from "../pages/MenuPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ProtectedRoute from "./ProtectedRoute";
import MenuDashboard from "../pages/MenuDashboard";
import { ROLES } from "../constants/Roles";
import ManagerDashboard from "../pages/ManagerDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestApi />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/menu" element={<MenuPage />} />


      <Route
        path="/menu-dashboard"
        element={
          <ProtectedRoute minRole={ROLES.MANAGER}>
            <MenuDashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/manager-dashboard"
        element={
          <ProtectedRoute minRole={ROLES.ADMIN}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
