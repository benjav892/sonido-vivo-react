// src/components/organisms/FormularioProducto.jsx
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CampoInput from '../molecules/CampoInput';
import CampoSelector from '../molecules/CampoSelector';
import CampoTextArea from '../molecules/CampoTextArea';
import Boton from '../atoms/Boton';

import categoriasJson from '../../data/categorias.json'; 
import {
    validarNombreProducto,
    validarCodigo,
    validarCategoria,
    validarPrecio,
    validarStock,
    validarDescripcion
} from '../../utils/validaciones';

function FormularioProducto({ onSubmit, onCancelar }) {
    // Estados para los campos
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Estados para los errores
    const [errorNombre, setErrorNombre] = useState('');
    const [errorCodigo, setErrorCodigo] = useState('');
    const [errorCategoria, setErrorCategoria] = useState('');
    const [errorPrecio, setErrorPrecio] = useState('');
    const [errorStock, setErrorStock] = useState('');
    const [errorDescripcion, setErrorDescripcion] = useState('');

    const listaCategorias = categoriasJson.map(cat => cat.texto);

    function alEnviar(evento) {
        evento.preventDefault();

        // Ejecutamos validaciones
        const mensajeNombre = validarNombreProducto(nombre);
        const mensajeCodigo = validarCodigo(codigo);
        const mensajeCategoria = validarCategoria(categoria);
        const mensajePrecio = validarPrecio(precio);
        const mensajeStock = validarStock(stock);
        const mensajeDescripcion = validarDescripcion(descripcion);

        // Guardamos errores en el estado
        setErrorNombre(mensajeNombre);
        setErrorCodigo(mensajeCodigo);
        setErrorCategoria(mensajeCategoria);
        setErrorPrecio(mensajePrecio);
        setErrorStock(mensajeStock);
        setErrorDescripcion(mensajeDescripcion);

        // Si todos están limpios, enviamos el producto formateado a la página
        if (
            mensajeNombre === '' &&
            mensajeCodigo === '' &&
            mensajeCategoria === '' &&
            mensajePrecio === '' &&
            mensajeStock === '' &&
            mensajeDescripcion === ''
        ) {
            onSubmit({
                nombre,
                codigo,
                categoria,
                imagen: imagen.trim() || '/img/placeholder.png', // Imagen por defecto si viene vacía
                precio: Number(precio),
                stock: Number(stock),
                stockMinimo: stockMinimo !== '' ? Number(stockMinimo) : 0,
                descripcion
            });
        }
    }

    return (
        <Form noValidate onSubmit={alEnviar} className="bg-white p-4 shadow-sm rounded border-0">
            <Row>
                <Col md="8">
                    <CampoInput 
                        etiqueta="Nombre del producto *"
                        valor={nombre}
                        onChange={(e) => setNombre(e.target.value)} 
                        placeholder="Ej: Guitarra Eléctrica Stratocaster"
                        error={errorNombre}
                    />
                </Col>
                <Col md="4">
                    <CampoInput 
                        etiqueta="Código *"
                        valor={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        placeholder="Ej: GE010"
                        error={errorCodigo}
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
                        error={errorCategoria}
                    />
                </Col>
                <Col md="6">
                    <CampoInput 
                        tipo="url"
                        etiqueta="URL de la Imagen (Opcional)"
                        valor={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        placeholder="https://ejemplo.com/imagen.png"
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
                        error={errorPrecio}
                    />
                </Col>
                <Col md="4">
                    <CampoInput 
                        tipo="number"
                        etiqueta="Stock Actual *"
                        valor={stock}
                        onChange={(e) => setStock(e.target.value)}
                        error={errorStock}
                    />
                </Col>
                <Col md="4">
                    <CampoInput 
                        tipo="number"
                        etiqueta="Stock Crítico (Opcional)"
                        valor={stockMinimo}
                        onChange={(e) => setStockMinimo(e.target.value)}
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
                error={errorDescripcion}
            />

            <div className="d-flex justify-content-end border-top pt-3 mt-3">
                <Boton variante="secondary" texto="Cancelar" type="button" className="me-2" onClick={onCancelar} />
                <Boton variante="primary" texto="Guardar Producto" type="submit" />
            </div>
        </Form>
    );
}

export default FormularioProducto;