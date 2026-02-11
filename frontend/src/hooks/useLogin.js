import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return async (username, password) => {
    // Login and get token only
    console.log(username);
    console.log(password);
    const res = await api.post("/auth/login", {
      username,
      password,
    });

    const token = res.data.accessToken;

    // save the token
    localStorage.setItem("token", token);

    // ask backend who am i
    const meRes = await api.get("/auth/me");

    // update the context
    login(token, meRes.data);

    // redirect to 
    navigate("/menu-dashboard");
  };
}

