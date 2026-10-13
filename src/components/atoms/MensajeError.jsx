function MensajeError(props) {
    // si no hay mensaje, renderizar un espacio vacío para que la ui no salte
    if (!props.mensaje) {
        return <span className={`d-block mt-1 ${props.className || ''}`}>&nbsp;</span>;
    }

    return (
        <span className={`text-danger fw-bold d-block mt-1 ${props.className || ''}`}>
            {props.mensaje}
        </span>
    );
}

export default MensajeError;