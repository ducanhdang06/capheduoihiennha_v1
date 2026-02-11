import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function MenuDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // this is a variable so you need the arrow functions
  const LogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Menu Dashboard</h1>
      <button className="logout__button" onClick={LogOut}> Logout </button>
    </div>
  );
}
