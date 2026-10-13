// validacion 1: evitar agregar productos sin stock o superar el stock disponible
export function puedeAgregarAlCarrito(producto, cantidadAAgregar, carritoActual) {
    if (producto.stock === 0) {
        return { valido: false, mensaje: "Este producto se encuentra sin stock." };
    }

    const itemEnCarrito = carritoActual.find(item => item.codigo === producto.codigo);
    const cantidadYaEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if ((cantidadYaEnCarrito + cantidadAAgregar) > producto.stock) {
        return { 
            valido: false, 
            mensaje: `Stock insuficiente. Solo quedan ${producto.stock} unidades y ya tiene ${cantidadYaEnCarrito} en el carrito.` 
        };
    }

    return { valido: true, mensaje: "" };
}

// validacion 2: bajar el stock al confirmar el pedido
export function procesarConfirmacionPedido(carrito, productosGlobales, actualizarProducto) {
    // Verificamos que todo el carrito siga teniendo stock justo antes de pagar
    for (const item of carrito) {
        const productoActualizado = productosGlobales.find(p => p.codigo === item.codigo);
        if (!productoActualizado || productoActualizado.stock < item.cantidad) {
            return { 
                exito: false, 
                mensaje: `El producto ${item.nombre} ya no tiene stock suficiente. Por favor, ajusta tu carrito.` 
            };
        }
    }

    // si todo está bien, se reduce el stock global
    carrito.forEach(item => {
        const productoActualizado = productosGlobales.find(p => p.codigo === item.codigo);
        const nuevoStock = productoActualizado.stock - item.cantidad;
        actualizarProducto(productoActualizado.id, { stock: nuevoStock });
    });

    // vaciar el carrito local
    localStorage.removeItem('carritoSonidoVivo');
    window.dispatchEvent(new Event('storage'));

    return { exito: true, mensaje: "Pedido procesado correctamente." };
}