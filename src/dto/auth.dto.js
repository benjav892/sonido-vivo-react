export function crearLoginRequestDto(formulario) {
  return {
    email: formulario.correo.trim().toLowerCase(),
    password: formulario.contrasena,
  }
}

export function crearRegistroRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    apellido: formulario.apellido.trim(),
    email: formulario.correo.trim().toLowerCase(),
    password: formulario.contrasena,
    numeroTelefono: formulario.numeroTelefono ? formulario.numeroTelefono.trim() : '',
  }
}