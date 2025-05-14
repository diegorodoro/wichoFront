import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

/**
 * Componente de perfil que muestra la información del estudiante.
 * 
 * Este componente se integra con el esquema de la base de datos PostgreSQL:
 * - La tabla `usuarios` proporciona los datos básicos del usuario (nombre, apellido, email, etc.)
 * - La tabla `estudiantes` proporciona información académica (matrícula, carrera, semestre)
 * - Los campos como 'phone' y 'address' son extensiones UI que deberían guardarse en la tabla 'usuarios'
 * - Hay campos calculados como 'fullName', 'academicStatus', y 'gpa' para la UI
 */

// Interfaz basada en el esquema de la BD
// Interfaces separadas para reflejar la estructura de la base de datos
interface Usuario {
    usuario_id?: number;
    nombre: string;
    apellido: string;
    email: string;
    nombre_usuario?: string;
    rol_id?: number;
    activo?: boolean;
    fecha_creacion?: string;
    ultimo_acceso?: string;
    phone?: string; // Campo adicional para UI
    address?: string; // Campo adicional para UI
}

interface Estudiante {
    estudiante_id?: number;
    usuario_id?: number;
    matricula: string;
    carrera?: string;
    semestre?: number;
    fecha_ingreso?: string;
}

// Interfaz combinada para facilidad de uso en la aplicación
interface StudentProfile extends Usuario, Estudiante {
    // Campos derivados o calculados no directamente en DB
    academicStatus?: string;
    gpa?: number;
    // Campo calculado para nombre completo
    fullName?: string;
    // Campo para compatibilidad con la UI
    birthDate?: string;
}

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);    // Datos del estudiante desde la BD
    const [studentData, setStudentData] = useState<StudentProfile>({
        // Campos de Usuario
        nombre: user?.name?.split(' ')[0] || 'Nombre',
        apellido: user?.name?.split(' ')[1] || 'Estudiante',
        email: user?.email || 'estudiante@universidad.edu',
        phone: '555-123-4567',
        birthDate: '2000-05-15',
        address: 'Calle Universidad 123',
        fullName: user?.name || 'Nombre Estudiante',

        // Campos de Estudiante (nomenclatura de la BD)
        matricula: 'A12345',
        carrera: 'Ingeniería Informática',
        semestre: 3,
        fecha_ingreso: '2023-08-15',

        // Campos derivados o calculados
        academicStatus: 'Regular',
        gpa: 8.7,
    });

    // Cargar datos del estudiante desde la API
    useEffect(() => {
        const fetchStudentData = async () => {
            if (!user?.id) return;

            setLoading(true);
            try {
                // En un entorno real, esta sería una llamada a la API
                // const response = await fetch(`/api/estudiantes/usuario/${user.id}`);
                // if (!response.ok) throw new Error('Error al cargar datos del estudiante');
                // const data = await response.json();                // Simulamos una respuesta exitosa con datos de prueba
                setTimeout(() => {
                    setStudentData({
                        // Campos de Usuario
                        usuario_id: parseInt(user.id),
                        nombre: user.name.split(' ')[0] || 'Nombre',
                        apellido: user.name.split(' ')[1] || 'Apellido',
                        email: user.email,
                        nombre_usuario: user.email.split('@')[0],
                        phone: '555-123-4567',
                        birthDate: '2000-05-15',
                        address: 'Calle Universidad 123',
                        rol_id: 1, // ID del rol estudiante
                        fullName: user.name, // Campo calculado para la UI

                        // Campos de Estudiante (nomenclatura de la BD)
                        estudiante_id: 1,
                        matricula: 'A12345',
                        carrera: 'Ingeniería Informática',
                        semestre: 3,
                        fecha_ingreso: '2023-08-15',

                        // Campos derivados o calculados
                        academicStatus: 'Regular',
                        gpa: 8.7
                    });
                    setLoading(false);
                }, 800);
            } catch (err) {
                setError('Error al cargar los datos del estudiante');
                setLoading(false);
                console.error(err);
            }
        };

        fetchStudentData();
    }, [user]);    // Estado para los cambios durante la edición
    const [formData, setFormData] = useState({ ...studentData });

    // Actualizar formData cuando se actualiza studentData (al cargar)
    useEffect(() => {
        setFormData({ ...studentData });
    }, [studentData]);    // Lista de campos que el estudiante puede editar (basado en el esquema de BD)
    const editableFields = ['phone', 'address']; // Estos campos no están en la tabla usuarios directamente, sino que son extensiones para la UI

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Verificar si el campo es editable por el estudiante
        if (editableFields.includes(name)) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }; const handleSave = async () => {
        setSaveLoading(true);
        setSaveSuccess(false);
        setError(null);

        try {
            // Crear un objeto con solo los campos editables
            const updatedData: Partial<StudentProfile> = {};
            editableFields.forEach(field => {
                if (field === 'phone') {
                    updatedData.phone = formData.phone;
                } else if (field === 'address') {
                    updatedData.address = formData.address;
                }
            });

            // En un entorno real, esta sería una llamada a la API para actualizar
            // const response = await fetch(`/api/estudiantes/usuario/${user?.id}`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updatedData)
            // });

            // if (!response.ok) throw new Error('Error al actualizar el perfil');

            // Simulación de guardado exitoso
            setTimeout(() => {
                setStudentData(prev => ({
                    ...prev,
                    ...updatedData
                }));
                setEditing(false);
                setSaveLoading(false);
                setSaveSuccess(true);

                // Ocultar el mensaje de éxito después de 3 segundos
                setTimeout(() => setSaveSuccess(false), 3000);
            }, 800);
        } catch (err) {
            setError('Error al actualizar el perfil. Intenta nuevamente.');
            setSaveLoading(false);
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Encabezado con estilo azul */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
                        <p className="text-blue-100">Información personal y académica</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <button
                            onClick={() => setEditing(!editing)}
                            className="bg-white text-blue-700 font-medium px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                        >
                            {editing ? 'Cancelar' : 'Editar Perfil'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        Información Personal
                    </h2>
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row mb-6">                        <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="h-40 w-40 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-5xl font-semibold mx-auto">
                            {`${studentData.nombre?.[0] || ''}${studentData.apellido?.[0] || ''}`}
                        </div>
                    </div>
                        <div className="md:w-3/4 md:pl-8">                            {editing ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={`${formData.nombre} ${formData.apellido}`}
                                    onChange={handleChange}
                                    disabled={true}
                                    className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                                    title="Este campo no puede modificarse"
                                />
                                <p className="text-xs text-gray-500 mt-1">No editable - Contactar administración</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={true}
                                    className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                                    title="Este campo no puede modificarse"
                                />
                                <p className="text-xs text-gray-500 mt-1">No editable - Contactar administración</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                                />
                                <p className="text-xs text-green-600 mt-1">Puedes modificar este campo</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate || ''}
                                    onChange={handleChange}
                                    disabled={true}
                                    className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                                    title="Este campo no puede modificarse"
                                />
                                <p className="text-xs text-gray-500 mt-1">No editable - Contactar administración</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                                />
                                <p className="text-xs text-green-600 mt-1">Puedes modificar este campo</p>
                            </div>
                        </div>
                        ) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Nombre completo</h3>
                                <p className="font-medium text-gray-900">{`${studentData.nombre} ${studentData.apellido}`}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                                <p className="font-medium text-gray-900">{studentData.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                                <p className="font-medium text-gray-900">{studentData.phone}</p>
                            </div>                                    <div>
                                <h3 className="text-sm font-medium text-gray-500">Fecha de nacimiento</h3>
                                <p className="font-medium text-gray-900">
                                    {studentData.birthDate && studentData.birthDate !== ''
                                        ? new Date(studentData.birthDate).toLocaleDateString('es-ES')
                                        : 'No disponible'}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                                <p className="font-medium text-gray-900">{studentData.address}</p>
                            </div>
                        </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-green-500 mt-8">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                        <div className="p-2 bg-green-100 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        Información Académica
                    </h2>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Matrícula</h3>
                            <p className="font-semibold text-gray-900">{studentData.matricula}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Carrera</h3>
                            <p className="font-semibold text-gray-900">{studentData.carrera}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Semestre actual</h3>
                            <p className="font-semibold text-gray-900">{studentData.semestre}º Semestre</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de ingreso</h3>
                            <p className="font-semibold text-gray-900">
                                {studentData.fecha_ingreso && studentData.fecha_ingreso !== ''
                                    ? new Date(studentData.fecha_ingreso).toLocaleDateString('es-ES')
                                    : 'No disponible'}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Estado académico</h3>
                            <p className="font-semibold text-green-600">{studentData.academicStatus}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Promedio general</h3>
                            <p className="font-semibold text-blue-600">{studentData.gpa}</p>
                        </div>
                    </div>
                </div>
            </div>            {/* Estados de carga y mensajes */}
            {loading && (
                <div className="mt-6 bg-blue-50 text-blue-700 p-4 rounded flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cargando datos del estudiante...
                </div>
            )}

            {error && (
                <div className="mt-6 bg-red-50 text-red-700 p-4 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            {saveSuccess && !editing && (
                <div className="mt-6 bg-green-50 text-green-700 p-4 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Perfil actualizado correctamente
                </div>
            )}

            {editing && (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => setEditing(false)}
                        disabled={saveLoading}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors mr-2 disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saveLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                    >
                        {saveLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Guardando...
                            </>
                        ) : (
                            'Guardar Cambios'
                        )}
                    </button>
                </div>
            )}

            {/* Explicación de restricciones de edición */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Nota sobre la información personal</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <p>
                                Solo puedes modificar tu número de teléfono y dirección. Para cambios en tu información académica o datos personales críticos, por favor contacta a la administración de la universidad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
