// src/components/organisms/FormularioProducto.jsx
import { useState, useEffect } from 'react';
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

export function FormularioProducto(props) {
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [errores, setErrores] = useState({});

    const listaCategorias = categoriasJson.map((cat) => cat.texto);

    useEffect(() => {
        if (props.datosIniciales) {
            setNombre(props.datosIniciales.nombre || '');
            setCodigo(props.datosIniciales.codigo || '');
            setCategoria(props.datosIniciales.categoria || '');
            setImagen(props.datosIniciales.imagen || '');
            setPrecio(props.datosIniciales.precio ?? '');
            setStock(props.datosIniciales.stock ?? '');
            setStockMinimo(props.datosIniciales.stockMinimo ?? '');
            setDescripcion(props.datosIniciales.descripcion || '');
        }
    }, [props.datosIniciales]);

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            nombre: validarNombreProducto(nombre),
            codigo: validarCodigo(codigo),
            categoria: validarCategoria(categoria),
            precio: validarPrecio(precio),
            stock: validarStock(stock),
            descripcion: validarDescripcion(descripcion)
        };

        setErrores(nuevosErrores);

        const todoValido = Object.values(nuevosErrores).every((error) => error === '');

        if (todoValido) {
            props.onSubmit({
                nombre,
                codigo,
                categoria,
                imagen: imagen.trim() || '/img/placeholder.png',
                precio: Number(precio),
                stock: Number(stock),
                stockMinimo: stockMinimo !== '' ? Number(stockMinimo) : 0,
                descripcion
            });
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
                />
                <Boton 
                    variante="primary" 
                    texto={props.datosIniciales ? "Actualizar Producto" : "Guardar Producto"} 
                    type="submit" 
                />
            </div>
        </Form>
    );
}