import { useNavigate } from 'react-router-dom';
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import Boton from '../components/atoms/Boton';
import { useAuth } from '../context/AuthContext';
import { useSoloPersonal } from '../hooks/useSoloPersonal';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaPerfil() {
    const autorizado = useSoloPersonal();
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();
    useTituloPagina('Mi perfil');

    if (!autorizado) return null;

    function cerrarSesion() {
        logout();
        navigate('/login');
    }

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion titulo="Mi Perfil" />
            <div className="card shadow-sm p-4 mb-4">
                <h5 className="mb-3 text-primary">Datos de la cuenta</h5>
                <p className="mb-1"><strong>Nombre:</strong> {usuario.nombre}</p>
                <p className="mb-1"><strong>Correo:</strong> {usuario.correo}</p>
                <p className="mb-0"><strong>Rol:</strong> {usuario.rol}</p>
            </div>
            <Boton variante="danger" texto="Cerrar sesión" onClick={cerrarSesion} />
        </PlantillaAdministrador>
    );
}

export default PaginaPerfil;
