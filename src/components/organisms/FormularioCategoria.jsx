// src/components/organisms/FormularioCategoria.jsx
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarNombre } from '../../utils/validaciones';

function FormularioCategoria(props) {
    const datosFormulario = props.datosFormulario;
    const [nombre, setNombre] = useState(datosFormulario ? datosFormulario.texto : '');
    const [errorNombre, setErrorNombre] = useState('');

    function alEnviar(e) {
        e.preventDefault();
        
        const errNom = validarNombre(nombre);
        setErrorNombre(errNom);

        if (!errNom) {
            props.onSubmit({
                ...datosFormulario,
                texto: nombre,
                src: datosFormulario?.src || '/categorias/accesorios.png',
                alt: nombre
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