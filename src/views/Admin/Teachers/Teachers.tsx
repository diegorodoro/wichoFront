import React, { useState, useEffect } from 'react';

// Interfaces basadas en la estructura de la BD
interface Teacher {
    profesor_id: number;
    usuario_id: number;
    codigo_empleado: string;
    departamento: string;
    especialidad: string;
    fecha_contratacion: string;
    // Campos adicionales de la tabla usuarios (asumiendo un join)
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    fecha_nacimiento?: string;
}

// Filtros para búsqueda de profesores
interface TeacherFilters {
    departamento: string;
    especialidad: string;
    busqueda: string;
}

const Teachers: React.FC = () => {
    // Estados para manejar la lista de profesores y los filtros
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
    const [filters, setFilters] = useState<TeacherFilters>({
        departamento: '',
        especialidad: '',
        busqueda: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Departamentos disponibles (esto podría venir de otra llamada a la API)
    const departamentos = [
        'Ciencias de la Computación',
        'Ingeniería Civil',
        'Medicina',
        'Derecho',
        'Administración',
        'Psicología',
        'Arquitectura'
    ];

    // Especialidades disponibles (esto podría venir de otra llamada a la API)
    const especialidades = [
        'Programación',
        'Bases de Datos',
        'Inteligencia Artificial',
        'Estructuras',
        'Hidráulica',
        'Derecho Penal',
        'Derecho Civil',
        'Marketing',
        'Finanzas',
        'Psicología Clínica',
        'Psicología Educativa',
        'Diseño Arquitectónico',
        'Urbanismo'
    ];

    // Datos de ejemplo para desarrollo
    const exampleTeachers: Teacher[] = [
        {
            profesor_id: 1,
            usuario_id: 201,
            codigo_empleado: 'PROF001',
            departamento: 'Ciencias de la Computación',
            especialidad: 'Bases de Datos',
            fecha_contratacion: '2020-08-15',
            nombre: 'Roberto',
            apellido: 'García',
            email: 'roberto.garcia@universidad.edu',
            telefono: '555-1111',
            fecha_nacimiento: '1980-05-12'
        },
        {
            profesor_id: 2,
            usuario_id: 202,
            codigo_empleado: 'PROF002',
            departamento: 'Ciencias de la Computación',
            especialidad: 'Programación',
            fecha_contratacion: '2019-01-20',
            nombre: 'María',
            apellido: 'López',
            email: 'maria.lopez@universidad.edu',
            telefono: '555-2222',
            fecha_nacimiento: '1985-11-30'
        },
        {
            profesor_id: 3,
            usuario_id: 203,
            codigo_empleado: 'PROF003',
            departamento: 'Ingeniería Civil',
            especialidad: 'Estructuras',
            fecha_contratacion: '2021-01-15',
            nombre: 'Javier',
            apellido: 'Martínez',
            email: 'javier.martinez@universidad.edu',
            telefono: '555-3333',
            fecha_nacimiento: '1978-03-22'
        },
        {
            profesor_id: 4,
            usuario_id: 204,
            codigo_empleado: 'PROF004',
            departamento: 'Derecho',
            especialidad: 'Derecho Penal',
            fecha_contratacion: '2018-08-10',
            nombre: 'Carmen',
            apellido: 'Rodríguez',
            email: 'carmen.rodriguez@universidad.edu',
            telefono: '555-4444',
            fecha_nacimiento: '1975-09-18'
        },
        {
            profesor_id: 5,
            usuario_id: 205,
            codigo_empleado: 'PROF005',
            departamento: 'Psicología',
            especialidad: 'Psicología Clínica',
            fecha_contratacion: '2022-01-10',
            nombre: 'Daniel',
            apellido: 'Fernández',
            email: 'daniel.fernandez@universidad.edu',
            telefono: '555-5555',
            fecha_nacimiento: '1982-07-05'
        }
    ];

    // Cargar datos de profesores (simulado)
    useEffect(() => {
        // Simulamos una llamada a la API
        const fetchTeachers = async () => {
            try {
                setLoading(true);
                // En un entorno real, aquí haríamos una llamada fetch a la API
                // const response = await fetch('/api/profesores');
                // const data = await response.json();

                // Simulamos el delay de red
                setTimeout(() => {
                    setTeachers(exampleTeachers);
                    setFilteredTeachers(exampleTeachers);
                    setLoading(false);
                }, 800);
            } catch (err) {
                setError('Error al cargar los profesores');
                setLoading(false);
                console.error('Error fetching teachers:', err);
            }
        };

        fetchTeachers();
    }, []);

    // Filtrar profesores cuando cambien los filtros
    useEffect(() => {
        const results = teachers.filter(teacher => {
            const matchesDepartamento = filters.departamento ? teacher.departamento === filters.departamento : true;
            const matchesEspecialidad = filters.especialidad ? teacher.especialidad === filters.especialidad : true;

            const searchText = filters.busqueda.toLowerCase();
            const matchesSearch = searchText ?
                teacher.codigo_empleado.toLowerCase().includes(searchText) ||
                `${teacher.nombre} ${teacher.apellido}`.toLowerCase().includes(searchText) ||
                teacher.email?.toLowerCase().includes(searchText) : true;

            return matchesDepartamento && matchesEspecialidad && matchesSearch;
        });

        setFilteredTeachers(results);
    }, [filters, teachers]);

    // Manejadores de eventos
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleViewDetails = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
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
                        <h1 className="text-3xl font-bold mb-2">Profesores</h1>
                        <p className="text-blue-100">Gestión de profesores activos en la universidad</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-white bg-opacity-20 rounded-lg px-3 py-3 inline-flex items-center">
                            <span className="font-medium text-black text-center">{filteredTeachers.length} profesores registrados</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtros */}
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
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="departamento">
                            Departamento
                        </label>
                        <select
                            id="departamento"
                            name="departamento"
                            value={filters.departamento}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        >
                            <option value="">Todos los departamentos</option>
                            {departamentos.map((departamento, index) => (
                                <option key={index} value={departamento}>{departamento}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="especialidad">
                            Especialidad
                        </label>
                        <select
                            id="especialidad"
                            name="especialidad"
                            value={filters.especialidad}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        >
                            <option value="">Todas las especialidades</option>
                            {especialidades.map((especialidad, index) => (
                                <option key={index} value={especialidad}>{especialidad}</option>
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
                            placeholder="Buscar por nombre o código..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Sección de estadísticas */}
            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-blue-500">
                        <div className="text-3xl font-bold text-blue-600">{teachers.length}</div>
                        <div className="text-gray-600 text-sm">Total Profesores</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-green-500">
                        <div className="text-3xl font-bold text-green-600">
                            {teachers.filter(t => t.departamento === 'Ciencias de la Computación').length}
                        </div>
                        <div className="text-gray-600 text-sm">Prof. Ciencias de la Computación</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center border-t-4 border-purple-500">
                        <div className="text-3xl font-bold text-purple-600">
                            {new Date().getFullYear() - 2018}
                        </div>
                        <div className="text-gray-600 text-sm">Años de Programa</div>
                    </div>
                </div>
            </div>

            {/* Tabla de profesores */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        Listado de Profesores
                        <span className="text-sm font-normal text-gray-500 ml-2">
                            ({filteredTeachers.length} profesores)
                        </span>
                    </h2>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Nuevo Profesor
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
                                        Código
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profesor
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Departamento
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Especialidad
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha de Contratación
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher) => (
                                        <tr key={teacher.profesor_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-medium text-gray-900">{teacher.codigo_empleado}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold mr-3">
                                                        {teacher.nombre?.charAt(0)}{teacher.apellido?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {teacher.nombre} {teacher.apellido}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{teacher.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{teacher.departamento}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {teacher.especialidad}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(teacher.fecha_contratacion)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleViewDetails(teacher)}
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
                                            No se encontraron profesores con los criterios seleccionados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal de detalles del profesor */}
            {showModal && selectedTeacher && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setShowModal(false)}></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8" onClick={e => e.stopPropagation()}>
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">Detalle del Profesor</h3>
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
                                        {selectedTeacher.nombre?.charAt(0)}{selectedTeacher.apellido?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">{selectedTeacher.nombre} {selectedTeacher.apellido}</h4>
                                        <p className="text-gray-600">{selectedTeacher.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Código de Empleado</h5>
                                        <p className="font-semibold">{selectedTeacher.codigo_empleado}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Departamento</h5>
                                        <p className="font-semibold">{selectedTeacher.departamento}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Especialidad</h5>
                                        <p className="font-semibold">{selectedTeacher.especialidad}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Fecha de Contratación</h5>
                                        <p className="font-semibold">{formatDate(selectedTeacher.fecha_contratacion)}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Teléfono</h5>
                                        <p className="font-semibold">{selectedTeacher.telefono || 'No registrado'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Fecha de Nacimiento</h5>
                                        <p className="font-semibold">
                                            {selectedTeacher.fecha_nacimiento ? formatDate(selectedTeacher.fecha_nacimiento) : 'No registrada'}
                                        </p>
                                    </div>
                                </div>

                                {/* Podríamos agregar aquí más secciones como materias que imparte, horarios, etc. */}
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

export default Teachers;