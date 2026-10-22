import { useNavigate, useParams } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import PlantillaAdministrador from "../components/templates/PlantillaAdministrador";
import EncabezadoSeccion from "../components/molecules/EncabezadoSeccion";
import TablaDinamica from "../components/organisms/TablaDinamica";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function PaginaDetalleUsuario() {
    const navigate = useNavigate();
    const params = useParams();
    const { usuarios } = useUsuarios();
    useTituloPagina('Detalle de Usuario');

    const id = Number(params.id);
    const usuario = usuarios.find((u) => u.id === id);

    const historialPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');


    const pedidosUsuario = usuario
        ? historialPedidos.filter(
            (p) => p.usuarioId === usuario.id || p.correo === usuario.correo
        )
        : [];

    if (!usuario) {
        return (
            <PlantillaAdministrador>
                <EncabezadoSeccion titulo="Usuario no encontrado" />
                <div className="alert alert-warning mb-4">
                    El usuario solicitado no existe o fue eliminado.
                </div>
                <Boton
                    variante="secondary"
                    texto="Volver a usuarios"
                    onClick={() => navigate('/admin/usuarios')}
                />
            </PlantillaAdministrador>
        );
    }


    const columnasPedidos = [
        { titulo: '# Pedido', llave: 'id' },
        { titulo: 'Fecha', llave: 'fecha' },
        {
            titulo: 'Total',
            render: (ped) => `$${ped.total?.toLocaleString('es-CL') ?? 0}`
        },
        {
            titulo: 'Estado',
            render: (ped) => (
                <span className={`badge ${ped.estado === 'Entregado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {ped.estado || 'En proceso'}
                </span>
            )
        }
    ];

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion titulo={`Detalle de Usuario: ${usuario.nombre}`} />

            {/* Tarjeta de Información Personal */}
            <div className="card shadow-sm p-4 mb-4">
                <h5 className="mb-3 text-primary">Información Personal</h5>
                <p className="mb-1"><strong>ID:</strong> {usuario.id}</p>
                <p className="mb-1"><strong>Nombre:</strong> {usuario.nombre}</p>
                <p className="mb-1"><strong>Correo Electrónico:</strong> {usuario.correo}</p>
                <p className="mb-0"><strong>Rol en el Sistema:</strong> {usuario.rol}</p>
            </div>

            {/* Historial de Solicitudes/Pedidos del usuario */}
            <div className="card shadow-sm p-4 mb-4">
                <h5 className="mb-3 text-primary">Historial de Solicitudes / Compras</h5>
                {pedidosUsuario.length > 0 ? (
                    <TablaDinamica columnas={columnasPedidos} datos={pedidosUsuario} />
                ) : (
                    <div className="alert alert-info mb-0">
                        Este usuario no ha realizado ninguna solicitud o compra todavía.
                    </div>
                )}
            </div>

            <Boton
                variante="secondary"
                texto="Volver a usuarios"
                onClick={() => navigate('/admin/usuarios')}
            />
        </PlantillaAdministrador>
    );
}

export default PaginaDetalleUsuario;