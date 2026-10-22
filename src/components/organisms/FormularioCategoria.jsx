import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarNombreCategoria } from '../../utils/validacionesCategorias';
import { useCategorias } from '../../context/CategoriaContext';

function FormularioCategoria(props) {
    const datosFormulario = props.datosFormulario || props.datosIniciales;
    const { categorias } = useCategorias();

    const [nombre, setNombre] = useState('');
    const [errorNombre, setErrorNombre] = useState('');

    useEffect(() => {
        if (datosFormulario) {
            setNombre(datosFormulario.texto || '');
        }
    }, [datosFormulario]);

    function alEnviar(e) {
        e.preventDefault();
        
        // Se valida contra la lista de categorías existentes pasando el ID si es edición
        const errNom = validarNombreCategoria(nombre, categorias, datosFormulario?.id);
        setErrorNombre(errNom);

        if (!errNom) {
            props.onSubmit({
                ...datosFormulario,
                texto: nombre.trim(),
                src: datosFormulario?.src || '/categorias/accesorios.png',
                alt: nombre.trim()
            });
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

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Boton 
                    texto="Cancelar" 
                    variante="secondary" 
                    type="button"
                    onClick={props.onCancelar} 
                />
                <Boton 
                    texto={datosFormulario ? "Actualizar Categoría" : "Crear Categoría"} 
                    type="submit" 
                    variante="primary" 
                />
            </div>
        </Form>
    );
}

export default FormularioCategoria;