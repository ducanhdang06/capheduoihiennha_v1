

/**
 * Inlcude functionality when user chose to logout
 * Help to reduce redundancy
 * Can use by declaring:
 * const logout = useLogout();
 */

import { useAuth } from "../context/AuthContext";

export default function useLogout() {
  const { logout } = useAuth();

  return () => {
    logout();
    window.location.href = "/";
  };
}