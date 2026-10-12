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

// 1. Importa el proveedor
import { ProductosProvider } from "./context/ProductoContext";

function App() {
    return (
        <BrowserRouter>
            <ProductosProvider>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/registro" element={<Registro />} />

                    <Route path="/admin" element={<PaginaInicioAdministrador />} />
                    <Route path="/admin/usuarios" element={<PaginaGestionUsuarios />} />
                    <Route path="/admin/inventario" element={<PaginaGestionInventario />} />
                </Routes>
            </ProductosProvider>
        </BrowserRouter>
    );
}

export default App;