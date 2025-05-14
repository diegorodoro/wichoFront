import React, { useState, useEffect } from 'react';

// Interfaces basadas en la estructura de la BD
interface Student {
    estudiante_id: number;
    usuario_id: number;
    matricula: string;
    carrera: string;
    semestre: number;
    fecha_ingreso: string;
    // Campos adicionales de la tabla usuarios (asumiendo un join)
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    fecha_nacimiento?: string;
}

// Filtros para búsqueda de estudiantes
interface StudentFilters {
    carrera: string;
    semestre: string;
    busqueda: string;
}

const Students: React.FC = () => {
    // Estados para manejar la lista de estudiantes y los filtros
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [filters, setFilters] = useState<StudentFilters>({
        carrera: '',
        semestre: '',
        busqueda: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Carreras disponibles (esto podría venir de otra llamada a la API)
    const carreras = [
        'Ingeniería Informática',
        'Ingeniería Civil',
        'Medicina',
        'Derecho',
        'Administración de Empresas',
        'Psicología',
        'Arquitectura'
    ];

    // Datos de ejemplo para desarrollo
    const exampleStudents: Student[] = [
        {
            estudiante_id: 1,
            usuario_id: 101,
            matricula: 'A12345',
            carrera: 'Ingeniería Informática',
            semestre: 3,
            fecha_ingreso: '2023-08-15',
            nombre: 'Ana',
            apellido: 'Martínez',
            email: 'ana.martinez@universidad.edu',
            telefono: '555-1234',
            fecha_nacimiento: '2000-05-12'
        },
        {
            estudiante_id: 2,
            usuario_id: 102,
            matricula: 'A12346',
            carrera: 'Medicina',
            semestre: 6,
            fecha_ingreso: '2022-01-20',
            nombre: 'Carlos',
            apellido: 'Rodríguez',
            email: 'carlos.rodriguez@universidad.edu',
            telefono: '555-5678',
            fecha_nacimiento: '1999-11-30'
        },
        {
            estudiante_id: 3,
            usuario_id: 103,
            matricula: 'A12347',
            carrera: 'Derecho',
            semestre: 4,
            fecha_ingreso: '2023-01-15',
            nombre: 'Laura',
            apellido: 'González',
            email: 'laura.gonzalez@universidad.edu',
            telefono: '555-9012',
            fecha_nacimiento: '2001-03-22'
        },
        {
            estudiante_id: 4,
            usuario_id: 104,
            matricula: 'A12348',
            carrera: 'Ingeniería Informática',
            semestre: 5,
            fecha_ingreso: '2022-08-10',
            nombre: 'Miguel',
            apellido: 'Sánchez',
            email: 'miguel.sanchez@universidad.edu',
            telefono: '555-3456',
            fecha_nacimiento: '2000-09-18'
        },
        {
            estudiante_id: 5,
            usuario_id: 105,
            matricula: 'A12349',
            carrera: 'Psicología',
            semestre: 2,
            fecha_ingreso: '2024-01-10',
            nombre: 'Sofía',
            apellido: 'López',
            email: 'sofia.lopez@universidad.edu',
            telefono: '555-7890',
            fecha_nacimiento: '2002-07-05'
        }
    ];

    // Cargar datos de estudiantes (simulado)
    useEffect(() => {
        // Simulamos una llamada a la API
        const fetchStudents = async () => {
            try {
                setLoading(true);
                // En un entorno real, aquí haríamos una llamada fetch a la API
                // const response = await fetch('/api/estudiantes');
                // const data = await response.json();

                // Simulamos el delay de red
                setTimeout(() => {
                    setStudents(exampleStudents);
                    setFilteredStudents(exampleStudents);
                    setLoading(false);
                }, 800);
            } catch (err) {
                setError('Error al cargar los estudiantes');
                setLoading(false);
                console.error('Error fetching students:', err);
            }
        };

        fetchStudents();
    }, []);

    // Filtrar estudiantes cuando cambien los filtros
    useEffect(() => {
        const results = students.filter(student => {
            const matchesCarrera = filters.carrera ? student.carrera === filters.carrera : true;
            const matchesSemestre = filters.semestre ? student.semestre === parseInt(filters.semestre) : true;

            const searchText = filters.busqueda.toLowerCase();
            const matchesSearch = searchText ?
                student.matricula.toLowerCase().includes(searchText) ||
                `${student.nombre} ${student.apellido}`.toLowerCase().includes(searchText) ||
                student.email?.toLowerCase().includes(searchText) : true;

            return matchesCarrera && matchesSemestre && matchesSearch;
        });

        setFilteredStudents(results);
    }, [filters, students]);

    // Manejadores de eventos
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleViewDetails = (student: Student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Encabezado con estilo azul */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Estudiantes</h1>
                        <p className="text-blue-100">Gestión de estudiantes activos en la universidad</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-white bg-opacity-20 rounded-lg px-3 py-3 inline-flex items-center">
                            <span className="font-medium text-black text-center">{filteredStudents.length} estudiantes registrados</span>
                        </div>
                    </div>
                </div>
            </div>            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-blue-500">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </div>
                    Filtros de búsqueda
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="carrera">
                            Carrera
                        </label>
                        <select
                            id="carrera"
                            name="carrera"
                            value={filters.carrera}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        >
                            <option value="">Todas las carreras</option>
                            {carreras.map((carrera, index) => (
                                <option key={index} value={carrera}>{carrera}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="semestre">
                            Semestre
                        </label>
                        <select
                            id="semestre"
                            name="semestre"
                            value={filters.semestre}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        >
                            <option value="">Todos los semestres</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                                <option key={sem} value={sem}>{sem}º Semestre</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="busqueda">
                            Búsqueda
                        </label>
                        <input
                            type="text"
                            id="busqueda"
                            name="busqueda"
                            value={filters.busqueda}
                            onChange={handleFilterChange}
                            placeholder="Buscar por nombre o matrícula..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>            {/* Sección de estadísticas */}
            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-blue-500">
                        <div className="text-3xl font-bold text-blue-600">{students.length}</div>
                        <div className="text-gray-600 text-sm">Total Estudiantes</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-green-500">
                        <div className="text-3xl font-bold text-green-600">
                            {students.filter(s => s.carrera === 'Ingeniería Informática').length}
                        </div>
                        <div className="text-gray-600 text-sm">Est. Ingeniería Informática</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-purple-500">
                        <div className="text-3xl font-bold text-purple-600">
                            {new Date().getFullYear() - 2022}
                        </div>
                        <div className="text-gray-600 text-sm">Años de Programa</div>
                    </div>
                </div>
            </div>

            {/* Tabla de estudiantes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        Listado de Estudiantes
                        <span className="text-sm font-normal text-gray-500 ml-2">
                            ({filteredStudents.length} estudiantes)
                        </span>
                    </h2>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Nuevo Estudiante
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Matrícula
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estudiante
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Carrera
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Semestre
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha de Ingreso
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student.estudiante_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-medium text-gray-900">{student.matricula}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold mr-3">
                                                        {student.nombre?.charAt(0)}{student.apellido?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {student.nombre} {student.apellido}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{student.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{student.carrera}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {student.semestre}º Semestre
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(student.fecha_ingreso)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleViewDetails(student)}
                                                    className="text-blue-600 hover:text-blue-800 mr-4"
                                                >
                                                    Ver detalles
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-800">
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No se encontraron estudiantes con los criterios seleccionados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal de detalles del estudiante */}
            {showModal && selectedStudent && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setShowModal(false)}></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8" onClick={e => e.stopPropagation()}>
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">Detalle del Estudiante</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 py-4">
                                <div className="flex items-center mb-6">
                                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xl font-semibold mr-4">
                                        {selectedStudent.nombre?.charAt(0)}{selectedStudent.apellido?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">{selectedStudent.nombre} {selectedStudent.apellido}</h4>
                                        <p className="text-gray-600">{selectedStudent.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Matrícula</h5>
                                        <p className="font-semibold">{selectedStudent.matricula}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Carrera</h5>
                                        <p className="font-semibold">{selectedStudent.carrera}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Semestre</h5>
                                        <p className="font-semibold">{selectedStudent.semestre}º Semestre</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Fecha de Ingreso</h5>
                                        <p className="font-semibold">{formatDate(selectedStudent.fecha_ingreso)}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Teléfono</h5>
                                        <p className="font-semibold">{selectedStudent.telefono || 'No registrado'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Fecha de Nacimiento</h5>
                                        <p className="font-semibold">
                                            {selectedStudent.fecha_nacimiento ? formatDate(selectedStudent.fecha_nacimiento) : 'No registrada'}
                                        </p>
                                    </div>
                                </div>

                                {/* Podríamos agregar aquí más secciones como materias inscritas, historial académico, etc. */}
                            </div>
                            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors mr-2"
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Editar Información
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Students;