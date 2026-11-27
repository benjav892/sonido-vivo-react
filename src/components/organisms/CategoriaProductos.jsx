import { Alert, Card, Row, Col } from 'react-bootstrap'
import TarjetaCategoria from '../molecules/TarjetaCategoria'
import Boton from '../atoms/Boton'
import { useCategorias } from '../../context/CategoriaContext'

function CategoriaProductos(props) {
  const { categorias, cargando, error, recargar } = useCategorias()

  return (
    <Card className="p-3">
      <h2 className="mb-3">Categorías</h2>

      {error && (
        <Alert variant="danger">
          {error}
          <div className="mt-2">
            <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
          </div>
        </Alert>
      )}

      {cargando ? (
        <p className="text-center py-4 mb-0" role="status">
          Cargando categorías...
        </p>
      ) : (
        <Row>
          {categorias.map((categoria) => (
            <Col key={categoria.id} xs={12} md={6} lg={4}>
              <TarjetaCategoria
                src={categoria.src || categoria.imagen}
                alt={categoria.alt || categoria.textoAlternativo || categoria.nombre}
                texto={categoria.texto || categoria.nombre}
                onClick={
                  props.onSeleccionar
                    ? () => props.onSeleccionar(categoria.texto || categoria.nombre)
                    : undefined
                }
              />
            </Col>
          ))}
        </Row>
      )}
    </Card>
  )
}

export default CategoriaProductos