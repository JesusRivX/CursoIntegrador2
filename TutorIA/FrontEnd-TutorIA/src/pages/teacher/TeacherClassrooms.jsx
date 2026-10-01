import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  Users,
  AlertTriangle,
  Award,
  X,
  UserRound,
  Eye,
} from "lucide-react";

import { users } from "../../data/auth/users";
import { courses } from "../../data/academic/courses";

const TeacherClassrooms = () => {
  // =========================================================
  // DOCENTE ACTUAL
  // =========================================================

  const teacher = users.find((user) => user.rol === "Docente");

  // =========================================================
  // CURSOS ASIGNADOS
  // =========================================================

  const assignedCourses = useMemo(() => {
    if (!teacher?.cursos?.length) {
      return [];
    }

    return courses.filter((course) => teacher.cursos.includes(course.id));
  }, [teacher]);

  // =========================================================
  // AULA SELECCIONADA
  // =========================================================

  const [selectedCourseId, setSelectedCourseId] = useState(
    assignedCourses[0]?.id || null,
  );

  const selectedCourse = useMemo(() => {
    return (
      assignedCourses.find((course) => course.id === selectedCourseId) ||
      assignedCourses[0] ||
      null
    );
  }, [assignedCourses, selectedCourseId]);

  // =========================================================
  // MODAL DE ALUMNOS
  // =========================================================

  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);

  // =========================================================
  // ALUMNOS DEL AULA SELECCIONADA
  //
  // Se determina mediante:
  // nivel + grado
  // =========================================================

  const classroomStudents = useMemo(() => {
    if (!selectedCourse) {
      return [];
    }

    return users.filter(
      (user) =>
        user.rol === "Estudiante" &&
        user.nivel === selectedCourse.nivel &&
        user.grado === selectedCourse.grado &&
        user.estado === "Activo",
    );
  }, [selectedCourse]);

  // =========================================================
  // DATOS DE MÉTRICAS
  //
  // Datos demostrativos para frontend.
  // Posteriormente pueden venir de una API.
  // =========================================================

  const classroomMetrics = useMemo(() => {
    const metrics = {};

    assignedCourses.forEach((course, courseIndex) => {
      const studentUsers = users.filter(
        (user) =>
          user.rol === "Estudiante" &&
          user.nivel === course.nivel &&
          user.grado === course.grado &&
          user.estado === "Activo",
      );

      const students = studentUsers.length;

      const avance =
        students > 0 ? Math.min(100, 68 + courseIndex * 7 + students * 2) : 0;

      const desempeno =
        students > 0 ? Math.min(100, 72 + courseIndex * 5 + students) : 0;

      const completados =
        students > 0 ? Math.round((students * avance) / 100) : 0;

      const destacados =
        students > 0 ? Math.max(0, Math.round(students * 0.4)) : 0;

      const atencion =
        students > 0 ? Math.max(0, students - destacados - 1) : 0;

      metrics[course.id] = {
        alumnos: students,
        avance,
        desempeno,
        completados,
        destacados,
        atencion,
      };
    });

    return metrics;
  }, [assignedCourses]);

  // =========================================================
  // MÉTRICAS GENERALES
  // =========================================================

  const globalMetrics = useMemo(() => {
    if (!assignedCourses.length) {
      return {
        aulas: 0,
        alumnos: 0,
        avance: 0,
        desempeno: 0,
      };
    }

    const aulas = assignedCourses.length;

    const alumnos = assignedCourses.reduce(
      (total, course) => total + (classroomMetrics[course.id]?.alumnos || 0),
      0,
    );

    const avance = Math.round(
      assignedCourses.reduce(
        (total, course) => total + (classroomMetrics[course.id]?.avance || 0),
        0,
      ) / aulas,
    );

    const desempeno = Math.round(
      assignedCourses.reduce(
        (total, course) =>
          total + (classroomMetrics[course.id]?.desempeno || 0),
        0,
      ) / aulas,
    );

    return {
      aulas,
      alumnos,
      avance,
      desempeno,
    };
  }, [assignedCourses, classroomMetrics]);

  // =========================================================
  // ESTADO VACÍO
  // =========================================================

  if (!assignedCourses.length) {
    return (
      <div className="flex min-h-125 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
            <BarChart3 className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-800">
            No tienes aulas asignadas
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Cuando tengas cursos y aulas asignadas, podrás consultar aquí el
            avance y desempeño de tus alumnos.
          </p>
        </div>
      </div>
    );
  }

  const selectedMetrics = classroomMetrics[selectedCourse?.id] || {
    alumnos: 0,
    avance: 0,
    desempeno: 0,
    completados: 0,
    destacados: 0,
    atencion: 0,
  };

  return (
    <div className="space-y-6 pb-10">
      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 shadow-xl shadow-slate-200 sm:p-8">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur">
            <BarChart3 className="h-3.5 w-3.5" />
            MÉTRICAS ACADÉMICAS
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Desempeño de mis aulas
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Consulta el avance, desempeño y composición de tus aulas para
            conocer el progreso de tus alumnos.
          </p>
        </div>
      </section>

      {/* =====================================================
          MÉTRICAS GENERALES
      ===================================================== */}

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* AULAS */}

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Aulas
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            {globalMetrics.aulas}
          </p>

          <p className="mt-1 text-xs text-slate-400">Cursos asignados</p>
        </div>

        {/* ALUMNOS */}

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Users className="h-5 w-5" />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Alumnos
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            {globalMetrics.alumnos}
          </p>

          <p className="mt-1 text-xs text-slate-400">Alumnos en tus aulas</p>
        </div>

        {/* AVANCE */}

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Avance
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            {globalMetrics.avance}%
          </p>

          <p className="mt-1 text-xs text-slate-400">Avance promedio</p>
        </div>

        {/* DESEMPEÑO */}

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Activity className="h-5 w-5" />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Desempeño
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            {globalMetrics.desempeno}%
          </p>

          <p className="mt-1 text-xs text-slate-400">Rendimiento promedio</p>
        </div>
      </section>

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <section className="grid gap-5 lg:grid-cols-[280px_1fr]">
        {/* ===================================================
            LISTA DE AULAS
        =================================================== */}

        <aside className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="px-1">
            <h2 className="text-sm font-bold text-slate-900">Mis aulas</h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Selecciona un aula para consultar sus métricas
            </p>
          </div>

          <div className="mt-4 space-y-1.5">
            {assignedCourses.map((course) => {
              const metrics = classroomMetrics[course.id];

              const isSelected = selectedCourse?.id === course.id;

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isSelected
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-xs font-semibold ${
                        isSelected ? "text-blue-700" : "text-slate-700"
                      }`}
                    >
                      {course.nombre}
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {course.grado} · {metrics?.alumnos || 0} alumnos
                    </p>
                  </div>

                  <ChevronRight
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isSelected ? "text-blue-500" : "text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </aside>

        {/* ===================================================
            MÉTRICAS DEL AULA
        =================================================== */}

        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {/* ENCABEZADO DEL AULA */}

          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-600">
                  <GraduationCap className="h-3 w-3" />
                  AULA
                </div>

                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                  {selectedCourse?.nombre}
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {selectedCourse?.codigo}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Seguimiento activo
              </div>
            </div>
          </div>

          {/* =================================================
              MÉTRICAS PRINCIPALES
          ================================================= */}

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            {/* AVANCE */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Avance de alumnos
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {selectedMetrics.avance}%
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${selectedMetrics.avance}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-[10px] text-slate-400">
                Progreso promedio de la clase
              </p>
            </div>

            {/* DESEMPEÑO */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Desempeño
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {selectedMetrics.desempeno}%
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Activity className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-violet-600 transition-all"
                  style={{
                    width: `${selectedMetrics.desempeno}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-[10px] text-slate-400">
                Rendimiento académico promedio
              </p>
            </div>
          </div>

          {/* =================================================
              ALUMNOS DEL AULA
          ================================================= */}

          <div className="border-t border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 rounded-2xl bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Users className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-blue-300">
                    Alumnos del aula
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-white">
                    {classroomStudents.length}{" "}
                    {classroomStudents.length === 1
                      ? "estudiante"
                      : "estudiantes"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {selectedCourse?.nivel} · {selectedCourse?.grado}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsStudentsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <Eye className="h-4 w-4" />
                Ver alumnos
              </button>
            </div>
          </div>

          {/* =================================================
              RESUMEN DE ALUMNOS
          ================================================= */}

          <div className="border-t border-slate-100 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Estado de los alumnos
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Distribución según su progreso
                </p>
              </div>

              <Users className="h-5 w-5 text-slate-300" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {/* TOTAL */}

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Users className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Total</p>

                    <p className="text-lg font-bold text-slate-800">
                      {selectedMetrics.alumnos}
                    </p>
                  </div>
                </div>
              </div>

              {/* BUEN PROGRESO */}

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <Award className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[10px] text-emerald-600">
                      Buen progreso
                    </p>

                    <p className="text-lg font-bold text-slate-800">
                      {selectedMetrics.destacados}
                    </p>
                  </div>
                </div>
              </div>

              {/* ATENCIÓN */}

              <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[10px] text-orange-600">
                      Requieren atención
                    </p>

                    <p className="text-lg font-bold text-slate-800">
                      {selectedMetrics.atencion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              INFORMACIÓN ACADÉMICA
          ================================================= */}

          <div className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {/* NIVEL */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Nivel educativo
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {selectedCourse?.nivel}
                    </p>
                  </div>
                </div>
              </div>

              {/* GRADO */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Grado
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {selectedCourse?.grado}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-slate-950 p-5">
              <p className="text-xs font-semibold text-blue-300">
                Descripción del aula
              </p>

              <p className="mt-2 text-sm font-bold text-white">
                {selectedCourse?.nombre}
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400">
                {selectedCourse?.descripcion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MODAL DE ALUMNOS
      ===================================================== */}

      {isStudentsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsStudentsModalOpen(false);
            }
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
            {/* HEADER MODAL */}

            <div className="relative overflow-hidden bg-slate-950 px-6 py-5">
              <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-blue-200">
                    <Users className="h-3 w-3" />
                    LISTADO DE ALUMNOS
                  </div>

                  <h2 className="mt-3 text-xl font-bold text-white">
                    Alumnos del aula
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {selectedCourse?.nombre} · {selectedCourse?.grado}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStudentsModalOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CONTENIDO */}

            <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-6">
              {/* RESUMEN */}

              <div className="mb-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-500">
                    Nivel
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {selectedCourse?.nivel}
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-500">
                    Grado
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {selectedCourse?.grado}
                  </p>
                </div>
              </div>

              {/* LISTADO */}

              {classroomStudents.length > 0 ? (
                <div className="space-y-2">
                  {classroomStudents.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/30"
                    >
                      {/* AVATAR */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <UserRound className="h-5 w-5" />
                      </div>

                      {/* INFORMACIÓN */}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {student.nombre}
                        </p>

                        <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                          Código: {student.codigo}
                        </p>
                      </div>

                      {/* NÚMERO */}

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 px-5 py-10 text-center">
                  <Users className="mx-auto h-8 w-8 text-slate-300" />

                  <p className="mt-3 text-sm font-bold text-slate-600">
                    No hay alumnos registrados
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    No existen estudiantes activos para este nivel y grado.
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Total:{" "}
                  <span className="font-bold text-slate-700">
                    {classroomStudents.length}
                  </span>{" "}
                  {classroomStudents.length === 1 ? "alumno" : "alumnos"}
                </p>

                <button
                  type="button"
                  onClick={() => setIsStudentsModalOpen(false)}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherClassrooms;
