// src/components/paginas/PaginaGestionUsuarios.jsx
import PlantillaAdministrador from "../components/templates/PlantillaAdministrador";
import Titulo from "../components/atoms/Title";
import { useUsuarios } from "../context/UsuariosContext";
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton';
import { useState } from "react";

function PaginaGestionUsuarios(props) {

  const { usuarios, eliminar } = useUsuarios()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)

  function abrirNuevo() {
    setMostrarFormulario(true)
    setUsuarioEditando(null)
  }

  function abrirEditar(usuario) {
    setMostrarFormulario(true)
    setUsuarioEditando(usuario)
  }
  const columnas = [
    { titulo: 'Nombre', llave: 'nombre' },
    { titulo: 'Correo', llave: 'correo' },
    { titulo: 'Rol', llave: 'rol' },
    {
      titulo: 'Acciones',
      render: (usuario) => (
        <>
          <Boton className="me-2" variante="danger" texto="Eliminar" onClick={() => eliminar(usuario.id)} />
          <Boton variante="warning" texto="Editar" onClick={() => abrirEditar(usuario)} />
        </>
      )
    }
  ]

  return (
    <PlantillaAdministrador >
      <header className="mb-4">
        <Titulo nivel={2} texto="Gestión de Usuarios" className="text-dark" />
        <p className="text-muted">Módulo CRUD para administración de usuarios.</p>
        <Boton variante="success" texto="Nuevo usuario +" onClick={() => abrirNuevo()} />

      </header>


      <div className="card shadow-sm p-4">
        <TablaDinamica columnas={columnas} datos={usuarios} />
      </div>
    </PlantillaAdministrador>
  );
}

export default PaginaGestionUsuarios;