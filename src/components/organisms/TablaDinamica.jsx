// src/components/organisms/TablaDinamica.jsx
import { Table } from 'react-bootstrap';

function TablaDinamica(props) {
    const columnas = props.columnas || [];
    const datos = props.datos || [];

    return (
        <Table striped bordered hover responsive className="bg-white shadow-sm">
            <thead className="table-dark">
                <tr>
                    {columnas.map((columna, index) => (
                        <th key={index} className={columna.claseEncabezado || ''}>
                            {columna.titulo}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {datos.map((fila, indexFila) => (
                    <tr key={indexFila}>
                        {columnas.map((columna, indexColumna) => (
                            <td key={indexColumna} className={`align-middle ${columna.claseCelda || ''}`}>
                                {/* Si la columna tiene una función de renderizado especial, la usamos. Si no, mostramos el texto plano. */}
                                {columna.render ? columna.render(fila) : fila[columna.llave]}
                            </td>
                        ))}
                    </tr>
                ))}
                {datos.length === 0 && (
                    <tr>
                        <td colSpan={columnas.length} className="text-center py-4">
                            No hay datos para mostrar.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default TablaDinamica;