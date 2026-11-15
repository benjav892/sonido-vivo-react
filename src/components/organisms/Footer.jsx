function Footer(props) {
    const ubicacion = props.ubicacion || '📍 Viña del Mar, Región de Valparaíso.';
    const horario = props.horario || '🕝 Lunes a Viernes de 9:00 a 18:00 hrs.';
    const anio = props.anio || 2026;

    return (
        <footer className={`text-center py-5 ${props.className || ''}`} style={{ backgroundColor: 'rgb(142, 96, 125)', color: 'white' }}>
            <section id="footer-info" className="mb-3">
                <p className="m-1">{ubicacion}</p>
                <p className="m-1">{horario}</p>
            </section>
            {/* texto de copyright */}
            <p className="m-0" style={{ fontSize: '0.9rem' }}>
                &copy; {anio} Sonido Vivo - Tienda de Instrumentos Musicales. Todos los derechos reservados.
            </p>
        </footer>
    );
}

export default Footer;