import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    return (
        <>
            <Header />
            <Outlet /> {/* Aquí se renderiza la pantalla correspondiente */}
            <Footer />
        </>
    );
}

export default Layout;