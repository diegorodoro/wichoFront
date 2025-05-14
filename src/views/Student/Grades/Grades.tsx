import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

// Interfaces basadas en el esquema de la base de datos PostgreSQL
interface Estudiante {
    estudiante_id: number;
    usuario_id: number;
    matricula: string;
    carrera?: string;
    semestre?: number;
    fecha_ingreso?: string;
}

// Interfaz para las calificaciones de materias
interface CalificacionMateria {
    inscripcion_id: number;
    curso_id: number;
    periodo: string;         // Periodo académico (ej: "2025-1")
    codigo: string;          // Código de la materia
    nombre: string;          // Nombre de la materia
    profesor: string;        // Nombre del profesor
    creditos: number;        // Créditos de la materia
    calificacion: number;    // Calificación obtenida
    estado: string;          // Estado: 'aprobado', 'reprobado', 'cursando'
    fecha_calificacion?: string; // Fecha en que se registró la calificación
}

// Interfaz para el historial académico agrupado por periodo
interface PeriodoAcademico {
    periodo: string;         // Identificador del periodo (ej: "2025-1")
    nombre: string;          // Nombre descriptivo del periodo (ej: "Primavera 2025")
    materias: CalificacionMateria[];
    promedio: number;        // Promedio del periodo
    creditos: number;        // Total de créditos del periodo
}

