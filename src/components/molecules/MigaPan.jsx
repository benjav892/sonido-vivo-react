import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MigaPan(props) {
    const enlaces = props.enlaces || [];
    const actual = props.actual;

    return (
        <Breadcrumb className="mt-3 mb-4 fw-bold" style={{ fontSize: '0.95rem' }}>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }} style={{ color: 'rgb(142, 96, 125)' }}>
                Home
            </Breadcrumb.Item>
            {enlaces.map((enlace, index) => (
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: enlace.ruta }} key={index} style={{ color: 'rgb(142, 96, 125)' }}>
                    {enlace.texto}
                </Breadcrumb.Item>
            ))}
            <Breadcrumb.Item active>{actual}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default MigaPan;