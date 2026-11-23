import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLES_PERMITIDOS = ['Administrador', 'Vendedor']

export function useSoloPersonal() {
  const { usuario, estaAutenticado, cargandoSesion } = useAuth()
  const navigate = useNavigate()
  const autorizado = estaAutenticado && ROLES_PERMITIDOS.includes(usuario?.rol)

  useEffect(() => {
    if (!cargandoSesion && !autorizado) {
      navigate('/login', { replace: true })
    }
  }, [cargandoSesion, autorizado, navigate])

  return autorizado
}