const Grades: React.FC = () => {
    const { user } = useAuth();
    const [datosEstudiante, setDatosEstudiante] = useState<Estudiante | null>(null);
    const [historiales, setHistoriales] = useState<PeriodoAcademico[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [promedioGeneral, setPromedioGeneral] = useState(0);
    const [creditosAcumulados, setCreditosAcumulados] = useState(0);
    const [materiasAprobadas, setMateriasAprobadas] = useState(0);
    const [periodoActual] = useState("2025-1");

    useEffect(() => {
        // En un entorno real, estas llamadas serían a la API
        const cargarDatos = async () => {
            setIsLoading(true);
            try {
                // Simulación de datos del estudiante y su historial académico
                setTimeout(() => {
                    // Datos del estudiante
                    setDatosEstudiante({
                        estudiante_id: 1,
                        usuario_id: 1,
                        matricula: "A12345",
                        carrera: "Ingeniería Informática",
                        semestre: 3,
                        fecha_ingreso: "2023-08-15"
                    });

                    // Datos de calificaciones por periodos
                    const historialesData: PeriodoAcademico[] = [
                        {
                            periodo: "2024-1",
                            nombre: "Primavera 2024",
                            materias: [
                                {
                                    inscripcion_id: 101,
                                    curso_id: 201,
                                    periodo: "2024-1",
                                    codigo: "MAT100",
                                    nombre: "Introducción al Cálculo",
                                    profesor: "Dra. Ana Cortés",
                                    creditos: 5,
                                    calificacion: 8.5,
                                    estado: "aprobado",
                                    fecha_calificacion: "2024-06-20"
                                },
                                {
                                    inscripcion_id: 102,
                                    curso_id: 202,
                                    periodo: "2024-1",
                                    codigo: "FIS100",
                                    nombre: "Física Fundamental",
                                    profesor: "Dr. Roberto Soto",
                                    creditos: 4,
                                    calificacion: 7.8,
                                    estado: "aprobado",
                                    fecha_calificacion: "2024-06-18"
                                },
                                {
                                    inscripcion_id: 103,
                                    curso_id: 203,
                                    periodo: "2024-1",
                                    codigo: "PROG100",
                                    nombre: "Fundamentos de Programación",
                                    profesor: "Dr. Carlos Mendoza",
                                    creditos: 6,
                                    calificacion: 9.2,
                                    estado: "aprobado",
                                    fecha_calificacion: "2024-06-22"
                                }
                            ],
                            promedio: 8.5,
                            creditos: 15
                        },
                        {
                            periodo: "2024-2",
                            nombre: "Otoño 2024",
                            materias: [
                                {
                                    inscripcion_id: 104,
                                    curso_id: 204,
                                    periodo: "2024-2",
                                    codigo: "MAT101",
                                    nombre: "Cálculo Diferencial",
                                    profesor: "Dr. Juan García",
                                    creditos: 6,
                                    calificacion: 8.0,
                                    estado: "aprobado",
                                    fecha_calificacion: "2024-12-15"
                                },
                                {
                                    inscripcion_id: 105,
                                    curso_id: 205,
                                    periodo: "2024-2",
                                    codigo: "FIS101",
                                    nombre: "Física Mecánica",
                                    profesor: "Dra. María López",
                                    creditos: 5,
                                    calificacion: 9.0,
                                    estado: "aprobado",
                                    fecha_calificacion: "2024-12-10"
                                },
                                {
                                    inscripcion_id: 106,
                                    curso_id: 206,
                                    periodo: "2024-2",
                                    codigo: "EST101",
                                    nombre: "Estadística Básica",
                                    profesor: "Dr. Jorge Ramírez",
                                    creditos: 4,
                                    calificacion: 7.5,
                                    estado: "aprobado",
                                    fecha_calificacion: "2024-12-12"
                                }
                            ],
                            promedio: 8.2,
                            creditos: 15
                        },
                        {
                            periodo: "2025-1",
                            nombre: "Primavera 2025",
                            materias: [
                                {
                                    inscripcion_id: 107,
                                    curso_id: 207,
                                    periodo: "2025-1",
                                    codigo: "MAT102",
                                    nombre: "Cálculo Integral",
                                    profesor: "Dr. Juan García",
                                    creditos: 6,
                                    calificacion: 7.8,
                                    estado: "cursando"
                                },
                                {
                                    inscripcion_id: 108,
                                    curso_id: 208,
                                    periodo: "2025-1",
                                    codigo: "FIS102",
                                    nombre: "Física Básica",
                                    profesor: "Dra. María López",
                                    creditos: 5,
                                    calificacion: 8.5,
                                    estado: "cursando"
                                },
                                {
                                    inscripcion_id: 109,
                                    curso_id: 209,
                                    periodo: "2025-1",
                                    codigo: "PROG103",
                                    nombre: "Programación Orientada a Objetos",
                                    profesor: "Dr. Roberto Sánchez",
                                    creditos: 4,
                                    calificacion: 0, // Sin calificación aún
                                    estado: "cursando"
                                }
                            ],
                            promedio: 5.4, // Promedio parcial
                            creditos: 15
                        }
                    ];

                    setHistoriales(historialesData);

                    // Calcular estadísticas generales
                    let totalCreditos = 0;
                    let totalPuntos = 0;
                    let materiasAprobadasCount = 0;

                    historialesData.forEach(periodo => {
                        periodo.materias.forEach(materia => {
                            if (materia.estado === 'aprobado') {
                                totalCreditos += materia.creditos;
                                totalPuntos += materia.calificacion * materia.creditos;
                                materiasAprobadasCount++;
                            }
                        });
                    });

                    const promedio = totalCreditos > 0 ? totalPuntos / totalCreditos : 0;
                    setPromedioGeneral(Number(promedio.toFixed(2)));
                    setCreditosAcumulados(totalCreditos);
                    setMateriasAprobadas(materiasAprobadasCount);

                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error al cargar datos de calificaciones:", error);
                setIsLoading(false);
            }
        };

        if (user?.id) {
            cargarDatos();
        }
    }, [user]);

    // Función para obtener el color de la calificación
    const getCalificacionColor = (calificacion: number): string => {
        if (calificacion >= 9) return "text-green-600";
        if (calificacion >= 7) return "text-blue-600";
        if (calificacion >= 6) return "text-yellow-600";
        return "text-red-600";
    };

    // Función para obtener el color del estado
    const getEstadoColor = (estado: string): string => {
        if (estado === 'aprobado') return "bg-green-100 text-green-800";
        if (estado === 'reprobado') return "bg-red-100 text-red-800";
        return "bg-yellow-100 text-yellow-800";
    };

    return (
        <div className="min-h-[80vh] flex flex-col">
            {/* Banner principal */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 rounded-lg shadow-lg mb-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Historial Académico
                    </h1>
                    <p className="text-xl opacity-90">
                        Consulta tus calificaciones por periodo
                    </p>
                </div>
            </div>

            {/* Sección de estadísticas */}
            <div className="max-w-6xl mx-auto w-full px-4 mb-8">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen Académico</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-blue-500">
                                <div className="text-3xl font-bold text-blue-600">{promedioGeneral}</div>
                                <div className="text-gray-600 text-sm">Promedio General</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-green-500">
                                <div className="text-3xl font-bold text-green-600">{creditosAcumulados}</div>
                                <div className="text-gray-600 text-sm">Créditos Acumulados</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-purple-500">
                                <div className="text-3xl font-bold text-purple-600">{materiasAprobadas}</div>
                                <div className="text-gray-600 text-sm">Materias Aprobadas</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-yellow-500">
                                <div className="text-3xl font-bold text-yellow-600">{datosEstudiante?.semestre || 0}</div>
                                <div className="text-gray-600 text-sm">Semestre Actual</div>
                            </div>
                        </div>

                        {/* Historial por período */}
                        <div className="mb-10">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Historial por Periodo</h2>
                                <p className="text-sm text-gray-500 mt-1">Calificaciones agrupadas por periodo académico</p>
                            </div>

                            {/* Acordeón de períodos */}
                            <div className="space-y-4">
                                {historiales.map((periodo, index) => (
                                    <div key={periodo.periodo} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <details open={index === 0}>
                                            <summary className="cursor-pointer p-5 bg-gray-50 border-b flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {periodo.nombre}
                                                        {periodo.periodo === periodoActual && (
                                                            <span className="ml-3 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                                Actual
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Promedio: <span className="font-semibold">{periodo.promedio}</span> |
                                                        Créditos: <span className="font-semibold">{periodo.creditos}</span>
                                                    </p>
                                                </div>
                                                <div className="text-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </summary>
                                            <div className="p-4 md:p-6">
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesor</th>
                                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                                                                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
                                                                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {periodo.materias.map(materia => (
                                                                <tr key={materia.inscripcion_id} className="hover:bg-gray-50">
                                                                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{materia.codigo}</td>
                                                                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{materia.nombre}</td>
                                                                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{materia.profesor}</td>
                                                                    <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-500">{materia.creditos}</td>
                                                                    <td className="px-3 py-3 text-center whitespace-nowrap">
                                                                        <span className={`text-sm font-semibold ${getCalificacionColor(materia.calificacion)}`}>
                                                                            {materia.estado === "cursando" && !materia.calificacion ? "---" : materia.calificacion}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-3 py-3 text-center whitespace-nowrap">
                                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(materia.estado)}`}>
                                                                            {materia.estado === "aprobado" ? "Aprobado" :
                                                                                materia.estado === "reprobado" ? "Reprobado" : "Cursando"}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </details>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Sección informativa */}
            <div className="max-w-6xl mx-auto w-full px-4 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold mb-2">Importante:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Las calificaciones se publican al finalizar cada periodo académico.</li>
                        <li>Tienes hasta 5 días hábiles después de la publicación para solicitar revisión.</li>
                        <li>El promedio general se calcula considerando solo las materias aprobadas.</li>
                        <li>Para cualquier aclaración, contacta con la Secretaría Académica.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Grades;