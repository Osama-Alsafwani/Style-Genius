import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Authpage from "./Pages/AuthPage";
import ProtectedRoute from "./component/ProtectedRoute";
import DashboardPage from "./Pages/DashboardPage";
import AnalysisPage from "./Pages/AnalysisPage";
// import viteLogo from '/vite.svg'

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Authpage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <AnalysisPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </AnimatePresence>
  );
}
