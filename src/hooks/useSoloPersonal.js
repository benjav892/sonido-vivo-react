import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLES_PERMITIDOS = ['Administrador', 'Vendedor', 'Empleado']

export function useSoloPersonal() {
    const { usuario } = useAuth()
    const navigate = useNavigate()
    const autorizado = !!usuario && ROLES_PERMITIDOS.includes(usuario.rol)

    useEffect(() => {
        if (!autorizado) {
            navigate('/login')
        }
    }, [autorizado, navigate])

    return autorizado
}
