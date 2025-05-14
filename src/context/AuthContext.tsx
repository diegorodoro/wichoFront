import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Definición del tipo para el usuario
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string | null;
}

// Definición del tipo para el contexto de autenticación
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}

// Creación del contexto con un valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// Propiedades para el AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
    // En un caso real, verificaríamos localStorage/sessionStorage al inicializar
    // para recuperar una sesión existente
    const [user, setUser] = useState<User | null>({
        id: '1',
        name: 'Diego Ramírez',
        email: 'diego@universidad.edu',
        role: 'Estudiante',
        profileImage: null,
    });

    const isAuthenticated = !!user;

    const login = (userData: User) => {
        setUser(userData);
        // En un caso real, guardaríamos el token en localStorage/sessionStorage
        // localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setUser(null);
        // En un caso real, eliminaríamos el token del localStorage/sessionStorage
        // localStorage.removeItem('authToken');
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...data });
        }
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
