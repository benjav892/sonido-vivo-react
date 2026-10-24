import { useState } from 'react'
import { puedeAgregarAlCarrito } from '../utils/flujoCompra'

// Hook propio: agrega un producto al carrito (localStorage) validando el stock
// y entrega el mensaje que la página muestra como toast.
export function useAgregarAlCarrito(productos) {
    const [mensajeToast, setMensajeToast] = useState('')

    function mostrarToast(mensaje) {
        setMensajeToast(mensaje)
        setTimeout(() => setMensajeToast(''), 3000)
    }

    function agregar(codigo) {
        const producto = productos.find((p) => p.codigo === codigo)
        if (!producto) return

        const carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || []
        const validacion = puedeAgregarAlCarrito(producto, 1, carrito)
        if (!validacion.valido) {
            mostrarToast(validacion.mensaje)
            return
        }

        const indice = carrito.findIndex((item) => item.codigo === codigo)
        if (indice >= 0) {
            carrito[indice].cantidad++
        } else {
            carrito.push({ ...producto, cantidad: 1 })
        }

        localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito))
        window.dispatchEvent(new Event('storage'))
        mostrarToast(`${producto.nombre} añadido al carrito.`)
    }

    return { agregar, mensajeToast }
}
