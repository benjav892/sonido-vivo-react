import pedidosIniciales from '../data/pedidos.json';

const CLAVE_PEDIDOS = 'pedidosSonidoVivo';

// leer todos los pedidos (inyecta los datos semilla si esta vacio)
export function leerPedidos() {
    const guardado = localStorage.getItem(CLAVE_PEDIDOS);
    
    if (guardado === null) {
        localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidosIniciales));
        return pedidosIniciales;
    }
    
    return JSON.parse(guardado);
}

// actualizar el estado de un pedido (ej: de "En preparación" a "Despachado")
export function actualizarEstadoPedido(id, nuevoEstado) {
    const pedidos = leerPedidos();
    const index = pedidos.findIndex(p => p.id === id);
    
    if (index !== -1) {
        pedidos[index].estado = nuevoEstado;
        localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));
        return pedidos; // Retornamos la lista actualizada
    }
    return pedidos;
}

// eliminar un pedido (En caso de cancelacion o error)
export function eliminarPedido(id) {
    const pedidos = leerPedidos();
    const pedidosFiltrados = pedidos.filter(p => p.id !== id);
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidosFiltrados));
    return pedidosFiltrados; // Retornamos la nueva lista sin el elemento borrado
}