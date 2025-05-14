import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    // En un caso real, esto vendría de tu sistema de autenticación
    const userName = 'Diego';
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Determinar el saludo basado en la hora del día
    useEffect(() => {
        const hour = currentTime.getHours();
        let newGreeting = '';

        if (hour >= 5 && hour < 12) {
            newGreeting = '¡Buenos días';
        } else if (hour >= 12 && hour < 18) {
            newGreeting = '¡Buenas tardes';
        } else {
            newGreeting = '¡Buenas noches';
        }

        setGreeting(newGreeting);

        // Actualizar la hora cada minuto
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="min-h-[80vh] flex flex-col">
            {/* Banner de bienvenida */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 rounded-lg shadow-lg mb-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {greeting}, {userName}!
                    </h1>
                    <p className="text-xl opacity-90">
                        Bienvenido(a) al sistema de gestión universitaria
                    </p>
                </div>
            </div>

            {/* Tarjetas de acceso rápido */}
            <div className="max-w-6xl mx-auto w-full px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Accesos Rápidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tarjeta 1 */}
                    <div className="bg-white rounded-lg p-6 shadow-md transition-all hover:shadow-lg border-t-4 border-blue-500">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-blue-100 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Materias</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Gestiona tus materias, consulta horarios y calificaciones.</p>
                        <Link to="/materias" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                            Ver materias
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="bg-white rounded-lg p-6 shadow-md transition-all hover:shadow-lg border-t-4 border-green-500">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-green-100 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Profesores</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Información sobre docentes, contacto y departamentos.</p>
                        <Link to="/profesores" className="text-green-600 hover:text-green-800 font-medium inline-flex items-center">
                            Ver profesores
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="bg-white rounded-lg p-6 shadow-md transition-all hover:shadow-lg border-t-4 border-purple-500">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-purple-100 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Alumnos</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Directorio de estudiantes, compañeros de curso y grupos.</p>
                        <Link to="/alumnos" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center">
                            Ver alumnos
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sección de estadísticas */}
            <div className="max-w-6xl mx-auto w-full px-4 mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-3xl font-bold text-blue-600">12</div>
                        <div className="text-gray-600 text-sm">Materias Activas</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-3xl font-bold text-green-600">24</div>
                        <div className="text-gray-600 text-sm">Profesores</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-3xl font-bold text-purple-600">352</div>
                        <div className="text-gray-600 text-sm">Alumnos</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-3xl font-bold text-orange-600">5</div>
                        <div className="text-gray-600 text-sm">Carreras</div>
                    </div>
                </div>
            </div>

            {/* Recordatorios o anuncios */}
            <div className="max-w-6xl mx-auto w-full px-4 mt-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Próximamente: <span className="font-medium">Inscripciones para el siguiente semestre abiertas el 1 de junio</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;