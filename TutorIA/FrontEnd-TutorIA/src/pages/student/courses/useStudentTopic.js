import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { courses } from "../../../data/academic/courses";

const useStudentTopic = () => {
  const navigate = useNavigate();

  const { user } = useOutletContext();
  const { courseId, topicId } = useParams();

  const [topicProgress, setTopicProgress] = useState(0);

  const course = useMemo(() => {
    if (!user || !courseId) {
      return null;
    }

    const assignedCourseIds = Array.isArray(user.cursos) ? user.cursos : [];

    return (
      courses.find(
        (item) =>
          item.id === Number(courseId) &&
          assignedCourseIds.includes(item.id) &&
          item.nivel === user.nivel &&
          item.grado === user.grado,
      ) || null
    );
  }, [courseId, user]);

  const topic = useMemo(() => {
    if (!course || !Array.isArray(course.temas)) {
      return null;
    }

    return course.temas.find((item) => item.id === Number(topicId)) || null;
  }, [course, topicId]);

  const currentTopicIndex = useMemo(() => {
    if (!Array.isArray(course?.temas) || !topic) {
      return -1;
    }

    return course.temas.findIndex((item) => item.id === topic.id);
  }, [course, topic]);

  const nextTopic = useMemo(() => {
    if (
      !Array.isArray(course?.temas) ||
      currentTopicIndex === -1 ||
      currentTopicIndex >= course.temas.length - 1
    ) {
      return null;
    }

    return course.temas[currentTopicIndex + 1];
  }, [course, currentTopicIndex]);

  const previousTopic = useMemo(() => {
    if (!Array.isArray(course?.temas) || currentTopicIndex <= 0) {
      return null;
    }

    return course.temas[currentTopicIndex - 1];
  }, [course, currentTopicIndex]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setTopicProgress(100);
        return;
      }

      const progress = Math.min(
        100,
        Math.max(0, Math.round((scrollTop / documentHeight) * 100)),
      );

      setTopicProgress(progress);
    };

    calculateProgress();

    window.addEventListener("scroll", calculateProgress, {
      passive: true,
    });

    window.addEventListener("resize", calculateProgress);

    return () => {
      window.removeEventListener("scroll", calculateProgress);

      window.removeEventListener("resize", calculateProgress);
    };
  }, [topicId]);

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
    if (!course) {
      return;
    }

    navigate(`/app/estudiante/cursos/${course.id}/temas/${id}`);
  };

  const goBackToCourse = () => {
    if (!course) {
      return;
    }

    navigate(`/app/estudiante/cursos/${course.id}`);
  };

  const goToCourses = () => {
    navigate("/app/estudiante/cursos");
  };

  return {
    user,

    course,
    topic,

    courseId,
    topicId,

    currentTopicIndex,
    nextTopic,
    previousTopic,

    topicProgress,
    progressLabel,

    goToTopic,
    goBackToCourse,
    goToCourses,
  };
};

export default useStudentTopic;
