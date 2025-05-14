import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

// Interfaces basadas en el esquema de la base de datos
// Sólo incluimos las interfaces que estamos utilizando directamente
interface Estudiante {
    estudiante_id: number;
    usuario_id: number;
    matricula: string;
    carrera?: string;
    semestre?: number;
    fecha_ingreso?: string;
}

// Interfaz para las materias inscritas (con datos combinados de una inscripción)
interface MateriaInscrita {
    curso_id: number;
    codigo: string;        // código de la materia (viene de tabla materias)
    nombre: string;        // nombre de la materia (viene de tabla materias)
    horario: string;       // horario del curso (podría venir de otra tabla)
    profesor: string;      // nombre del profesor (combinación de nombre y apellido)
    creditos: number;      // créditos de la materia
    estado?: string;       // estado de la inscripción: 'cursando', 'aprobado', 'reprobado'
    calificacion?: number; // calificación obtenida
}

const Main: React.FC = () => {
    const { user } = useAuth();
    const currentSemester = "2025-1"; // No necesitamos el setter si no cambiamos el valor
    const [datosEstudiante, setDatosEstudiante] = useState<Estudiante | null>(null);
    const [materiasInscritas] = useState<MateriaInscrita[]>([
        {
            curso_id: 1,
            codigo: "MAT101",
            nombre: "Cálculo Diferencial",
            horario: "Lun, Mie 10:00-12:00",
            profesor: "Dr. Juan García",
            creditos: 6,
            estado: "cursando"
        },
        {
            curso_id: 2,
            codigo: "FIS102",
            nombre: "Física Básica",
            horario: "Mar, Jue 08:00-10:00",
            profesor: "Dra. María López",
            creditos: 5,
            estado: "cursando"
        },
        {
            curso_id: 3,
            codigo: "PROG103",
            nombre: "Programación Orientada a Objetos",
            horario: "Lun, Vie 14:00-16:00",
            profesor: "Dr. Roberto Sánchez",
            creditos: 4,
            estado: "cursando"
        }
    ]);

    // Datos calculados a partir de las materias inscritas
    const creditosTotales = materiasInscritas.reduce((sum, materia) => sum + materia.creditos, 0);
    const promedioGeneral = 8.7; // En una implementación real, este valor vendría de la API
    const semestreActual = 3; // En una implementación real, este valor vendría de la API

    useEffect(() => {
        // En una implementación real, aquí se cargarían los datos del estudiante desde la API
        const cargarDatosEstudiante = async () => {
            try {
                // Simulación de datos del estudiante
                setTimeout(() => {
                    setDatosEstudiante({
                        estudiante_id: 1,
                        usuario_id: 1,
                        matricula: "A12345",
                        carrera: "Ingeniería Informática",
                        semestre: 3,
                        fecha_ingreso: "2023-08-15"
                    });
                }, 500);

                // En un entorno real:
                // const response = await fetch(`/api/estudiantes/${user?.id}`);
                // const data = await response.json();
                // setDatosEstudiante(data);
            } catch (error) {
                console.error("Error al cargar datos del estudiante", error);
            }
        };

        if (user?.id) {
            cargarDatosEstudiante();
            // También cargaríamos las materias inscritas en una implementación real
        }
    }, [user]);

    // Obtener nombre completo del usuario
    const nombreCompleto = user ? `${user.name}` : 'Estudiante';

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Encabezado con estilo azul */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Bienvenido, {nombreCompleto}</h1>
                        <p className="text-blue-100">Panel de estudiante - Semestre actual: {currentSemester}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="font-medium">{materiasInscritas.length} materias inscritas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de estadísticas */}
            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-blue-500">
                        <div className="text-3xl font-bold text-blue-600">{creditosTotales}</div>
                        <div className="text-gray-600 text-sm">Créditos este semestre</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-green-500">
                        <div className="text-3xl font-bold text-green-600">{promedioGeneral}</div>
                        <div className="text-gray-600 text-sm">Promedio general</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-purple-500">
                        <div className="text-3xl font-bold text-purple-600">{datosEstudiante?.semestre || semestreActual}</div>
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {materiasInscritas.map(materia => (
                                <tr key={materia.curso_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{materia.codigo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{materia.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{materia.horario}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{materia.profesor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{materia.creditos}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {materia.estado && (
                                            <span className={`text-xs px-1.5 py-0.5 rounded ${materia.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                                                    materia.estado === 'reprobado' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {materia.estado === 'aprobado' ? 'Aprobado' :
                                                    materia.estado === 'reprobado' ? 'Reprobado' :
                                                        'Cursando'}
                                                {materia.calificacion !== undefined && ` (${materia.calificacion})`}
                                            </span>
                                        )}
                                    </td>
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
