import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Función para determinar si una ruta está activa
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto">
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
                        <div className="ml-10 flex items-center space-x-4">
                            <Link
                                to="/inicio"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                                    ${isActive('/inicio')
                                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b-2 border-transparent'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Inicio
                            </Link>

                            <Link
                                to="/materias"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                                    ${isActive('/materias')
                                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b-2 border-transparent'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Materias
                            </Link>

                            <Link
                                to="/alumnos"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                                    ${isActive('/alumnos')
                                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b-2 border-transparent'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Alumnos
                            </Link>

                            <Link
                                to="/profesores"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                                    ${isActive('/profesores')
                                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b-2 border-transparent'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profesores
                            </Link>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="hidden md:flex items-center">
                        <div className="flex-shrink-0 ml-4">
                            <Link to="/signin" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                                Iniciar Sesión
                            </Link>
                        </div>

                        <div className="ml-3 relative">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Botón de menú móvil */}
                    <div className="md:hidden flex items-center">
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
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/inicio"
                            className={`block px-3 py-2 rounded-md text-base font-medium 
                                ${isActive('/inicio')
                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            Inicio
                        </Link>

                        <Link
                            to="/materias"
                            className={`block px-3 py-2 rounded-md text-base font-medium 
                                ${isActive('/materias')
                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            Materias
                        </Link>

                        <Link
                            to="/alumnos"
                            className={`block px-3 py-2 rounded-md text-base font-medium 
                                ${isActive('/alumnos')
                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            Alumnos
                        </Link>

                        <Link
                            to="/profesores"
                            className={`block px-3 py-2 rounded-md text-base font-medium 
                                ${isActive('/profesores')
                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            Profesores
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-5">
                            <div className="ml-3">
                                <div className="text-sm font-medium text-gray-700">Acciones</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                                Iniciar Sesión
                            </Link>
                            <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;