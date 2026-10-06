import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStudentTopic } from "../../../services/student/student.service";

const useStudentTopic = () => {
  const navigate = useNavigate();

  const { courseId, topicId } = useParams();

  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      if (!courseId || !topicId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await getStudentTopic(courseId, topicId);

        setTopicData(response?.data || null);
      } catch (error) {
        setTopicData(null);

        setError(
          error?.response?.data?.message ||
            "No se pudo obtener la información del tema.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [courseId, topicId]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  const topicProgress = useMemo(() => {
    return Number(topicData?.progreso) || 0;
  }, [topicData]);

  const progressLabel = useMemo(() => {
    if (topicProgress >= 100) {
      return "¡Tema completado!";
    }

    if (topicProgress >= 75) {
      return "¡Ya casi lo logras!";
    }

    if (topicProgress >= 50) {
      return "Vas por muy buen camino";
    }

    if (topicProgress >= 25) {
      return "Sigue construyendo tu aprendizaje";
    }

    return "Comencemos a aprender";
  }, [topicProgress]);

  const goToTopic = (id) => {
    if (!courseId) {
      return;
    }

    navigate(`/app/estudiante/cursos/${courseId}/temas/${id}`);
  };

  const goBackToCourse = () => {
    if (!courseId) {
      return;
    }

    navigate(`/app/estudiante/cursos/${courseId}`);
  };

  const goToCourses = () => {
    navigate("/app/estudiante/cursos");
  };

  return {
    topicData,

    courseId,
    topicId,

    topicProgress,
    progressLabel,

    loading,
    error,

    goToTopic,
    goBackToCourse,
    goToCourses,
  };
};

export default useStudentTopic;
