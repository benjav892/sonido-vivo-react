import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes Públicos
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Registro from "./pages/Registro";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import DetalleBlog from "./pages/DetalleBlog";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import RespuestaCompra from "./pages/RespuestaCompra";
import MisPedidos from "./pages/MisPedidos";
import AdminPedidos from "./pages/AdminPedidos";

// Componentes de Administración
import PaginaInicioAdministrador from "./pages/PaginaInicioAdministrador";
import PaginaGestionUsuarios from "./pages/PaginaGestionUsuarios";
import PaginaDetalleProductoAdmin from "./pages/PaginaDetalleProductoAdmin";
import { PaginaGestionInventario } from "./pages/PaginaGestionInventario";
import { PaginaAgregarProducto } from "./pages/PaginaAgregarProducto";
import { PaginaGestionCategorias } from './pages/PaginaGestionCategorias';
import { PaginaAgregarCategoria } from './pages/PaginaAgregarCategoria';
import PaginaDetalleUsuario from "./pages/PaginaDetalleUsuario";
import PaginaReportes from "./pages/PaginaReportes";
import PaginaPerfil from "./pages/PaginaPerfil";
import PaginaDetallePedido from "./pages/PaginaDetallePedido";

// Proveedores de contexto
import { UsuariosProvider } from "./context/UsuariosContext";
import { ProductosProvider } from "./context/ProductoContext";
import { CategoriasProvider } from './context/CategoriaContext';
import { AuthProvider } from "./context/AuthContext";
import { PedidosProvider } from './context/PedidosContext';


function App() {
    return (
        <AuthProvider>
            <UsuariosProvider>
                <BrowserRouter>
                    <ProductosProvider>
                        <PedidosProvider>
                            <CategoriasProvider>
                                <Routes>
                                    <Route path="/" element={<Inicio />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/catalogo" element={<Catalogo />} />
                                    <Route path="/producto/:codigo" element={<DetalleProducto />} />
                                    <Route path="/registro" element={<Registro />} />
                                    <Route path="/contacto" element={<Contacto />} />
                                    <Route path="/nosotros" element={<Nosotros />} />
                                    <Route path="/blogs" element={<Blogs />} />
                                    <Route path="/blog/:id" element={<DetalleBlog />} />
                                    <Route path="/carrito" element={<Carrito />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/respuesta-compra" element={<RespuestaCompra />} />
                                    <Route path="/mis-pedidos" element={<MisPedidos />} />

                                    <Route path="/admin" element={<PaginaInicioAdministrador />} />
                                    <Route path="/admin/usuarios" element={<PaginaGestionUsuarios />} />
                                    <Route path="/admin/usuarios/detalle/:id" element={<PaginaDetalleUsuario />} />
                                    <Route path="/admin/inventario" element={<PaginaGestionInventario />} />
                                    <Route path="/admin/inventario/nuevo" element={<PaginaAgregarProducto />} />
                                    <Route path="/admin/inventario/editar/:id" element={<PaginaAgregarProducto />} />
                                    <Route path="/admin/inventario/detalle/:id" element={<PaginaDetalleProductoAdmin />} />

                                    <Route path="/admin/categorias" element={<PaginaGestionCategorias />} />
                                    <Route path="/admin/categorias/nueva" element={<PaginaAgregarCategoria />} />
                                    <Route path="/admin/categorias/editar/:id" element={<PaginaAgregarCategoria />} />
                                    <Route path="/admin/pedidos" element={<AdminPedidos />} />
                                    <Route path="/admin/pedidos/:id" element={<PaginaDetallePedido />} />
                                    <Route path="/admin/reportes" element={<PaginaReportes />} />
                                    <Route path="/admin/perfil" element={<PaginaPerfil />} />
                                </Routes>
                            </CategoriasProvider>
                        </PedidosProvider>
                    </ProductosProvider>
                </BrowserRouter>
            </UsuariosProvider>
        </AuthProvider>
    );
}

export default App;