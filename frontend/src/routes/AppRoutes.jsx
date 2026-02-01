import { Routes, Route } from "react-router-dom";
import TestApi from "../pages/TestApi";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/test" element={<TestApi />} />
    </Routes>
  );
}
