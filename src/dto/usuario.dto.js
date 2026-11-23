export function crearUsuarioCreateDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    apellido: formulario.apellido.trim(),
    email: formulario.correo.trim().toLowerCase(),
    password: formulario.contrasena,
    numeroTelefono: formulario.numeroTelefono ? formulario.numeroTelefono.trim() : '',
    rol: formulario.rol,
  }
}

export function crearUsuarioUpdateDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    apellido: formulario.apellido.trim(),
    numeroTelefono: formulario.numeroTelefono ? formulario.numeroTelefono.trim() : '',
    rol: formulario.rol,
  }
}

export function normalizarUsuarioApi(u) {
  if (!u) return null
  return {
    ...u,
    correo: u.email ?? u.correo ?? '',
    numeroTelefono: u.numeroTelefono ?? '',
  }
}