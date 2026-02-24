import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import ScrollToTop from "./routes/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <NavBar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </AuthProvider>

      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
