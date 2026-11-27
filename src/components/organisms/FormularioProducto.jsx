import { useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import CampoInput from '../molecules/CampoInput'
import CampoSelector from '../molecules/CampoSelector'
import CampoTextArea from '../molecules/CampoTextArea'
import Boton from '../atoms/Boton'
import { useCategorias } from '../../context/CategoriaContext'
import { crearProductoRequestDto } from '../../dto/producto.dto'
import {
  validarNombreProducto,
  validarCodigo,
  validarCategoria,
  validarPrecio,
  validarStock,
  validarDescripcion,
} from '../../utils/validaciones'

export function FormularioProducto(props) {
  const { categorias } = useCategorias()

  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [imagen, setImagen] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [stockMinimo, setStockMinimo] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [errores, setErrores] = useState({})

  const listaCategorias = categorias.map((cat) => cat.nombre || cat.texto)

  useEffect(() => {
    if (props.datosIniciales) {
      setNombre(props.datosIniciales.nombre || '')
      setCodigo(props.datosIniciales.codigo || '')
      setMarca(props.datosIniciales.marca || '')
      setModelo(props.datosIniciales.modelo || '')
      setCategoria(props.datosIniciales.categoria || props.datosIniciales.categoriaNombre || '')
      setImagen(props.datosIniciales.imagen || '')
      setPrecio(props.datosIniciales.precio ?? props.datosIniciales.precioClp ?? '')
      setStock(props.datosIniciales.stock ?? '')
      setStockMinimo(props.datosIniciales.stockMinimo ?? '')
      setDescripcion(props.datosIniciales.descripcion || props.datosIniciales.descripcionBreve || '')
    }
  }, [props.datosIniciales])

  function manejarEnvio(evento) {
    evento.preventDefault()

    const catSeleccionada = categorias.find((c) => (c.nombre || c.texto) === categoria)

    const nuevosErrores = {
      nombre: validarNombreProducto(nombre),
      codigo: validarCodigo(codigo),
      marca: marca.trim() ? '' : 'La marca es obligatoria',
      modelo: modelo.trim() ? '' : 'El modelo es obligatorio',
      categoria: validarCategoria(categoria) || (!catSeleccionada ? 'Selecciona una categoría válida' : ''),
      precio: validarPrecio(precio),
      stock: validarStock(stock),
      stockMinimo:
        stockMinimo !== '' && Number(stockMinimo) < 0 ? 'El stock crítico no puede ser negativo' : '',
      descripcion: validarDescripcion(descripcion),
    }

    setErrores(nuevosErrores)

    const todoValido = Object.values(nuevosErrores).every((error) => error === '')

    if (todoValido) {
      const dto = crearProductoRequestDto({
        nombre,
        codigo,
        marca,
        modelo,
        categoriaId: catSeleccionada.id,
        imagen: imagen.trim() || '/img/placeholder.png',
        precioClp: Number(precio),
        stock: Number(stock),
        stockMinimo: stockMinimo !== '' ? Number(stockMinimo) : 0,
        descripcionBreve: descripcion,
      })
      props.onSubmit(dto)
    }
  }

  return (
    <Form noValidate onSubmit={manejarEnvio} className="bg-white p-4 shadow-sm rounded border-0">
      <Row>
        <Col md="8">
          <CampoInput
            etiqueta="Nombre del producto *"
            valor={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Guitarra Eléctrica Stratocaster"
            error={errores.nombre}
          />
        </Col>
        <Col md="4">
          <CampoInput
            etiqueta="Código *"
            valor={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej: GE010"
            error={errores.codigo}
          />
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <CampoInput
            etiqueta="Marca *"
            valor={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ej: Yamaha, Fender, Squier"
            error={errores.marca}
          />
        </Col>
        <Col md="6">
          <CampoInput
            etiqueta="Modelo *"
            valor={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Ej: Affinity Strat"
            error={errores.modelo}
          />
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <CampoSelector
            id="categoria"
            etiqueta="Categoría *"
            value={categoria}
            opciones={listaCategorias}
            onChange={(e) => setCategoria(e.target.value)}
            error={errores.categoria}
          />
        </Col>
        <Col md="6">
          <CampoInput
            tipo="text"
            etiqueta="Ruta de imagen (Opcional)"
            valor={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="/img/placeholder.png"
          />
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <CampoInput
            tipo="number"
            etiqueta="Precio (CLP) *"
            valor={precio}
            onChange={(e) => setPrecio(e.target.value)}
            error={errores.precio}
          />
        </Col>
        <Col md="4">
          <CampoInput
            tipo="number"
            etiqueta="Stock Actual *"
            valor={stock}
            onChange={(e) => setStock(e.target.value)}
            error={errores.stock}
          />
        </Col>
        <Col md="4">
          <CampoInput
            tipo="number"
            etiqueta="Stock Crítico (Opcional)"
            valor={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
            error={errores.stockMinimo}
          />
        </Col>
      </Row>

      <CampoTextArea
        id="descripcion"
        etiqueta="Descripción breve *"
        valor={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={3}
        placeholder="Escribe los detalles del producto aquí..."
        error={errores.descripcion}
      />

      <div className="d-flex justify-content-end border-top pt-3 mt-3">
        <Boton
          variante="secondary"
          texto="Cancelar"
          type="button"
          className="me-2"
          onClick={props.onCancelar}
          disabled={props.cargando}
        />
        <Boton
          variante="primary"
          texto={
            props.cargando
              ? 'Guardando...'
              : props.datosIniciales
                ? 'Actualizar Producto'
                : 'Guardar Producto'
          }
          type="submit"
          disabled={props.cargando}
        />
      </div>
    </Form>
  )
}