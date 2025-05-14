import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const Main: React.FC = () => {
    const { user } = useAuth();
    const [currentSemester, setCurrentSemester] = useState("2025-1");
    const [enrolledCourses, setEnrolledCourses] = useState([
        {
            id: 1,
            code: "MAT101",
            name: "Cálculo Diferencial",
            schedule: "Lun, Mie 10:00-12:00",
            professor: "Dr. Juan García",
            credits: 6
        },
        {
            id: 2,
            code: "FIS102",
            name: "Física Básica",
            schedule: "Mar, Jue 08:00-10:00",
            professor: "Dra. María López",
            credits: 5
        },
        {
            id: 3,
            code: "PROG103",
            name: "Programación Orientada a Objetos",
            schedule: "Lun, Vie 14:00-16:00",
            professor: "Dr. Roberto Sánchez",
            credits: 4
        }
    ]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Encabezado con estilo azul */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Bienvenido, {user?.name}</h1>
                        <p className="text-blue-100">Panel de estudiante - Semestre actual: {currentSemester}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="font-medium">{enrolledCourses.length} materias inscritas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de estadísticas */}
            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-blue-500">
                        <div className="text-3xl font-bold text-blue-600">15</div>
                        <div className="text-gray-600 text-sm">Créditos este semestre</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-green-500">
                        <div className="text-3xl font-bold text-green-600">8.7</div>
                        <div className="text-gray-600 text-sm">Promedio general</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-purple-500">
                        <div className="text-3xl font-bold text-purple-600">3</div>
                        <div className="text-gray-600 text-sm">Semestre actual</div>
                    </div>
                </div>
            </div>

            {/* Materias inscritas */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500 mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        Materias inscritas en este semestre
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesor</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {enrolledCourses.map(course => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.schedule}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.professor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Próximos eventos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-yellow-500">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        Próximos eventos
                    </h2>
                </div>
                <div className="p-6">
                    <div className="mb-4 border-l-4 border-yellow-400 pl-4 py-2">
                        <p className="text-sm text-yellow-600 font-semibold">Mayo 15, 2025</p>
                        <p className="font-medium">Examen parcial de Cálculo Diferencial</p>
                    </div>
                    <div className="mb-4 border-l-4 border-yellow-400 pl-4 py-2">
                        <p className="text-sm text-yellow-600 font-semibold">Mayo 17, 2025</p>
                        <p className="font-medium">Entrega de proyecto de Programación</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4 py-2">
                        <p className="text-sm text-yellow-600 font-semibold">Mayo 20, 2025</p>
                        <p className="font-medium">Examen parcial de Física Básica</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
