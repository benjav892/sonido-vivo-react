import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes Públicos
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";

// Componentes de Administración
import PaginaInicioAdministrador from "./pages/PaginaInicioAdministrador";
import PaginaGestionUsuarios from "./pages/PaginaGestionUsuarios";
import PaginaGestionInventario from "./pages/PaginaGestionInventario";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/catalogo" element={<Catalogo />} />
                
                <Route path="/admin" element={<PaginaInicioAdministrador />} />
                <Route path="/admin/usuarios" element={<PaginaGestionUsuarios />} />
                <Route path="/admin/inventario" element={<PaginaGestionInventario />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;