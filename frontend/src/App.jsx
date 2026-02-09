import { Routes } from "react-router"
import TestApi from "./pages/TestApi";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import './App.css'
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRoutes />
    </BrowserRouter>
  );
}

