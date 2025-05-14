import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Acceso no autorizado</h1>
                        <p className="mt-2 text-gray-600">
                            Debe iniciar sesión para ver esta página.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-160px)] py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg">
                    {/* Encabezado del perfil */}
                    <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg">
                        <h3 className="text-lg leading-6 font-medium text-white">Perfil del Usuario</h3>
                        <p className="mt-1 max-w-2xl text-sm text-blue-50">Información personal y académica.</p>
                    </div>

                    {/* Contenido del perfil */}
                    <div className="border-t border-gray-200">
                        {/* Información del perfil */}
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                <div className="flex-shrink-0 mb-4 sm:mb-0">
                                    {user.profileImage ? (
                                        <img
                                            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                                            src={user.profileImage}
                                            alt={user.name}
                                        />
                                    ) : (
                                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-md">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                </div>

                                <div className="sm:ml-6">
                                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                                    <div className="mt-1 flex items-center">
                                        <div className="text-sm text-gray-500">
                                            <p>{user.email}</p>
                                            <p className="mt-1">
                                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                    {user.role}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secciones del perfil */}
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Información Personal</h3>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Rol</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.role}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.id}</dd>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col sm:flex-row-reverse gap-3">
                            <button
                                type="button"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Editar Perfil
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cambiar Contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
