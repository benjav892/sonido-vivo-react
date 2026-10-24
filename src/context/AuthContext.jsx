import { createContext, useState, useContext } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('usuarioSonidoVivo'))
        } catch {
            return null
        }
    });

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