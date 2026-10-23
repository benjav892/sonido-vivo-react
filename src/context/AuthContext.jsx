import { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    // Al cargar la aplicación, revisamos si el usuario ya había iniciado sesión
    useEffect(() => {
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioSonidoVivo'));
        if (usuarioGuardado) {
            setUsuario(usuarioGuardado);
        }
    }, []);

    // Función para iniciar sesión
    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
        localStorage.setItem('usuarioSonidoVivo', JSON.stringify(datosUsuario));
    };

    // Función para cerrar sesión
    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuarioSonidoVivo');
    };

    return (
        <AuthContext.Provider value={{
            usuario,
            login,
            logout,
            estaAutenticado: !!usuario
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar este contexto en cualquier vista
export function useAuth() {
    return useContext(AuthContext);
}