import Title from '../atoms/Title';

function ContenidoNosotros() {
    return (
        <div className="d-flex flex-column gap-4 mb-5">
            <article className="p-4 bg-white rounded shadow-sm" style={{ borderLeft: '6px solid rgb(142, 96, 125)' }}>
                <Title texto="1. Nuestra Pasión y Trayectoria" nivel={2} className="mb-3 fs-4" style={{ color: '#4D3D4F' }} />
                <p className="fs-5 m-0" style={{ color: '#333', lineHeight: '1.7' }}>
                    En Sonido Vivo llevamos más de 11 años siendo el punto de encuentro de la comunidad musical en Viña del Mar y la Región de Valparaíso. Nacimos con un propósito claro: ofrecer un espacio atendido por su propio dueño y músicos experimentados, donde cada persona reciba una asesoría técnica cercana.
                </p>
            </article>

            <article className="p-4 bg-white rounded shadow-sm" style={{ borderLeft: '6px solid rgb(142, 96, 125)' }}>
                <Title texto="2. Calidad y Variedad Garantizada" nivel={2} className="mb-3 fs-4" style={{ color: '#4D3D4F' }} />
                <p className="fs-5 m-0" style={{ color: '#333', lineHeight: '1.7' }}>
                    Trabajamos exclusivamente con marcas reconocidas a nivel mundial por su estándar sonoro y durabilidad, tales como Yamaha, Fender, Squier, Epiphone, Ibanez, Roland, Pearl, Marshall, Boss y Shure, entre otras.
                </p>
            </article>

            <article className="p-4 bg-white rounded shadow-sm" style={{ borderLeft: '6px solid rgb(142, 96, 125)' }}>
                <Title texto="3. Mucho más que una tienda: Taller y Cobertura Nacional" nivel={2} className="mb-3 fs-4" style={{ color: '#4D3D4F' }} />
                <p className="fs-5 m-0" style={{ color: '#333', lineHeight: '1.7' }}>
                    Entendemos el valor que tiene cada instrumento. Por ello, contamos con un servicio especializado de mantención, calibración y reparación de instrumentos de cuerda. Conectamos con músicos de todo Chile a través de nuestra plataforma online.
                </p>
            </article>
        </div>
    );
}

export default ContenidoNosotros;