import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentHome from "../pages/student/StudentHome";
import StudentCourses from "../pages/student/StudentCourses";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminHome from "../pages/admin/AdminHome";
import AdminUser from "../pages/admin/AdminUser";
import AdminCourses from "../pages/admin/AdminCourses";

const PrivateRoutes = () => {
  return (
    <Routes>
      {/* ======================================================
          ESTUDIANTE
      ====================================================== */}

      <Route element={<ProtectedRoute role="Estudiante" />}>
        <Route path="estudiante" element={<StudentDashboard />}>
          <Route index element={<StudentHome />} />

          <Route path="cursos" element={<StudentCourses />} />
        </Route>
      </Route>

      {/* ======================================================
          ADMINISTRADOR
      ====================================================== */}

      <Route element={<ProtectedRoute role="Administrador" />}>
        <Route path="admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="usuarios" element={<AdminUser />} />
          <Route path="cursos" element={<AdminCourses />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
