import { describe, it, expect } from 'vitest'
import { validarCorreo, validarContrasena } from './validaciones'


describe('validarCorreo', () => {
    it('acepta un correo @duoc.cl válido', () => {
        expect(validarCorreo('benjamin@duoc.cl')).toBe('')
    })

    it('rechaza un correo con dominio no permitido', () => {
        expect(validarCorreo('benjamin@hotmail.com')).toBe('Correo no valido')
    })

    it('rechaza un correo vacío', () => {
        expect(validarCorreo('')).toBe('Correo no valido')
    })
})

describe('validarContrasena', () => {
    it('acepta una contraseña válida', () => {
        expect(validarContrasena('1234')).toBe('')
    })

    it('rechaza una contraseña muy corta', () => {
        expect(validarContrasena('123')).toBe('Contrasena no valida')
    })

    it('rechaza una contraseña muy larga', () => {
        expect(validarContrasena('123456789123456789123456789132465789123456789123456789132456789123456789')).toBe('Contrasena no valida')
    })
})
