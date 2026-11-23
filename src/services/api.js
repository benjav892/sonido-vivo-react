import axios from 'axios'

export const CLAVE_TOKEN = 'sonidovivo_token'
export const CLAVE_USUARIO = 'sonidovivo_usuario'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
})

// Interceptor de solicitud: adjunta el JWT si existe sesión activa.
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(CLAVE_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de respuesta: si una ruta protegida devuelve 401, limpia la sesion vencida
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const esLogin = error.config?.url?.includes('/v1/auth/login')
    if (error.response?.status === 401 && !esLogin) {
      sessionStorage.removeItem(CLAVE_TOKEN)
      sessionStorage.removeItem(CLAVE_USUARIO)
      window.dispatchEvent(new Event('sonidovivo:sesion-expirada'))
    }
    return Promise.reject(error)
  }
)

// Traduce errores de axios (respuesta HTTP, timeout o sin conexion/CORS) a un texto claro
export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data
    if (datos && typeof datos.mensaje === 'string') {
      const detalles = Array.isArray(datos.detalles) && datos.detalles.length > 0
        ? ` (${datos.detalles.join(', ')})`
        : ''
      return `${datos.mensaje}${detalles}`
    }
    if (error.response.status === 401) {
      return 'Tu sesión ha expirado o las credenciales son incorrectas.'
    }
    if (error.response.status === 403) {
      return 'No tienes permisos para realizar esta acción.'
    }
    return `La API respondió con un error (${error.response.status}).`
  }
  if (error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder. Intenta nuevamente.'
  }
  return 'No fue posible contactar la API. Revisa la conexión, la dirección y CORS.'
}