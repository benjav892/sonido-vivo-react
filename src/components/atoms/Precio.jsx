function Precio(props) {
    // formatea el valor numérico a moneda chilena
    const precioCLP = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(props.valor);

    return (
        <span className={props.className}>
            {precioCLP}
        </span>
    );
}

export default Precio;