import { Card } from 'react-bootstrap';
import categorias from '../../data/categorias.json'
import TarjetaCategoria from '../molecules/TarjetaCategoria';
import { Container, Row, Col } from "react-bootstrap";

function CategoriaProductos(props) {
    return (
        <Card>
            <h2>Categorías</h2>
            <Row>

                {categorias.map((categoria) => (
                    <Col key={categoria.id} xs={12} md={6} lg={4}>
                        <TarjetaCategoria
                            src={categoria.src}
                            alt={categoria.alt}
                            texto={categoria.texto}
                            onClick={props.onSeleccionar ? () => props.onSeleccionar(categoria.texto) : undefined}

                        />
                    </Col>
                ))}

            </Row>
        </Card>
    )

}

export default CategoriaProductos;