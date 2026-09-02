import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/student/StudentDashboard";
// import TeacherDashboard from "../pages/teacher/TeacherDashboard";
// import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentHome from "../pages/student/StudentHome";

// import AdminHome from "../pages/admin/AdminHome";
// import AdminUser from "../pages/admin/AdminUser";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/estudiante" element={<StudentDashboard />}>
        <Route index element={<StudentHome />} />
        <Route path="cursos" element={<h1>Mis cursos</h1>} />
        <Route path="tareas" element={<h1>Tareas</h1>} />
        <Route path="tutor" element={<h1>Tutor IA</h1>} />
        <Route path="progreso" element={<h1>Mi progreso</h1>} />
      </Route>

      {/* <Route path="/docente" element={<TeacherDashboard />}>
        <Route index element={<h1>Inicio del docente</h1>} />
      </Route>

      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="usuarios" element={<AdminUser />} />
        <Route path="cursos" element={<h1>Cursos</h1>} />
      </Route> */}
    </Routes>
  );
};

export default PrivateRoutes;
