import React, { useState, useEffect } from 'react';

// Interfaces basadas en la estructura de la BD PostgreSQL
interface Curso {
    curso_id: number;
    materia_id: number;
    profesor_id: number;
    periodo: string;      // Período académico (ej. "2025-1" para primavera)
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
    cupo_disponible: number;
    horario: string; // Este dato podría venir de una tabla de horarios
    [key: string]: any; // Para permitir el filtrado dinámico
}

interface Inscripcion {
    inscripcion_id: number;
    estudiante_id: number;
    curso_id: number;
    fecha_inscripcion: string;
    calificacion?: number;
    estado?: string; // "cursando", "aprobado", "reprobado"
    // Datos adicionales del curso inscrito (vendrían de JOINs)
    codigo_materia: string;
    nombre_materia: string;
    creditos: number;
    profesor: string;
    horario: string;
}

const Subjects: React.FC = () => {
    const [availableCourses, setAvailableCourses] = useState<Curso[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Inscripcion[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('nombre_materia');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // En un entorno real, estos datos vendrían de una API
    useEffect(() => {
        // Simulación de carga de datos
        setIsLoading(true);
        setTimeout(() => {
            const mockCourses: Curso[] = [{
                curso_id: 1,
                materia_id: 1,
                profesor_id: 1,
                periodo: "2025-1", // 1: primavera
                ano_academico: 2025,
                cupo_maximo: 30,
                activo: true,
                codigo_materia: "MAT101",
                nombre_materia: "Cálculo Diferencial",
                creditos: 6,
                nombre_profesor: "Juan",
                apellido_profesor: "García",
                departamento: "Matemáticas",
                cupo_disponible: 23,
                horario: "Lun, Mie 10:00-12:00"
            }, {
                curso_id: 2,
                materia_id: 2,
                profesor_id: 2,
                periodo: "2025-1", // 1: primavera
                ano_academico: 2025,
                cupo_maximo: 25,
                activo: true,
                codigo_materia: "FIS102",
                nombre_materia: "Física Básica",
                creditos: 5,
                nombre_profesor: "María",
                apellido_profesor: "López",
                departamento: "Física",
                cupo_disponible: 15,
                horario: "Mar, Jue 08:00-10:00"
            }, {
                curso_id: 3,
                materia_id: 3,
                profesor_id: 3,
                periodo: "2025-2", // 2: verano
                ano_academico: 2025,
                cupo_maximo: 20,
                activo: true,
                codigo_materia: "PROG103",
                nombre_materia: "Programación",
                creditos: 4,
                nombre_profesor: "Carlos",
                apellido_profesor: "Martínez",
                departamento: "Computación",
                cupo_disponible: 8,
                horario: "Lun, Vie 14:00-16:00"
            }, {
                curso_id: 4,
                materia_id: 4,
                profesor_id: 4,
                periodo: "2025-2", // 2: verano
                ano_academico: 2025,
                cupo_maximo: 15,
                activo: true,
                codigo_materia: "BD104",
                nombre_materia: "Base de Datos",
                creditos: 5,
                nombre_profesor: "Roberto",
                apellido_profesor: "Rodríguez",
                departamento: "Sistemas",
                cupo_disponible: 4,
                horario: "Mie, Vie 16:00-18:00"
            },
            {
                curso_id: 5,
                materia_id: 5,
                profesor_id: 5,
                periodo: "Primavera",
                ano_academico: 2025,
                cupo_maximo: 35,
                activo: true,
                codigo_materia: "ALG105",
                nombre_materia: "Álgebra Lineal",
                creditos: 4,
                nombre_profesor: "Javier",
                apellido_profesor: "Sánchez",
                departamento: "Matemáticas",
                cupo_disponible: 27,
                horario: "Mar, Jue 12:00-14:00"
            },
            {
                curso_id: 6,
                materia_id: 6,
                profesor_id: 6,
                periodo: "Primavera",
                ano_academico: 2025,
                cupo_maximo: 40,
                activo: true,
                codigo_materia: "EST106",
                nombre_materia: "Estadística",
                creditos: 3,
                nombre_profesor: "Laura",
                apellido_profesor: "Morales",
                departamento: "Matemáticas",
                cupo_disponible: 32,
                horario: "Lun, Mie 08:00-09:30"
            },
            ];
            setAvailableCourses(mockCourses);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(e.target.value);
    };

    const handleSingleEnroll = (courseId: number) => {
        // Verificar si ya está inscrito
        if (enrolledCourses.some(enrollment => enrollment.curso_id === courseId)) {
            setError('Ya estás inscrito en este curso');
            setTimeout(() => setError(''), 3000);
            return;
        }

        // Buscar el curso a inscribir
        const courseToEnroll = availableCourses.find(course => course.curso_id === courseId);
        if (!courseToEnroll) {
            setError('Curso no encontrado');
            setTimeout(() => setError(''), 3000);
            return;
        }

        // Verificar si hay cupo disponible
        if (courseToEnroll.cupo_disponible <= 0) {
            setError('No hay cupos disponibles para este curso');
            setTimeout(() => setError(''), 3000);
            return;
        }

        // Crear la nueva inscripción
        const newEnrollment: Inscripcion = {
            inscripcion_id: Date.now() + courseId, // Simulación de ID único
            estudiante_id: 1, // ID del estudiante actual
            curso_id: courseId,
            fecha_inscripcion: new Date().toISOString(),
            estado: 'cursando', // Estado por defecto al inscribirse
            codigo_materia: courseToEnroll.codigo_materia,
            nombre_materia: courseToEnroll.nombre_materia,
            creditos: courseToEnroll.creditos,
            profesor: `${courseToEnroll.nombre_profesor} ${courseToEnroll.apellido_profesor}`,
            horario: courseToEnroll.horario
        };

        // Actualizar la lista de cursos inscritos
        setEnrolledCourses(prev => [...prev, newEnrollment]);

        // Actualizar cupos disponibles
        setAvailableCourses(prev =>
            prev.map(course => {
                if (course.curso_id === courseId) {
                    return {
                        ...course,
                        cupo_disponible: course.cupo_disponible - 1
                    };
                }
                return course;
            })
        );

        setSuccessMessage('Curso inscrito con éxito');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleUnenroll = (enrollmentId: number, courseId: number) => {
        // Verificar si el curso está inscrito
        const enrollmentToUnenroll = enrolledCourses.find(enrollment => enrollment.inscripcion_id === enrollmentId);

        if (!enrollmentToUnenroll) {
            setError('No estás inscrito en este curso');
            setTimeout(() => setError(''), 3000);
            return;
        }

        // Actualizar la lista de cursos inscritos (eliminar la inscripción)
        setEnrolledCourses(prev => prev.filter(enrollment => enrollment.inscripcion_id !== enrollmentId));

        // Actualizar cupos disponibles
        setAvailableCourses(prev =>
            prev.map(course => {
                if (course.curso_id === courseId) {
                    return {
                        ...course,
                        cupo_disponible: course.cupo_disponible + 1
                    };
                }
                return course;
            })
        );

        setSuccessMessage('Curso dado de baja con éxito');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const filteredCourses = availableCourses.filter(course => {
        const value = String(course[filterBy as keyof Curso]).toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });

    const totalCredits = enrolledCourses.reduce((sum, course) => sum + (course.creditos || 0), 0);
    const totalAvailableCourses = availableCourses.length;
    const totalEnrolledCourses = enrolledCourses.length;

    return (
        <div className="min-h-[80vh] flex flex-col">
            {/* Banner principal */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 rounded-lg shadow-lg mb-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Inscripción de Materias
                    </h1>
                    <p className="text-xl opacity-90">
                        Selecciona los cursos que deseas tomar este semestre
                    </p>
                </div>
            </div>

            {/* Mensajes de éxito o error */}
            <div className="max-w-6xl mx-auto w-full px-4">
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{successMessage}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de estadísticas */}
            <div className="max-w-6xl mx-auto w-full px-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen de Inscripción</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-3xl font-bold text-blue-600">{totalAvailableCourses}</div>
                        <div className="text-gray-600 text-sm">Cursos Disponibles</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-3xl font-bold text-green-600">{totalEnrolledCourses}</div>
                        <div className="text-gray-600 text-sm">Cursos Inscritos</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-3xl font-bold text-purple-600">{totalCredits}</div>
                        <div className="text-gray-600 text-sm">Créditos Totales</div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-6xl mx-auto w-full px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cursos disponibles */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <div className="p-2 bg-blue-100 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                Cursos Disponibles ({filteredCourses.length})
                            </h2>

                            {/* Filtros de búsqueda */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Buscar cursos..."
                                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="sm:w-1/3">
                                    <select
                                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        value={filterBy}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="nombre_materia">Nombre</option>
                                        <option value="codigo_materia">Código</option>
                                        <option value="apellido_profesor">Profesor</option>
                                        <option value="departamento">Departamento</option>
                                    </select>
                                </div>
                            </div>

                            {/* Lista de cursos disponibles */}
                            {isLoading ? (
                                <div className="text-center py-10">
                                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="mt-3">Cargando cursos disponibles...</p>
                                </div>
                            ) : (
                                <>
                                    {filteredCourses.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {filteredCourses.map(course => (
                                                <div
                                                    key={course.curso_id}
                                                    className="border rounded-lg p-4 hover:shadow-md transition-all"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium">{course.nombre_materia}</h3>
                                                            <p className="text-gray-500 text-sm">{course.codigo_materia}</p>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-full text-xs self-start ${course.cupo_disponible && course.cupo_disponible > 10 ? 'bg-green-100 text-green-800' :
                                                            course.cupo_disponible && course.cupo_disponible > 5 ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`}
                                                        >
                                                            {course.cupo_disponible} cupos
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-500">
                                                        <p>{course.nombre_profesor} {course.apellido_profesor}</p>
                                                        <p>{course.horario}</p>
                                                        <p className="mt-1">Semestre: {course.periodo} {course.ano_academico}</p>
                                                        <p>Departamento: {course.departamento}</p>
                                                    </div>
                                                    <div className="mt-3 flex justify-between items-center">
                                                        <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{course.creditos} créditos</span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSingleEnroll(course.curso_id);
                                                            }}
                                                            className={`px-3 py-1.5 rounded-md transition flex items-center text-sm ${enrolledCourses.some(enrollment => enrollment.curso_id === course.curso_id)
                                                                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                                                                : course.cupo_disponible && course.cupo_disponible <= 0
                                                                    ? 'bg-red-100 text-red-600 cursor-not-allowed'
                                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                                }`}
                                                            disabled={enrolledCourses.some(enrollment => enrollment.curso_id === course.curso_id) || (course.cupo_disponible !== undefined && course.cupo_disponible <= 0)}
                                                        >
                                                            {enrolledCourses.some(enrollment => enrollment.curso_id === course.curso_id) ? (
                                                                <span>Ya inscrito</span>
                                                            ) : course.cupo_disponible && course.cupo_disponible <= 0 ? (
                                                                <span>Sin cupo</span>
                                                            ) : (
                                                                <>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                    </svg>
                                                                    Inscribir
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 border rounded-md bg-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="mt-4 text-gray-500">No se encontraron cursos con los filtros aplicados.</p>
                                        </div>
                                    )}

                                    <div className="mt-6 text-center text-gray-500 text-sm">
                                        Haz clic en el botón "Inscribir" de cada curso para inscribirte directamente
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Cursos inscritos */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <div className="p-2 bg-green-100 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                Cursos Inscritos
                            </h2>

                            {enrolledCourses.length > 0 ? (
                                <>
                                    <div className="overflow-y-auto max-h-96">
                                        {enrolledCourses.map(enrollment => (
                                            <div key={enrollment.inscripcion_id} className="border-b py-3 last:border-b-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium">{enrollment.nombre_materia}</h3>
                                                        <p className="text-xs text-gray-500">{enrollment.codigo_materia} • {enrollment.horario}</p>
                                                        <p className="text-xs text-gray-500">Profesor: {enrollment.profesor}</p>
                                                        {enrollment.estado && (
                                                            <span className={`text-xs px-1.5 py-0.5 rounded ${enrollment.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                                                                    enrollment.estado === 'reprobado' ? 'bg-red-100 text-red-800' :
                                                                        'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {enrollment.estado === 'aprobado' ? 'Aprobado' :
                                                                    enrollment.estado === 'reprobado' ? 'Reprobado' :
                                                                        'Cursando'}
                                                            </span>
                                                        )}
                                                        {enrollment.calificacion !== undefined && (
                                                            <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                                                Calificación: {enrollment.calificacion}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => handleUnenroll(enrollment.inscripcion_id, enrollment.curso_id)}
                                                        className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition duration-300"
                                                        title="Dar de baja"
                                                        disabled={enrollment.estado === 'aprobado' || enrollment.estado === 'reprobado'}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="mt-1 flex items-center">
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                                                        {enrollment.creditos} créditos
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                                        <p className="font-medium flex justify-between">
                                            <span>Total de cursos:</span>
                                            <span className="font-bold">{enrolledCourses.length}</span>
                                        </p>
                                        <p className="font-medium flex justify-between mt-2">
                                            <span>Total de créditos:</span>
                                            <span className="font-bold">{totalCredits}</span>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-10 border rounded-md bg-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="mt-4 text-gray-500">No tienes cursos inscritos actualmente.</p>
                                    <p className="mt-2 text-sm text-gray-400">Selecciona cursos de la lista disponible para inscribirte.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Información importante */}
                <div className="mt-8 mb-10">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    <span className="font-medium">Importante:</span> El período de inscripción cierra el 15 de junio. Recuerda que debes tener al menos 15 créditos inscritos para el semestre.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subjects;