import { useNavigate, useOutletContext } from "react-router-dom";
import { Calculator, Atom, MessageCircle } from "lucide-react";

const useStudentHome = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const courses = [
    {
      name: "Matemática",
      progress: 72,
      color: "blue",
      icon: Calculator,
    },
    {
      name: "Ciencia y Tecnología",
      progress: 48,
      color: "violet",
      icon: Atom,
    },
    {
      name: "Comunicación",
      progress: 86,
      color: "emerald",
      icon: MessageCircle,
    },
  ];

  const handleTutorNavigation = () => {
    navigate("/app/estudiante/tutor", {
      state: { user },
    });
  };

  return {
    user,
    courses,
    handleTutorNavigation,
  };
};

export default useStudentHome;
