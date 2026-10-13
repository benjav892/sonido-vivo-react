// src/components/paginas/PaginaGestionUsuarios.jsx
import PlantillaAdministrador from "../components/templates/PlantillaAdministrador";
import Titulo from "../components/atoms/Title";
import { useUsuarios } from "../context/UsuariosContext";
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton';
import { useState } from "react";
import FormularioUsuario from "../components/organisms/FormularioUsuario";

function PaginaGestionUsuarios(props) {

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const { usuarios, crear, actualizar, eliminar } = useUsuarios()

  function abrirNuevo() {
    setMostrarFormulario(true)
    setUsuarioEditando(null)
  }

  function abrirEditar(usuario) {
    setMostrarFormulario(true)
    setUsuarioEditando(usuario)
  }
  function cerrarFormulario() {
    setMostrarFormulario(false)
    setUsuarioEditando(null)
  }

  function alGuardar(datos) {
    if (usuarioEditando) {
      actualizar(usuarioEditando.id, datos)
    } else {
      crear(datos)
    }
    cerrarFormulario()
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
      {mostrarFormulario && (
        <div className="card shadow-sm p-4 mb-4">
          <FormularioUsuario
            key={usuarioEditando?.id ?? 'nuevo'}
            usuario={usuarioEditando}
            onGuardar={alGuardar}
            onCancelar={cerrarFormulario}
          />
        </div>
      )}

      <div className="card shadow-sm p-4">
        <TablaDinamica columnas={columnas} datos={usuarios} />
      </div>
    </PlantillaAdministrador>
  );
}

export default PaginaGestionUsuarios;