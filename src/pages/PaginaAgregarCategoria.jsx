import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useCategorias } from '../context/CategoriaContext'
import { crearCategoriaRequestDto } from '../dto/categoria.dto'
import { obtenerMensajeError } from '../services/api'
import { useTituloPagina } from '../hooks/useTituloPagina'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import FormularioCategoria from '../components/organisms/FormularioCategoria'

export function PaginaAgregarCategoria() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { crear, actualizar, obtenerPorId } = useCategorias()

  const [categoriaAEditar, setCategoriaAEditar] = useState(null)
  const [cargandoDetalle, setCargandoDetalle] = useState(Boolean(id))
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const titulo = id ? 'Editar Categoría' : 'Añadir Nueva Categoría'
  useTituloPagina(titulo)

  useEffect(() => {
    if (!id) {
      setCategoriaAEditar(null)
      setCargandoDetalle(false)
      return
    }

    let activo = true
    async function cargarCategoria() {
      setCargandoDetalle(true)
      setError('')
      try {
        const encontrada = await obtenerPorId(Number(id))
        if (activo) setCategoriaAEditar(encontrada)
      } catch (err) {
        if (activo) setError(obtenerMensajeError(err))
      } finally {
        if (activo) setCargandoDetalle(false)
      }
    }

    cargarCategoria()
    return () => { activo = false }
  }, [id, obtenerPorId])

  async function manejarEnvioExitoso(datosCategoria) {
    setGuardando(true)
    setError('')
    try {
      const dto = crearCategoriaRequestDto(datosCategoria)
      if (id) {
        await actualizar(Number(id), dto)
      } else {
        await crear(dto)
      }
      navigate('/admin/categorias')
    } catch (err) {
      setError(obtenerMensajeError(err))
    } finally {
      setGuardando(false)
    }
  }

  function manejarCancelar() {
    navigate('/admin/categorias')
  }

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion
        titulo={titulo}
        textoBoton="← Volver a Categorías"
        varianteBoton="outline-secondary"
        onClickBoton={manejarCancelar}
      />

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <div className="bg-white p-4 shadow-sm rounded border">
        {cargandoDetalle ? (
          <p role="status" className="mb-0">
            Cargando información de la categoría...
          </p>
        ) : (
          <FormularioCategoria
            datosFormulario={categoriaAEditar}
            onSubmit={manejarEnvioExitoso}
            onCancelar={manejarCancelar}
            cargando={guardando}
          />
        )}
      </div>
    </PlantillaAdministrador>
  )
}

export default PaginaAgregarCategoria