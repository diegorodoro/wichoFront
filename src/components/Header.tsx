const Header = () => {
    return (
        <header className="bg-white shadow py-4 px-8">
            <div className="flex items-center">
                <h1 className="text-lg font-bold">Universidad</h1>
                <div className="ml-auto flex space-x-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Inicio</button>
                    <button className="px-4 py-2 bg-gray-200 rounded">Cursos</button>
                </div>
            </div>
        </header>
    );
};

export default Header;