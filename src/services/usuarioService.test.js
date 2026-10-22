import { describe, it, expect, beforeEach } from 'vitest'
import { listarUsuarios, crearUsuario } from './usuarioService'

describe('usuarioService', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('crea un usuario y lo deja guardado', () => {
        const antes = listarUsuarios().length

        crearUsuario({ nombre: 'Prueba', correo: 'prueba@duoc.cl', contrasena: '1234', rol: 'Cliente' })

        expect(listarUsuarios().length).toBe(antes + 1)
    })
})