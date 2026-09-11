import { useMemo, useState } from "react";
import { courses } from "../../../data/academic/courses";
import { users } from "../../../data/auth/users";

const gradeOrder = {
  "1ero": 1,
  "2do": 2,
  "3ero": 3,
  "4to": 4,
  "5to": 5,
  "6to": 6,
};

export const useAdminHome = () => {
  const [selectedLevel, setSelectedLevel] = useState("Primaria");

  const students = useMemo(
    () => users.filter((user) => user.rol === "Estudiante"),
    [],
  );

  const studentsByGrade = useMemo(() => {
    const filteredStudents = students.filter(
      (student) => student.nivel === selectedLevel,
    );

    const grouped = filteredStudents.reduce((acc, student) => {
      const grade = student.grado;

      if (!acc[grade]) {
        acc[grade] = 0;
      }

      acc[grade] += 1;

      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([grado, total]) => ({
        grado,
        total,
      }))
      .sort(
        (a, b) => (gradeOrder[a.grado] || 99) - (gradeOrder[b.grado] || 99),
      );
  }, [students, selectedLevel]);

  const maxStudents = useMemo(
    () => Math.max(...studentsByGrade.map((item) => item.total), 1),
    [studentsByGrade],
  );

  const selectedLevelStudents = useMemo(
    () => students.filter((student) => student.nivel === selectedLevel),
    [students, selectedLevel],
  );

  const selectedLevelCourses = useMemo(
    () => courses.filter((course) => course.nivel === selectedLevel),
    [selectedLevel],
  );

  const selectedLevelGrades = useMemo(
    () =>
      [...new Set(selectedLevelStudents.map((student) => student.grado))].sort(
        (a, b) => (gradeOrder[a] || 99) - (gradeOrder[b] || 99),
      ),
    [selectedLevelStudents],
  );

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.estado === "Activo",
  ).length;

  const totalCourses = courses.length;

  const activeCourses = courses.filter(
    (course) => course.estado === "Activo",
  ).length;

  return {
    selectedLevel,
    setSelectedLevel,
    students,
    studentsByGrade,
    maxStudents,
    selectedLevelStudents,
    selectedLevelCourses,
    selectedLevelGrades,
    totalStudents,
    activeStudents,
    totalCourses,
    activeCourses,
  };
};
