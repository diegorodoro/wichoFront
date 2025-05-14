import React, { useState, useEffect } from 'react';

// Interfaces basadas en la estructura de la BD
interface Subject {
    materia_id: number;
    codigo: string;
    nombre: string;
    creditos: number;
    descripcion: string;
}

interface Course {
    curso_id: number;
    materia_id: number;
    profesor_id: number;
    semestre: string;
    ano_academico: number;
    cupo_maximo: number;
    activo: boolean;
    // Propiedades adicionales obtenidas de joins
    codigo_materia: string;
    nombre_materia: string;
    creditos: number;
    nombre_profesor: string;
    apellido_profesor: string;
    departamento: string;
    // Información calculada
    cupo_disponible: number;
    horario: string; // Esto podría venir de otra tabla en el backend
}

interface Enrollment {
    inscripcion_id: number;
    estudiante_id: number;
    curso_id: number;
    fecha_inscripcion: string;
    calificacion?: number;
    aprobado?: boolean;
    // Datos adicionales del curso inscrito
    codigo_materia: string;
    nombre_materia: string;
    creditos: number;
    profesor: string;
    horario: string;
}

const Subjects: React.FC = () => {
    const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([]);
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
            const mockCourses: Course[] = [                { 
                    curso_id: 1, 
                    materia_id: 1, 
                    profesor_id: 1, 
                    semestre: "2025-1", // 1: primavera
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
                },                { 
                    curso_id: 2, 
                    materia_id: 2, 
                    profesor_id: 2, 
                    semestre: "2025-1", // 1: primavera
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
                },                { 
                    curso_id: 3, 
                    materia_id: 3, 
                    profesor_id: 3, 
                    semestre: "2025-2", // 2: verano
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
                },                { 
                    curso_id: 4, 
                    materia_id: 4, 
                    profesor_id: 4, 
                    semestre: "2025-2", // 2: verano
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
                },                { 
                    curso_id: 5, 
                    materia_id: 5, 
                    profesor_id: 5, 
                    semestre: "2025-3", // 3: otoño
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
                },                { 
                    curso_id: 6, 
                    materia_id: 6, 
                    profesor_id: 6, 
                    semestre: "2025-3", // 3: otoño
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
        const newEnrollment: Enrollment = {
            inscripcion_id: Date.now() + courseId, // Simulación de ID único
            estudiante_id: 1, // ID del estudiante actual
            curso_id: courseId,
            fecha_inscripcion: new Date().toISOString(),
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
        
        setSuccessMessage('¡Curso inscrito con éxito!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleUnenroll = (inscriptionId: number, courseId: number) => {
        // Buscar el curso que se está dando de baja
        const courseToUnenroll = enrolledCourses.find(course => course.inscripcion_id === inscriptionId);
        
        // Eliminar la inscripción
        setEnrolledCourses(prev => 
            prev.filter(course => course.inscripcion_id !== inscriptionId)
        );
        
        // Aumentar el cupo disponible
        if (courseToUnenroll) {
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
        }
        
        setSuccessMessage('Curso dado de baja con éxito');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const filteredCourses = availableCourses.filter(course => {
        const value = String(course[filterBy as keyof Course]).toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });

    const totalCredits = enrolledCourses.reduce((sum, course) => sum + course.creditos, 0);
    const totalAvailableCourses = availableCourses.length;
    const totalEnrolledCourses = enrolledCourses.length;

    return (
        <div>
            <h1>Subjects</h1>
            <p>Welcome to the Subjects page!</p>
        </div>
    );
};

export default Subjects;