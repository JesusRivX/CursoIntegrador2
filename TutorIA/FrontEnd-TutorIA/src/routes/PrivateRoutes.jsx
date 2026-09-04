import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentHome from "../pages/student/StudentHome";


import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminHome from "../pages/admin/AdminHome";
import AdminUser from "../pages/admin/AdminUser";


const PrivateRoutes = () => {
  return (
    <Routes>
      {/* ======================================================
          ESTUDIANTE
      ====================================================== */}

      <Route element={<ProtectedRoute role="Estudiante" />}>
        <Route path="estudiante" element={<StudentDashboard />}>
          <Route index element={<StudentHome />} />
        </Route>
      </Route>

      {/* ======================================================
          ADMINISTRADOR
      ====================================================== */}

      <Route element={<ProtectedRoute role="Administrador" />}>
        <Route path="admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="usuarios" element={<AdminUser />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
