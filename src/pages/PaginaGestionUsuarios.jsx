// src/pages/PaginaGestionUsuarios.jsx
import { useState } from "react";
import { useUsuarios } from "../context/UsuariosContext";
import PlantillaAdministrador from "../components/templates/PlantillaAdministrador";
import EncabezadoSeccion from "../components/molecules/EncabezadoSeccion";
import BarraBusqueda from "../components/molecules/BarraBusqueda";
import TablaDinamica from "../components/organisms/TablaDinamica";
import FormularioUsuario from "../components/organisms/FormularioUsuario";
import Boton from "../components/atoms/Boton";

function PaginaGestionUsuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const { usuarios, crear, actualizar, eliminar } = useUsuarios()

  const texto = busqueda.toLowerCase()
  const usuariosFiltrados = usuarios.filter((u) =>
    (u.nombre ?? '').toLowerCase().includes(texto) ||
    (u.correo ?? '').toLowerCase().includes(texto)
  )

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
    <PlantillaAdministrador>
      <EncabezadoSeccion
        titulo="Gestión de Usuarios"
        textoBoton="NUEVO USUARIO"
        varianteBoton="success"
        onClickBoton={abrirNuevo}
      />

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

      <BarraBusqueda
        placeholder="Buscar por nombre o correo"
        valor={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        textoBoton="LIMPIAR"
        onBuscar={() => setBusqueda('')}
      />

      <TablaDinamica columnas={columnas} datos={usuariosFiltrados} />
    </PlantillaAdministrador>
  );
}

export default PaginaGestionUsuarios;