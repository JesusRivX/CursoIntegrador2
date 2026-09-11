import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { courses } from "../../../data/academic/courses";

const topicProgress = {
  1: 88,
  2: 62,
  3: 48,
  4: 25,
};

const useStudentCourse = () => {
  const navigate = useNavigate();
  const { user, selectedCourse } = useOutletContext();
  const { courseId } = useParams();

  const course = useMemo(() => {
    if (selectedCourse) {
      return selectedCourse;
    }

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
  }, [selectedCourse, user, courseId]);

  const courseProgress = 72;

  const completedTopics = useMemo(() => {
    if (!course) {
      return 0;
    }

    return course.temas.filter((topic) => (topicProgress[topic.id] || 0) >= 80)
      .length;
  }, [course]);

  const inProgressTopics = useMemo(() => {
    if (!course) {
      return 0;
    }

    return course.temas.filter((topic) => {
      const progress = topicProgress[topic.id] || 0;

      return progress > 0 && progress < 80;
    }).length;
  }, [course]);

  const materialCount = useMemo(() => {
    if (!course) {
      return 0;
    }

    return course.temas.filter((topic) => topic.pdf).length;
  }, [course]);

  const goToCourses = () => {
    navigate("/app/estudiante/cursos");
  };

  const goToTopic = (topicId) => {
    navigate(`/app/estudiante/cursos/${course.id}/temas/${topicId}`);
  };

  const getTopicProgress = (topicId) => {
    return topicProgress[topicId] || 0;
  };

  return {
    course,
    courseProgress,
    completedTopics,
    inProgressTopics,
    materialCount,
    getTopicProgress,
    goToCourses,
    goToTopic,
  };
};

export default useStudentCourse;
