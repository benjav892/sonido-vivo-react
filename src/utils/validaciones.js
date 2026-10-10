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
        return "Contrasena no valida"
    } else {
        return '';
    }
}