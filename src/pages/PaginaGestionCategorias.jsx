import { useState } from 'react'
import { Alert, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCategorias } from '../context/CategoriaContext'
import { obtenerMensajeError } from '../services/api'
import { useTituloPagina } from '../hooks/useTituloPagina'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import BarraBusqueda from '../components/molecules/BarraBusqueda'
import TablaDinamica from '../components/organisms/TablaDinamica'
import Boton from '../components/atoms/Boton'

export function PaginaGestionCategorias() {
  const [busqueda, setBusqueda] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminacion, setErrorEliminacion] = useState('')

  const navigate = useNavigate()
  const { categorias, cargando, error, eliminar, recargar } = useCategorias()

  useTituloPagina('Gestión de categorías')

  function irAAgregarCategoria() {
    navigate('/admin/categorias/nueva')
  }

  function irAEditarCategoria(id) {
    navigate(`/admin/categorias/editar/${id}`)
  }

  function solicitarEliminacion(categoria) {
    setErrorEliminacion('')
    setMensajeExito('')
    setCategoriaAEliminar(categoria)
  }

  function cancelarEliminacion() {
    if (eliminando) return
    setCategoriaAEliminar(null)
    setErrorEliminacion('')
  }

  async function confirmarEliminacion() {
    if (!categoriaAEliminar) return
    setEliminando(true)
    setErrorEliminacion('')
    try {
      await eliminar(categoriaAEliminar.id)
      setMensajeExito(`Categoría "${categoriaAEliminar.texto}" eliminada correctamente.`)
      setCategoriaAEliminar(null)
    } catch (err) {
      setErrorEliminacion(obtenerMensajeError(err))
    } finally {
      setEliminando(false)
    }
  }

  const categoriasFiltradas = (categorias || []).filter((categoria) => {
    const textoBusqueda = busqueda.toLowerCase()
    const nombre = (categoria.texto || categoria.nombre || '').toLowerCase()
    return nombre.includes(textoBusqueda)
  })

  const columnasCategorias = [
    {
      titulo: 'ID',
      llave: 'id',
    },
    {
      titulo: 'Categoría',
      llave: 'texto',
      render: (categoria) => <span className="fw-bold">{categoria.texto || categoria.nombre}</span>,
    },
    {
      titulo: 'Imagen',
      llave: 'src',
      render: (categoria) => (
        <span className="text-muted small">{categoria.src || categoria.imagen}</span>
      ),
    },
    {
      titulo: 'Acciones',
      llave: 'acciones',
      render: (categoria) => (
        <div className="d-flex gap-2 flex-wrap">
          <Boton
            variante="warning"
            texto="Editar"
            className="btn-sm border"
            onClick={() => irAEditarCategoria(categoria.id)}
          />
          <Boton
            variante="danger"
            texto="Eliminar"
            className="btn-sm border"
            onClick={() => solicitarEliminacion(categoria)}
          />
        </div>
      ),
    },
  ]

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion
        titulo="Gestión de Categorías"
        textoBoton="AGREGAR CATEGORÍA"
        onClickBoton={irAAgregarCategoria}
      />

      {mensajeExito && (
        <Alert variant="success" dismissible onClose={() => setMensajeExito('')}>
          {mensajeExito}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
          <div className="mt-2">
            <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
          </div>
        </Alert>
      )}

      <BarraBusqueda
        placeholder="Buscar por nombre"
        textoBoton="LIMPIAR"
        valor={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onBuscar={() => setBusqueda('')}
      />

      {cargando ? (
        <div className="text-center py-4" role="status">
          Cargando categorías desde el servidor...
        </div>
      ) : (
        <TablaDinamica columnas={columnasCategorias} datos={categoriasFiltradas} />
      )}

      <Modal
        show={Boolean(categoriaAEliminar)}
        onHide={cancelarEliminacion}
        centered
        backdrop={eliminando ? 'static' : true}
        keyboard={!eliminando}
      >
        <Modal.Header closeButton={!eliminando}>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            ¿Seguro que deseas eliminar la categoría{' '}
            <strong>{categoriaAEliminar?.texto || categoriaAEliminar?.nombre}</strong>? Esta acción
            no se puede deshacer.
          </p>
          {errorEliminacion && (
            <Alert variant="danger" className="mt-3 mb-0">
              {errorEliminacion}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Boton
            variante="secondary"
            texto="Cancelar"
            type="button"
            onClick={cancelarEliminacion}
            disabled={eliminando}
          />
          <Boton
            variante="danger"
            texto={eliminando ? 'Eliminando...' : 'Eliminar'}
            type="button"
            onClick={confirmarEliminacion}
            disabled={eliminando}
          />
        </Modal.Footer>
      </Modal>
    </PlantillaAdministrador>
  )
}