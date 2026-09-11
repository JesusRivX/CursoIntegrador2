import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentHome from "../pages/student/home/StudentHome";
import StudentCourses from "../pages/student/courses/StudentCourses";
import StudentCourse from "../pages/student/courses/StudentCourse";
import StudentPractice from "../pages/student/practice/StudentPractice";
import StudentTutor from "../pages/student/tutor/StudentTutor";
import StudentTopic from "../pages/student/courses/StudentTopic";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminHome from "../pages/admin/home/AdminHome";
import AdminUser from "../pages/admin/users/AdminUser";
import AdminCourses from "../pages/admin/courses/AdminCourses";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute role="Estudiante" />}>
        <Route path="estudiante" element={<StudentDashboard />}>
          <Route index element={<StudentHome />} />

          <Route path="cursos" element={<StudentCourses />}>
            <Route path=":courseId" element={<StudentCourse />} />
            <Route path=":courseId/temas/:topicId" element={<StudentTopic />} />
          </Route>
          <Route path="practica" element={<StudentPractice />} />
          <Route path="tutor" element={<StudentTutor />} />
        </Route>
      </Route>

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
