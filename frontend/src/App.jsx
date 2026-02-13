import { Routes } from "react-router";
import TestApi from "./pages/TestApi";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import ScrollToTop from "./routes/ScrollToTop";
import ProtectedApp from "./routes/ProtectedApp";

export default function App() {
  return (
    <ProtectedApp>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <NavBar />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
    </ProtectedApp>
  );
}
