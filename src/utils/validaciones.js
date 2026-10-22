export function validarCorreo(correo) {
    const patronCorreoLogin = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    const LARGO_MAX_CORREO = 254;

    if (!patronCorreoLogin.test(correo.trim()) || correo.length > LARGO_MAX_CORREO) {
        return "Correo no valido";
    } else {
        return '';
    }

}

export function validarContrasena(contrasena) {
    const LARGO_MIN_CONTRASENA = 4;
    const LARGO_MAX_CONTRASENA = 64;

    if (contrasena.length > LARGO_MAX_CONTRASENA || contrasena.length < LARGO_MIN_CONTRASENA) {
        return "Contrasena no valida";
    } else {
        return '';
    }
}

export function validarNombre(nombre) {
    if (nombre.trim() == '') {
        return "Nombre no valido";
    }
    return '';
}

export function validarConfirmarContrasena(contrasena, confirmar) {
    if (!confirmar || contrasena !== confirmar) {
        return "Las contrasenas no coinciden";
    }
    return '';
}

export function validarRol(rol) {
    if (rol === '') {
        return "Debe seleccionar un rol"
    }
    return ''
}


// --- Validaciones para el Formulario de Productos ---
export function validarNombreProducto(nombre) {
    if (!nombre || nombre.trim() === '') {
        return 'El nombre del producto es obligatorio';
    }
    return '';
}

export function validarCodigo(codigo) {
    if (!codigo || codigo.trim() === '') {
        return 'El código del producto es obligatorio';
    }
    return '';
}

export function validarCategoria(categoria) {
    if (!categoria || categoria.trim() === '') {
        return 'Debes seleccionar una categoría';
    }
    return '';
}

export function validarPrecio(precio) {
    if (precio === '' || precio === null || precio === undefined) {
        return 'El precio es obligatorio';
    }
    if (Number(precio) < 0) {
        return 'El precio no puede ser negativo';
    }
    return '';
}

export function validarStock(stock) {
    if (stock === '' || stock === null || stock === undefined) {
        return 'El stock actual es obligatorio';
    }
    if (Number(stock) < 0) {
        return 'El stock no puede ser negativo';
    }
    return '';
}

export function validarDescripcion(descripcion) {
    if (!descripcion || descripcion.trim() === '') {
        return 'La descripción es obligatoria';
    }
    return '';
}