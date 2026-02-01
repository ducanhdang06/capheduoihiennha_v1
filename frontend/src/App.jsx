import { Routes } from "react-router"
import TestApi from "./pages/TestApi";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

