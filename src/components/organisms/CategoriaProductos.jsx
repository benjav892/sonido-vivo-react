import { Card } from 'react-bootstrap';
import categorias from '../../data/categorias.json'
import TarjetaCategoria from '../molecules/TarjetaCategoria';


function CategoriaProductos() {
    return (
        <Card>
            <h2>Categorías</h2>
            {categorias.map((categoria) => (
                <TarjetaCategoria
                    key={categoria.id}
                    src={categoria.src}
                    alt={categoria.alt}
                    texto={categoria.texto}

                />
            ))}
        </Card>
    )

}

export default CategoriaProductos;