import api from "../api/axios";

export const getStudentCourses = async () => {
  const response = await api.get("/student/dashboard-cursos");
  return response.data;
};

export const getStudentCourse = async (courseId) => {
  const response = await api.get(`/student/dashboard-cursos/${courseId}`);
  return response.data;
};

export const getStudentTopic = async (courseId, topicId) => {
  const response = await api.get(
    `/student/dashboard-cursos/${courseId}/temas/${topicId}`,
  );
  return response.data;
};

export const patchStudentTopicProgress = async (courseId, topicId) => {
  const response = await api.patch(
    `/student/dashboard-cursos/${courseId}/temas/${topicId}`,
  );
  return response.data;
};
