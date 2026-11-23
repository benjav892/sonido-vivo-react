import { BrowserRouter, Routes, Route } from "react-router-dom";

// Protección de rutas
import RutaProtegida from "./components/RutaProtegida";

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
import Categoria from "./pages/Categoria";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";

// Componentes de Administración
import PaginaInicioAdministrador from "./pages/PaginaInicioAdministrador";
import PaginaGestionUsuarios from "./pages/PaginaGestionUsuarios";
import PaginaDetalleProductoAdmin from "./pages/PaginaDetalleProductoAdmin";
import { PaginaGestionInventario } from "./pages/PaginaGestionInventario";
import { PaginaAgregarProducto } from "./pages/PaginaAgregarProducto";
import { PaginaGestionCategorias } from './pages/PaginaGestionCategorias';
import { PaginaAgregarCategoria } from './pages/PaginaAgregarCategoria';
import PaginaDetalleUsuario from "./pages/PaginaDetalleUsuario";
import PaginaItemsCriticos from "./pages/PaginaItemsCriticos";
import PaginaReportes from "./pages/PaginaReportes";
import PaginaPerfil from "./pages/PaginaPerfil";
import PaginaDetallePedido from "./pages/PaginaDetallePedido";

// Proveedores de contexto
import { UsuariosProvider } from "./context/UsuariosContext";
import { ProductosProvider } from "./context/ProductoContext";
import { CategoriasProvider } from './context/CategoriaContext';
import { AuthProvider } from "./context/AuthContext";
import { PedidosProvider } from './context/PedidosContext';

const ROLES_PERSONAL = ['Administrador', 'Vendedor'];
const SOLO_ADMIN = ['Administrador'];

function App() {
    return (
        <AuthProvider>
            <UsuariosProvider>
                <BrowserRouter>
                    <ProductosProvider>
                        <PedidosProvider>
                            <CategoriasProvider>
                                <Routes>
                                    {/* Rutas públicas */}
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
                                    <Route path="/categoria/:nombre" element={<Categoria />} />
                                    <Route path="/categorias" element={<Categorias />} />
                                    <Route path="/ofertas" element={<Ofertas />} />

                                    {/* Rutas que requieren sesión (cualquier rol autenticado) */}
                                    <Route path="/checkout" element={<RutaProtegida><Checkout /></RutaProtegida>} />
                                    <Route path="/respuesta-compra" element={<RutaProtegida><RespuestaCompra /></RutaProtegida>} />
                                    <Route path="/mis-pedidos" element={<RutaProtegida><MisPedidos /></RutaProtegida>} />

                                    {/* Rutas exclusivas de Administrador (CRUD de usuarios) */}
                                    <Route path="/admin/usuarios" element={<RutaProtegida rolesPermitidos={SOLO_ADMIN}><PaginaGestionUsuarios /></RutaProtegida>} />
                                    <Route path="/admin/usuarios/detalle/:id" element={<RutaProtegida rolesPermitidos={SOLO_ADMIN}><PaginaDetalleUsuario /></RutaProtegida>} />

                                    {/* Rutas de personal (Administrador y Vendedor) */}
                                    <Route path="/admin" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaInicioAdministrador /></RutaProtegida>} />
                                    <Route path="/admin/inventario" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaGestionInventario /></RutaProtegida>} />
                                    <Route path="/admin/inventario/nuevo" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaAgregarProducto /></RutaProtegida>} />
                                    <Route path="/admin/inventario/editar/:id" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaAgregarProducto /></RutaProtegida>} />
                                    <Route path="/admin/inventario/detalle/:id" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaDetalleProductoAdmin /></RutaProtegida>} />
                                    <Route path="/admin/categorias" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaGestionCategorias /></RutaProtegida>} />
                                    <Route path="/admin/categorias/nueva" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaAgregarCategoria /></RutaProtegida>} />
                                    <Route path="/admin/categorias/editar/:id" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaAgregarCategoria /></RutaProtegida>} />
                                    <Route path="/admin/pedidos" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><AdminPedidos /></RutaProtegida>} />
                                    <Route path="/admin/pedidos/:id" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaDetallePedido /></RutaProtegida>} />
                                    <Route path="/admin/criticos" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaItemsCriticos /></RutaProtegida>} />
                                    <Route path="/admin/reportes" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaReportes /></RutaProtegida>} />
                                    <Route path="/admin/perfil" element={<RutaProtegida rolesPermitidos={ROLES_PERSONAL}><PaginaPerfil /></RutaProtegida>} />
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