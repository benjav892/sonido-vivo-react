// src/components/paginas/PaginaInicioAdministrador.jsx
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import BarraLateral from '../components/organisms/BarraLateral';
import Titulo from '../components/atoms/Title';

function PaginaInicioAdministrador(props) {
    const tituloMarca = props.tituloMarca || <>Sonido <br /> Vivo</>;

    // Definición centralizada de las rutas del panel
    const itemsNavegacion = [
        { id: 1, texto: "Inicio", ruta: "/admin" },
        { id: 2, texto: "Gestión de usuarios", ruta: "/admin/usuarios" },
        { id: 3, texto: "Gestión de inventario", ruta: "/admin/inventario" }
    ];

    // Construimos el organismo de la barra lateral con sus datos
    const sidebar = (
        <BarraLateral 
            tituloMarca={tituloMarca} 
            items={itemsNavegacion} 
        />
    );

    return (
        <PlantillaAdministrador barraLateral={sidebar}>
            {/* Contenido principal inyectado como props.children en la plantilla */}
            <div className="mt-4">
                <Titulo texto="¡Bienvenido Administrador!" nivel={2} className="mb-3 text-center" />
            </div>
        </PlantillaAdministrador>
    );
}

export default PaginaInicioAdministrador;