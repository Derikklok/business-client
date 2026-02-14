import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Customertab from "./components/dashboard/Customer-tab";
import Documentstab from "./components/dashboard/Docs-tab";
import ProfileTab from "./components/dashboard/Profile-tab";
import Inventory from "./pages/Inventory";
import PdfDashboard from "./pages/PDF-Dashboard";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="customers" element={<Customertab />} />
        <Route path="documents" element={<Documentstab />} />
        <Route path="profile" element={<ProfileTab />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="pdf" element={<PdfDashboard />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;