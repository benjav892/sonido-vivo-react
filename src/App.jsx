import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes Públicos
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Registro from "./pages/Registro";

// Componentes de Administración
import PaginaInicioAdministrador from "./pages/PaginaInicioAdministrador";
import PaginaGestionUsuarios from "./pages/PaginaGestionUsuarios";
import PaginaGestionInventario from "./pages/PaginaGestionInventario";
import { UsuariosProvider } from "./context/UsuariosContext";

function App() {
    return (
        <UsuariosProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/registro" element={<Registro />} />

                    <Route path="/admin" element={<PaginaInicioAdministrador />} />
                    <Route path="/admin/usuarios" element={<PaginaGestionUsuarios />} />
                    <Route path="/admin/inventario" element={<PaginaGestionInventario />} />
                </Routes>
            </BrowserRouter>
        </UsuariosProvider>
    );
}

export default App;