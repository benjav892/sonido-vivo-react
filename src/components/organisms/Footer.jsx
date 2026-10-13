function Footer() {
    return (
        <footer className="text-center py-5" style={{ backgroundColor: 'rgb(142, 96, 125)', color: 'white' }}>
            <section id="footer-info" className="mb-3">
                <p className="m-1">📍 Viña del Mar, Región de Valparaíso.</p>
                <p className="m-1">🕝 Lunes a Viernes de 9:00 a 18:00 hrs.</p>
            </section>
            {/* texto de copyright */}
            <p className="m-0" style={{ fontSize: '0.9rem' }}>
                &copy; 2026 Sonido Vivo - Tienda de Instrumentos Musicales. Todos los derechos reservados.
            </p>
        </footer>
    );
}

export default Footer;