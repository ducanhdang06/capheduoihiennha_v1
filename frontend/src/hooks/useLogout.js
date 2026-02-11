

/**
 * Inlcude functionality when user chose to logout
 * Help to reduce redundancy
 * Can use by declaring:
 * const logout = useLogout();
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return () => {
    logout();
    navigate("/");
  };
}