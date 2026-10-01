import api from "../api/axios";

export const getStudentCourses = async () => {
  const response = await api.get("/student/dashboard-cursos");
  return response.data;
};
