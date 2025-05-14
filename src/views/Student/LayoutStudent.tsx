import { Outlet } from "react-router-dom";
import Header from "./HeaderStudent";
import Footer from "./FooterStudent";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <Header />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet /> {/* Aquí se renderiza la pantalla correspondiente */}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;