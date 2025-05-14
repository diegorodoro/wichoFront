import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutAdmin from "./views/Admin/LayoutAdmin";
import LayoutStudent from "./views/Student/LayoutStudent";
import { useAuth } from "./context/AuthContext";

// Importaciones para vistas de admin
import AdminMain from "./views/Student/Main/Main";
import AdminStudents from "./views/Admin/Students/Students";
import AdminTeachers from "./views/Admin/Teachers/Teachers";
import AdminProfile from "./views/Student/Profile/Profile";

// Importaciones para vistas de estudiante
import StudentMain from "./views/Student/Main/Main";
import StudentProfile from "./views/Student/Profile/Profile";
import Grades from "./views/Student/Grades/Grades";

// Vistas compartidas
import Subjects from "./views/Student/Subjects/Subjects";

// Autenticación
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";

// Componente para redirección según rol
const RoleBasedRedirect = ({ adminPath, studentPath }: { adminPath: string, studentPath: string }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "Administrador";
  return <Navigate to={isAdmin ? adminPath : studentPath} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz que redirige al inicio */}
        <Route path="/" element={<Navigate to="/inicio" />} />

        {/* Rutas de autenticación */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rutas de administrador */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="" element={<AdminMain />} />
          <Route path="inicio" element={<AdminMain />} />
          <Route path="materias" element={<Subjects />} />
          <Route path="alumnos" element={<AdminStudents />} />
          <Route path="profesores" element={<AdminTeachers />} />
          <Route path="perfil" element={<AdminProfile />} />
        </Route>

        {/* Rutas de estudiante */}
        <Route path="/estudiante" element={<LayoutStudent />}>
          <Route path="" element={<StudentMain />} />
          <Route path="inicio" element={<StudentMain />} />
          <Route path="materias" element={<Subjects />} />
          <Route path="perfil" element={<StudentProfile />} />
          <Route path="calificaciones" element={<Grades />} />
        </Route>

        {/* Redirección de rutas antiguas a las nuevas según rol */}
        <Route path="/inicio" element={
          <RoleBasedRedirect adminPath="/admin/inicio" studentPath="/estudiante/inicio" />
        } />
        <Route path="/materias" element={
          <RoleBasedRedirect adminPath="/admin/materias" studentPath="/estudiante/materias" />
        } />
        <Route path="/profesores" element={
          <Navigate to="/admin/profesores" />
        } />
        <Route path="/alumnos" element={
          <Navigate to="/admin/alumnos" />
        } />
        <Route path="/calificaciones" element={
          <Navigate to="/estudiante/calificaciones" />
        } />
        <Route path="/perfil" element={
          <RoleBasedRedirect adminPath="/admin/perfil" studentPath="/estudiante/perfil" />
        } />

        {/* Ruta por defecto para cualquier otra URL no definida */}
        <Route path="*" element={
          <RoleBasedRedirect adminPath="/admin/inicio" studentPath="/estudiante/inicio" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
