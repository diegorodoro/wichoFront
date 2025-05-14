import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

interface Curso {
    curso_id: number;
    materia_id: number;
    profesor_id: number;
    semestre: string;
    ano_academico: number;
    cupo_maximo: number;
    activo: boolean;
    // Datos relacionados (vendrían de JOINs)
    codigo_materia: string;
    nombre_materia: string;
    creditos: number;
    nombre_profesor: string;
    apellido_profesor: string;
    departamento: string;
    // Información calculada
    inscripciones_actuales: number;
}

interface EstadisticasSistema {
    total_estudiantes: number;
    total_profesores: number;
    total_cursos_activos: number;
    total_materias: number;
}

const Main: React.FC = () => {
    const { user } = useAuth();
    // Utilizamos sólo la variable de estado sin el setter ya que no cambiará en este componente
    const [semestreActual] = useState("2025-1");
    const [cursosActivos, setCursosActivos] = useState<Curso[]>([]);
    const [estadisticas, setEstadisticas] = useState<EstadisticasSistema>({
        total_estudiantes: 0,
        total_profesores: 0,
        total_cursos_activos: 0,
        total_materias: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // En un entorno real, estas llamadas serían a la API
        const cargarDatos = async () => {
            setIsLoading(true);
            try {
                // Simulación de datos del sistema y cursos activos
                setTimeout(() => {
                    // Estadísticas del sistema
                    setEstadisticas({
                        total_estudiantes: 1250,
                        total_profesores: 85,
                        total_cursos_activos: 320,
                        total_materias: 95
                    });

                    // Cursos activos en el semestre actual
                    setCursosActivos([
                        {
                            curso_id: 1,
                            materia_id: 1,
                            profesor_id: 1,
                            semestre: "2025-1",
                            ano_academico: 2025,
                            cupo_maximo: 30,
                            activo: true,
                            codigo_materia: "MAT101",
                            nombre_materia: "Cálculo Diferencial",
                            creditos: 6,
                            nombre_profesor: "Juan",
                            apellido_profesor: "García",
                            departamento: "Matemáticas",
                            inscripciones_actuales: 28
                        },
                        {
                            curso_id: 2,
                            materia_id: 2,
                            profesor_id: 2,
                            semestre: "2025-1",
                            ano_academico: 2025,
                            cupo_maximo: 25,
                            activo: true,
                            codigo_materia: "FIS102",
                            nombre_materia: "Física Básica",
                            creditos: 5,
                            nombre_profesor: "María",
                            apellido_profesor: "López",
                            departamento: "Física",
                            inscripciones_actuales: 22
                        },
                        {
                            curso_id: 3,
                            materia_id: 3,
                            profesor_id: 3,
                            semestre: "2025-1",
                            ano_academico: 2025,
                            cupo_maximo: 20,
                            activo: true,
                            codigo_materia: "PROG103",
                            nombre_materia: "Programación Orientada a Objetos",
                            creditos: 4,
                            nombre_profesor: "Roberto",
                            apellido_profesor: "Sánchez",
                            departamento: "Computación",
                            inscripciones_actuales: 20
                        }
                    ]);

                    setIsLoading(false);
                }, 800);

                // En un entorno real:
                // const responseEstadisticas = await fetch('/api/admin/estadisticas');
                // const datosEstadisticas = await responseEstadisticas.json();
                // setEstadisticas(datosEstadisticas);

                // const responseCursos = await fetch(`/api/admin/cursos?semestre=${semestreActual}`);
                // const datosCursos = await responseCursos.json();
                // setCursosActivos(datosCursos);
            } catch (error) {
                console.error("Error al cargar datos administrativos:", error);
                setIsLoading(false);
            }
        };

        if (user?.id) {
            cargarDatos();
        }
    }, [user, semestreActual]);

    // Nombre completo del usuario
    const nombreCompleto = user ? `${user.name}` : 'Administrador';

    // Calcular porcentajes de ocupación para los cursos
    const getPorcentajeOcupacion = (inscritos: number, cupoMaximo: number): number => {
        return Math.round((inscritos / cupoMaximo) * 100);
    };

    // Obtener color de ocupación según el porcentaje
    const getColorOcupacion = (porcentaje: number): string => {
        if (porcentaje >= 90) return "text-red-600"; // Casi lleno
        if (porcentaje >= 75) return "text-orange-500"; // Alta demanda
        if (porcentaje >= 50) return "text-blue-600"; // Demanda normal
        return "text-green-600"; // Baja demanda
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Encabezado con estilo azul */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Bienvenido, {nombreCompleto}</h1>
                        <p className="text-blue-100">Panel de Administración - Semestre actual: {semestreActual}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="font-medium">Panel General</span>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {/* Sección de estadísticas */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Estadísticas del Sistema</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-5 shadow text-center border-t-4 border-blue-500">
                                <div className="text-3xl font-bold text-blue-600">{estadisticas.total_estudiantes}</div>
                                <div className="text-gray-600 text-sm">Estudiantes Registrados</div>
                            </div>
                            <div className="bg-white rounded-lg p-5 shadow text-center border-t-4 border-green-500">
                                <div className="text-3xl font-bold text-green-600">{estadisticas.total_profesores}</div>
                                <div className="text-gray-600 text-sm">Profesores Activos</div>
                            </div>
                            <div className="bg-white rounded-lg p-5 shadow text-center border-t-4 border-purple-500">
                                <div className="text-3xl font-bold text-purple-600">{estadisticas.total_materias}</div>
                                <div className="text-gray-600 text-sm">Materias Registradas</div>
                            </div>
                            <div className="bg-white rounded-lg p-5 shadow text-center border-t-4 border-yellow-500">
                                <div className="text-3xl font-bold text-yellow-600">{estadisticas.total_cursos_activos}</div>
                                <div className="text-gray-600 text-sm">Cursos Activos</div>
                            </div>
                        </div>
                    </div>

                    {/* Cursos del semestre actual */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500 mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                                <div className="p-2 bg-blue-100 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                Cursos Activos (Semestre {semestreActual})
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesor</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ocupación</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cursosActivos.map(curso => {
                                        const porcentajeOcupacion = getPorcentajeOcupacion(curso.inscripciones_actuales, curso.cupo_maximo);
                                        return (
                                            <tr key={curso.curso_id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{curso.codigo_materia}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso.nombre_materia}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${curso.nombre_profesor} ${curso.apellido_profesor}`}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso.departamento}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso.creditos}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex items-center">
                                                        <span className={`font-semibold ${getColorOcupacion(porcentajeOcupacion)}`}>
                                                            {porcentajeOcupacion}%
                                                        </span>
                                                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2.5">
                                                            <div
                                                                className={`h-2.5 rounded-full ${porcentajeOcupacion >= 90 ? 'bg-red-500' :
                                                                        porcentajeOcupacion >= 75 ? 'bg-orange-500' :
                                                                            porcentajeOcupacion >= 50 ? 'bg-blue-500' : 'bg-green-500'
                                                                    }`}
                                                                style={{ width: `${porcentajeOcupacion}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${curso.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {curso.activo ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Próximas actividades administrativas */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-yellow-500">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                Próximas Actividades Administrativas
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 border-l-4 border-yellow-400 pl-4 py-2">
                                <p className="text-sm text-yellow-600 font-semibold">Mayo 15, 2025</p>
                                <p className="font-medium">Cierre de inscripciones para el semestre actual</p>
                            </div>
                            <div className="mb-4 border-l-4 border-yellow-400 pl-4 py-2">
                                <p className="text-sm text-yellow-600 font-semibold">Mayo 20, 2025</p>
                                <p className="font-medium">Reunión de planificación para el próximo semestre</p>
                            </div>
                            <div className="border-l-4 border-yellow-400 pl-4 py-2">
                                <p className="text-sm text-yellow-600 font-semibold">Mayo 25, 2025</p>
                                <p className="font-medium">Fecha límite para aprobación de nuevos cursos</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Main;
