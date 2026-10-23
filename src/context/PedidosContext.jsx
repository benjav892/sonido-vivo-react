import { createContext, useState, useContext, useEffect } from 'react';
import { leerPedidos, actualizarEstadoPedido, eliminarPedido } from '../services/pedidoService';

const PedidosContext = createContext();

export function PedidosProvider({ children }) {
    const [pedidos, setPedidos] = useState([]);

    // cargar los pedidos al iniciar la app
    useEffect(() => {
        setPedidos(leerPedidos());
    }, []);

    // funciones que actualizan el estado global y el localStorage a la vez
    const agregarPedido = (nuevoPedido) => {
        const actualizados = [...pedidos, nuevoPedido];
        setPedidos(actualizados);
        localStorage.setItem('pedidosSonidoVivo', JSON.stringify(actualizados));
    };

    const cambiarEstado = (id, nuevoEstado) => {
        const actualizados = actualizarEstadoPedido(id, nuevoEstado);
        setPedidos([...actualizados]);
    };

    const borrarPedido = (id) => {
        const restantes = eliminarPedido(id);
        setPedidos([...restantes]);
    };

    return (
        <PedidosContext.Provider value={{ 
            pedidos, 
            agregarPedido, 
            cambiarEstado, 
            borrarPedido 
        }}>
            {children}
        </PedidosContext.Provider>
    );
}

export function usePedidos() {
    return useContext(PedidosContext);
}