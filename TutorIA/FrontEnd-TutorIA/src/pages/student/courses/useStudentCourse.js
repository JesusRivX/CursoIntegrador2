import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getStudentCourse,
  patchStudentTopicProgress,
} from "../../../services/student/student.service";

const useStudentCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setCourse(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await getStudentCourse(courseId);

        setCourse(response?.data || null);
      } catch (error) {
        setCourse(null);

        setError(
          error?.response?.data?.message ||
            "No se pudo obtener la información del curso.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const courseProgress = useMemo(() => {
    if (!course?.temas?.length) {
      return 0;
    }

    const totalProgress = course.temas.reduce(
      (total, topic) => total + (Number(topic.progreso) || 0),
      0,
    );

    return Math.round(totalProgress / course.temas.length);
  }, [course]);

  const completedTopics = useMemo(() => {
    if (!course?.temas?.length) {
      return 0;
    }

    return course.temas.filter((topic) => topic.estado === "Completado").length;
  }, [course]);

  const inProgressTopics = useMemo(() => {
    if (!course?.temas?.length) {
      return 0;
    }

    return course.temas.filter(
      (topic) =>
        topic.progreso > 0 &&
        topic.progreso < 100 &&
        topic.estado !== "Completado",
    ).length;
  }, [course]);

  const materialCount = 0;

  const getTopicProgress = (topicId) => {
    const topic = course?.temas?.find((item) => item.tema_id === topicId);

    return topic?.progreso || 0;
  };

  const goToCourses = () => {
    navigate("/app/estudiante/cursos");
  };

  const goToTopic = async (topicId) => {
    if (!course?.curso_id || !topicId) {
      return;
    }

    try {
      await patchStudentTopicProgress(course.curso_id, topicId);
      navigate(`/app/estudiante/cursos/${course.curso_id}/temas/${topicId}`);
    } catch (error) {
      console.error("No se pudo actualizar el progreso del tema:", error);
      navigate(`/app/estudiante/cursos/${course.curso_id}/temas/${topicId}`);
    }
  };

  return {
    course,
    courseProgress,
    completedTopics,
    inProgressTopics,
    materialCount,
    getTopicProgress,
    loading,
    error,
    goToCourses,
    goToTopic,
  };
};

export default useStudentCourse;
