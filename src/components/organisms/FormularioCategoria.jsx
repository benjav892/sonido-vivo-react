import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarNombreCategoria } from '../../utils/validacionesCategorias'
import { useCategorias } from '../../context/CategoriaContext'

function FormularioCategoria(props) {
  const datosFormulario = props.datosFormulario || props.datosIniciales
  const { categorias } = useCategorias()

  const [nombre, setNombre] = useState('')
  const [imagen, setImagen] = useState('')
  const [errorNombre, setErrorNombre] = useState('')

  useEffect(() => {
    if (datosFormulario) {
      setNombre(datosFormulario.texto || datosFormulario.nombre || '')
      setImagen(datosFormulario.src || datosFormulario.imagen || '')
    }
  }, [datosFormulario])

  function alEnviar(e) {
    e.preventDefault()

    const errNom = validarNombreCategoria(nombre, categorias, datosFormulario?.id)
    setErrorNombre(errNom)

    if (!errNom) {
      const imagenLimpia = imagen.trim() || datosFormulario?.src || '/categorias/accesorios.png'
      props.onSubmit({
        ...datosFormulario,
        texto: nombre.trim(),
        src: imagenLimpia,
        alt: nombre.trim(),
      })
    }
  }

  return (
    <Form onSubmit={alEnviar} noValidate className="w-100">
      <CampoFormulario
        etiqueta="Nombre de la Categoría:"
        id="nombre"
        tipo="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        error={errorNombre}
        requerido={true}
      />

      <CampoFormulario
        etiqueta="Ruta de imagen (opcional):"
        id="imagen-categoria"
        tipo="text"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        error=""
        requerido={false}
      />

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Boton
          texto="Cancelar"
          variante="secondary"
          type="button"
          onClick={props.onCancelar}
          disabled={props.cargando}
        />
        <Boton
          texto={
            props.cargando
              ? 'Guardando...'
              : datosFormulario
                ? 'Actualizar Categoría'
                : 'Crear Categoría'
          }
          type="submit"
          variante="primary"
          disabled={props.cargando}
        />
      </div>
    </Form>
  )
}

export default FormularioCategoria