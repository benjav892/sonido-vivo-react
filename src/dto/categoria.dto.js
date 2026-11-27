export function crearCategoriaRequestDto(formulario) {
  const nombre = String(formulario.nombre ?? formulario.texto ?? '').trim()
  const imagen = String(formulario.imagen ?? formulario.src ?? '').trim() || '/img/placeholder.png'
  const textoAlternativo =
    String(formulario.textoAlternativo ?? formulario.alt ?? '').trim() || nombre

  return {
    nombre,
    imagen,
    textoAlternativo,
  }
}

export function normalizarCategoriaApi(c) {
  if (!c) return null
  return {
    ...c,
    texto: c.nombre ?? '',
    src: c.imagen || '/img/placeholder.png',
    alt: c.textoAlternativo || c.nombre || '',
  }
}