// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminHomePage from "./pages/AdminHome";
import AdminUsersPage from "./pages/AdminUsuarios";
import AdminInventoryPage from "./pages/AdminInventario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial a /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        {/* Rutas de administración */}
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/usuarios" element={<AdminUsersPage />} />
        <Route path="/admin/inventario" element={<AdminInventoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;