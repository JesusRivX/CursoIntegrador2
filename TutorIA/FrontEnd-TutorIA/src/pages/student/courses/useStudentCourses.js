import { useMemo, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Atom, BookOpen, Calculator, MessageCircle } from "lucide-react";
import { getStudentCourses } from "../../../services/student/student.service";

const useStudentCourses = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const { courseId } = useParams();

  const [coursesData, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authUser = useMemo(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  }, []);

  const studentId = authUser?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await getStudentCourses(studentId);

        setCoursesData(response?.data || null);
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            "No se pudieron obtener los cursos.",
        );

        setCoursesData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [studentId]);

  const studentCourses = useMemo(() => {
    return coursesData?.cursos || [];
  }, [coursesData]);

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
        gradient: "bg-blue-500",
      };
    }

    if (value.includes("comunic")) {
      return {
        icon: MessageCircle,
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        gradient: "bg-emerald-500",
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
        gradient: "bg-violet-500",
      };
    }

    return {
      icon: BookOpen,
      bg: "bg-slate-100",
      text: "text-slate-600",
      gradient: "bg-slate-500",
    };
  };

  const handleCourseClick = (id) => {
    navigate(`/app/estudiante/cursos/${id}`);
  };

  return {
    user,
    authUser,
    studentId,
    courseId,
    coursesData,
    studentCourses,
    selectedCourse,
    loading,
    error,
    getVisual,
    handleCourseClick,
  };
};

export default useStudentCourses;
