import { createContext, useState, useContext, useEffect } from 'react'
import { CLAVE_TOKEN, CLAVE_USUARIO } from '../services/api'
import { loginApi, obtenerPerfilApi } from '../services/authService'

const AuthContext = createContext(null)

function normalizarUsuario(u) {
  if (!u) return null
  return {
    ...u,
    correo: u.email ?? u.correo ?? '',
    telefono: u.numeroTelefono ?? u.telefono ?? '',
  }
}

export function AuthProvider(props) {
  const [token, setToken] = useState(() => sessionStorage.getItem(CLAVE_TOKEN))
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = sessionStorage.getItem(CLAVE_USUARIO)
      return guardado ? normalizarUsuario(JSON.parse(guardado)) : null
    } catch {
      return null
    }
  })
  const [cargandoSesion, setCargandoSesion] = useState(() => Boolean(sessionStorage.getItem(CLAVE_TOKEN)))

  // al recargar la página, valida con el backend (/v1/auth/me) que el token siga vigente.
  useEffect(() => {
    let activo = true

    async function verificarSesion() {
      const tokenActual = sessionStorage.getItem(CLAVE_TOKEN)
      if (!tokenActual) {
        if (activo) setCargandoSesion(false)
        return
      }
      try {
        const perfil = await obtenerPerfilApi()
        const normalizado = normalizarUsuario(perfil)
        if (activo) {
          setUsuario(normalizado)
          sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(normalizado))
        }
      } catch {
        sessionStorage.removeItem(CLAVE_TOKEN)
        sessionStorage.removeItem(CLAVE_USUARIO)
        if (activo) {
          setToken(null)
          setUsuario(null)
        }
      } finally {
        if (activo) setCargandoSesion(false)
      }
    }

    verificarSesion()
    return () => { activo = false }
  }, [])

  // limpia la sesion automáticamente si cualquier petición protegida recibe 401.
  useEffect(() => {
    function manejarExpiracion() {
      setToken(null)
      setUsuario(null)
    }
    window.addEventListener('sonidovivo:sesion-expirada', manejarExpiracion)
    return () => window.removeEventListener('sonidovivo:sesion-expirada', manejarExpiracion)
  }, [])

  async function iniciarSesion(credenciales) {
    const respuesta = await loginApi(credenciales)
    const normalizado = normalizarUsuario(respuesta.usuario)
    sessionStorage.setItem(CLAVE_TOKEN, respuesta.accessToken)
    sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(normalizado))
    setToken(respuesta.accessToken)
    setUsuario(normalizado)
    return normalizado
  }

  function logout() {
    sessionStorage.removeItem(CLAVE_TOKEN)
    sessionStorage.removeItem(CLAVE_USUARIO)
    setToken(null)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        cargandoSesion,
        estaAutenticado: Boolean(usuario && token),
        iniciarSesion,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return contexto
}