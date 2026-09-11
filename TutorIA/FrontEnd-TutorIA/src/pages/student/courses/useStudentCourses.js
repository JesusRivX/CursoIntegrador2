import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { Atom, BookOpen, Calculator, MessageCircle } from "lucide-react";

import { courses } from "../../../data/academic/courses";

const useStudentCourses = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const { courseId } = useParams();

  const studentCourses = useMemo(() => {
    if (!user) {
      return [];
    }

    const assignedCourseIds = Array.isArray(user.cursos) ? user.cursos : [];

    return courses.filter(
      (course) =>
        assignedCourseIds.includes(course.id) &&
        course.nivel === user.nivel &&
        course.grado === user.grado,
    );
  }, [user]);

  const selectedCourse = useMemo(() => {
    if (!courseId) {
      return null;
    }

    return (
      studentCourses.find((course) => course.id === Number(courseId)) || null
    );
  }, [courseId, studentCourses]);

  const getVisual = (name = "") => {
    const value = name.toLowerCase();

    if (value.includes("matem")) {
      return {
        icon: Calculator,
        bg: "bg-blue-50",
        text: "text-blue-600",
        gradient: "from-blue-500 to-cyan-500",
      };
    }

    if (value.includes("comunic")) {
      return {
        icon: MessageCircle,
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        gradient: "from-emerald-500 to-teal-500",
      };
    }

    if (
      value.includes("ciencia") ||
      value.includes("tecnología") ||
      value.includes("tecnologia")
    ) {
      return {
        icon: Atom,
        bg: "bg-violet-50",
        text: "text-violet-600",
        gradient: "from-violet-500 to-purple-500",
      };
    }

    return {
      icon: BookOpen,
      bg: "bg-slate-100",
      text: "text-slate-600",
      gradient: "from-slate-500 to-slate-700",
    };
  };

  const handleCourseClick = (id) => {
    navigate(`/app/estudiante/cursos/${id}`);
  };

  return {
    user,
    courseId,
    studentCourses,
    selectedCourse,
    getVisual,
    handleCourseClick,
  };
};

export default useStudentCourses;
