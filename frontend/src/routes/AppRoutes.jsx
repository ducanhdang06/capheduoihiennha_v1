import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ROLES } from "../constants/Roles";
import ProtectedRoute from "./ProtectedRoute";

// Lazy loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const MenuPage = lazy(() => import("../pages/MenuPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const MenuDashboard = lazy(() => import("../pages/MenuDashboard"));
const ManagerDashboard = lazy(() => import("../pages/ManagerDashboard"));

const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Loading...
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />
      <Route path="/about-us" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
      <Route path="/menu" element={<Suspense fallback={<PageLoader />}><MenuPage /></Suspense>} />

      <Route
        path="/menu-dashboard"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute minRole={ROLES.MANAGER}>
              <MenuDashboard />
            </ProtectedRoute>
          </Suspense>
        }
      />

      <Route
        path="/manager-dashboard"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute minRole={ROLES.ADMIN}>
              <ManagerDashboard />
            </ProtectedRoute>
          </Suspense>
        }
      />
    </Routes>
  );
}