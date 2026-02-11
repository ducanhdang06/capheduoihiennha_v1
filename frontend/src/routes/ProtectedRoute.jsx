import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_PRIORITY = {
  MANAGER: 1,
  ADMIN: 2,
};

/**
 * ProtectedRoute
 *
 * Props:
 * - children: the page/component to render
 * - minRole (optional): minimum role required to access the page
 *
 * Behavior:
 * - waits for auth check
 * - redirects unauthenticated users to /login
 * - redirects unauthorized users to /unauthorized
 * - otherwise renders the page
 */

export default function ProtectedRoute({ children, minRole }) {
  // read the user and loading state from the authContext
  const { user, loading } = useAuth();

  // still checking auth --> wait
  if (loading) {
    return <p>Loading...</p>;
  }

  // if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // logged in but role is too low --> block
  if (minRole && ROLE_PRIORITY[user.role] < ROLE_PRIORITY[minRole]) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
