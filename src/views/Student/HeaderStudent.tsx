import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();    // Función para determinar si una ruta está activa
    const isActive = (path: string) => location.pathname === path;

    // Función para alternar la visibilidad del modal de perfil
    const toggleProfileModal = () => {
        setShowProfileModal(!showProfileModal);
    };    // Función para navegar al perfil del usuario
    const goToProfile = () => {
        setShowProfileModal(false); // Cerrar el modal si está abierto
        setTimeout(() => { // Pequeño retraso para asegurar que el modal se cierre antes de navegar
            navigate('/estudiante/perfil');
        }, 100);
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        setShowProfileModal(false);
        navigate('/signin');
    };

    return (
        <header className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto w-full">
                <nav className="flex items-center justify-between">
                    {/* Logo y nombre */}
                    <div className="flex items-center flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mr-3">
                            U
                        </div>
                        <span className="font-bold text-xl text-gray-800 hidden sm:block">Universidad</span>
                    </div>

                    {/* Enlaces de navegación para pantallas medianas y grandes */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">                            <Link
                            to="/estudiante/inicio"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                                    ${isActive('/estudiante/inicio') || isActive('/estudiante')
                                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b-2 border-transparent'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Inicio
                        </Link>                            <Link
                            to="/estudiante/materias"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                                    ${isActive('/estudiante/materias')
                                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b-2 border-transparent'
                                }`}
                        >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Materias
                            </Link>                            <Link
                                to="/estudiante/calificaciones"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                                    ${isActive('/estudiante/calificaciones')
                                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b-2 border-transparent'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Calificaciones
                            </Link>
                        </div>
                    </div>

                    {/* Perfil de usuario y notificaciones */}
                    <div className="hidden md:flex items-center">
                        {/* Perfil de usuario */}
                        <div className="ml-4 relative">                            {/* Botón para abrir el modal del perfil */}
                            <div className="flex items-center">
                                <button
                                    onClick={toggleProfileModal}
                                    className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200 cursor-pointer"
                                >
                                    {user?.profileImage ? (
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={user.profileImage}
                                            alt={user.name}
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                            {user?.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                    <span className="ml-2 hidden lg:block">{user?.name.split(' ')[0]}</span>
                                    {/* Flecha desplegable integrada */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>                            {/* Modal de perfil */}
                            {showProfileModal && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200" onClick={(e) => e.stopPropagation()}>
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <div className="flex items-center">
                                            {user?.profileImage ? (
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={user.profileImage}
                                                    alt={user.name}
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                                    {user?.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                            )}
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                                <p className="text-xs text-gray-500">{user?.role}</p>
                                            </div>
                                        </div>
                                    </div>                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previene la propagación del evento
                                            goToProfile(); // Usamos la función dedicada para navegar al perfil
                                        }}
                                        className="w-full text-left block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                    >
                                        Mi Perfil
                                    </button>                                    <Link
                                        to="/configuracion"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowProfileModal(false);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Configuración
                                    </Link>
                                    <Link
                                        to="/ayuda"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowProfileModal(false);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Ayuda
                                    </Link>                                <div className="border-t border-gray-200"></div>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogout(); // Esto maneja el cierre de sesión y la navegación
                                    }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botón de menú móvil */}
                    <div className="md:hidden flex items-center space-x-2">                        {/* Perfil compacto para móvil - Abre el modal de perfil */}
                        <div className="relative">
                            <button onClick={toggleProfileModal} className="flex items-center p-1">
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                    {user?.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </button>                            {/* Modal de perfil móvil */}
                            {showProfileModal && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200" onClick={(e) => e.stopPropagation()}>
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>                                    </div>                                    <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Previene la propagación del evento
                                                goToProfile(); // Usamos la función dedicada para navegar al perfil
                                            }}
                                            className="w-full text-left block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                        >
                                        Mi Perfil
                                    </button>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogout();
                                    }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Botón de menú hamburguesa */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>

                {/* Menú móvil */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">                        <Link
                        to="/estudiante/inicio"
                        className={`block px-3 py-2 rounded-md text-base font-medium 
                                ${isActive('/estudiante/inicio') || isActive('/estudiante')
                                ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                    >
                        Inicio
                    </Link>                        <Link
                        to="/estudiante/materias"
                        className={`block px-3 py-2 rounded-md text-base font-medium 
                                ${isActive('/estudiante/materias')
                                ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                    >
                            Materias
                        </Link>                        <Link
                            to="/estudiante/calificaciones"
                            className={`block px-3 py-2 rounded-md text-base font-medium 
                                ${isActive('/estudiante/calificaciones')
                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            Calificaciones
                        </Link>
                    </div>
                </div>
            </div>            {/* Capa oscura para cerrar el modal al hacer clic fuera */}    {showProfileModal && (
                <div
                    className="fixed inset-0 z-30 bg-transparent"
                    onClick={() => {
                        // Capa transparente que cierra el modal al hacer clic
                        setShowProfileModal(false);
                    }}
                ></div>
            )}
        </header>
    );
};

export default Header;