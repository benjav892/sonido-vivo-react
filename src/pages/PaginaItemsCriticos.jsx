import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import TablaDinamica from '../components/organisms/TablaDinamica'
import Boton from '../components/atoms/Boton'
import { useProductos } from '../context/ProductoContext'
import { useSoloPersonal } from '../hooks/useSoloPersonal'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Productos con poco stock: stock igual o menor al stock mínimo.
function PaginaItemsCriticos() {
  const autorizado = useSoloPersonal()
  const navigate = useNavigate()
  const { productos, cargando, error, recargar } = useProductos()
  useTituloPagina('Ítems críticos')

  if (!autorizado) return null

  const criticos = productos.filter((p) => p.stock <= (p.stockMinimo || 0))

  const columnas = [
    { titulo: 'Código', llave: 'codigo' },
    { titulo: 'Producto', llave: 'nombre' },
    { titulo: 'Categoría', llave: 'categoria' },
    { titulo: 'Stock', llave: 'stock' },
    { titulo: 'Mínimo', llave: 'stockMinimo' },
    {
      titulo: 'Estado',
      render: (p) => (
        <span className={`badge ${p.stock === 0 ? 'bg-danger' : 'bg-warning text-dark'}`}>
          {p.stock === 0 ? 'Sin stock' : 'Crítico'}
        </span>
      ),
    },
    {
      titulo: 'Acciones',
      render: (p) => (
        <Boton
          variante="warning"
          texto="Reponer / Editar"
          onClick={() => navigate(`/admin/inventario/editar/${p.id}`)}
        />
      ),
    },
  ]

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion titulo="Ítems Críticos" />
      <p className="text-muted">Productos cuyo stock es igual o menor al stock mínimo definido.</p>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
          <div className="mt-2">
            <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
          </div>
        </Alert>
      )}

      {cargando ? (
        <div className="text-center py-4" role="status">
          Cargando ítems críticos desde el servidor...
        </div>
      ) : (
        <TablaDinamica columnas={columnas} datos={criticos} />
      )}
    </PlantillaAdministrador>
  )
}

export default PaginaItemsCriticos