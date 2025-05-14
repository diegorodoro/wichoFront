import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./views/Main/Main";
import Subjects from "./views/Subjects/Subjects";
import Teachers from "./views/Teachers/Teachers";
import Students from "./views/Students/Students";
import Profile from "./views/Profile/Profile";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz que redirige a /inicio */}
        <Route path="/" element={<Navigate to="/inicio" />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rutas con layout */}
        <Route element={<Layout />}>
          <Route path="/inicio" element={<Main />} />
          <Route path="/materias" element={<Subjects />} />
          <Route path="/profesores" element={<Teachers />} />
          <Route path="/alumnos" element={<Students />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        {/* Ruta por defecto para cualquier otra URL no definida */}
        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
