// src/components/paginas/PaginaGestionUsuarios.jsx
import PlantillaAdministrador from "../components/templates/PlantillaAdministrador";
import BarraLateral from "../components/organisms/BarraLateral";
import Titulo from "../components/atoms/Title";

function PaginaGestionUsuarios(props) {
  const tituloMarca = props.tituloMarca || <>Sonido <br /> Vivo</>;

  const opcionesMenu = [
    { id: 1, texto: "Inicio", ruta: "/admin" },
    { id: 2, texto: "Gestión de usuarios", ruta: "/admin/usuarios" },
    { id: 3, texto: "Gestión de inventario", ruta: "/admin/inventario" }
  ];

  const sidebar = (
    <BarraLateral tituloMarca={tituloMarca} items={opcionesMenu} />
  );

  return (
    <PlantillaAdministrador barraLateral={sidebar}>
      <header className="mb-4">
        <Titulo nivel={2} texto="Gestión de Usuarios" className="text-dark" />
        <p className="text-muted">Módulo CRUD para administración de usuarios.</p>
      </header>

      {/* Aquí insertaremos el organismo del CRUD de Usuarios */}
      <div className="card shadow-sm p-4">
        <p className="m-0">Tabla y formulario de usuarios (CRUD)</p>
      </div>
    </PlantillaAdministrador>
  );
}

export default PaginaGestionUsuarios;