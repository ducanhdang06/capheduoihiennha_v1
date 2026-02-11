import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

/**
 * Create a context object
 * - Hold our global authentication state
 * - Initial value is null because we do not know when the app starts
 */
const AuthContext = createContext(null);

/**
 * AuthProvider wraps the entire app
 * Any component inside it can access auth state
 */
export function AuthProvider ({children}) {

  /**
   * user holds the currently logged-in user.
   * - null -> not logged in
   * - object -> logged in (id, username, role, etc.)
   */

  const[user, setUser] = useState(null);

  /**
   * loading tells us whether we are still checking the user authenticatio status
   * -> prevents redirect users before we know whether they are logged in
   */
  const [loading, setLoading] = useState(true);

  /**
   * This effect runs once when the app loads
   * its job:
   * - Ask the backend: who is the current user
   * - restore the login state if a valid token exists
   */
  useEffect(() => {
    const loadUser = async () => {
      try {
        /**
         * Call GET /auth/me 
         * - If token is valid -> returns user
         * - If token is missing/invalid -> throws 401
         */
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        /**
         * This handles:
         * - token is invalid / expired
         * - or user is not logged in
         */
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        /**
         * auth checking is done
         */
        setLoading(false);
      }
    };

    loadUser();
  }, []);


  /**
   * after a success login
   * - saves the token to localStorage
   * - stores user in for in react state
   */
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  /**
   * logs the user out
   * - removes token
   * - clears user state
   */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }
  
  /**
   * Provide auth state + helpers to the entire app.
   */
  return (
    <AuthContext.Provider
      value={{
        user,                    // current user or null
        isAuthenticated: !!user, // true if logged in
        loading,                 // auth check in progress?
        login,                   // call after login
        logout,                  // call to log out
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

/**
 * Custom hook to access auth state anywhere.
 *
 * Example:
 *   const { user, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);