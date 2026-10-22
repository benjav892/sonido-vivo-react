import { describe, it, expect } from 'vitest'
import { validarCorreo } from './validaciones'

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