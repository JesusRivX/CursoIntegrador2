import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
  Users,
} from "lucide-react";

import { users } from "../../data/auth/users";
import { courses } from "../../data/academic/courses";

const TeacherHome = () => {
  const navigate = useNavigate();

  // =========================================================
  // DOCENTE ACTUAL
  // =========================================================
  // Para el MVP utilizamos un usuario mock.
  // Posteriormente esto puede reemplazarse por el usuario
  // autenticado mediante contexto, localStorage o backend.

  const teacher = users.find((user) => user.rol === "Docente");

  // =========================================================
  // CURSOS ASIGNADOS
  // =========================================================

  const assignedCourses = useMemo(() => {
    if (!teacher?.cursos) {
      return [];
    }

    return courses.filter((course) => teacher.cursos.includes(course.id));
  }, [teacher]);

  // =========================================================
  // DATOS DEL DOCENTE
  // =========================================================

  const teacherName = teacher?.nombre || "Docente";

  const activeCourses = assignedCourses.filter(
    (course) => course.estado === "Activo",
  );

  const totalTopics = assignedCourses.reduce(
    (total, course) => total + course.temas.length,
    0,
  );

  return (
    <div className="space-y-5 pb-8">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 shadow-xl shadow-slate-200 sm:p-8 lg:p-10">
        {/* Decoración */}
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Información */}
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur">
              <GraduationCap className="h-3.5 w-3.5 text-blue-300" />
              ESPACIO DOCENTE
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Hola, {teacherName.split(" ")[0]}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Consulta tus cursos asignados y accede rápidamente a la
              información académica de cada uno.
            </p>

            {/* Resumen */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur">
                <BookOpen className="h-4 w-4 text-blue-300" />

                <div>
                  <p className="text-[10px] font-medium text-slate-400">
                    Cursos asignados
                  </p>

                  <p className="text-sm font-bold text-white">
                    {assignedCourses.length}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />

                <div>
                  <p className="text-[10px] font-medium text-slate-400">
                    Cursos activos
                  </p>

                  <p className="text-sm font-bold text-white">
                    {activeCourses.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Elemento visual */}
          <div className="hidden shrink-0 lg:block">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-[30px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
                <GraduationCap className="h-16 w-16 text-blue-300" />
              </div>

              <div className="absolute -right-6 top-4 flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                ESTUD-IA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RESUMEN
      ========================================================= */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {/* Cursos */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>

            <span className="text-[10px] font-bold text-blue-500">
              Asignados
            </span>
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Mis cursos</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {assignedCourses.length}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">Cursos a tu cargo</p>
        </div>

        {/* Temas */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <LayoutDashboard className="h-5 w-5" />
            </div>

            <span className="text-[10px] font-bold text-violet-500">
              Contenido
            </span>
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">
            Temas disponibles
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {totalTopics}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Dentro de tus cursos
          </p>
        </div>

        {/* Nivel */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="h-5 w-5" />
            </div>

            <span className="text-[10px] font-bold text-emerald-500">
              Académico
            </span>
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">
            Nivel educativo
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {teacher?.nivel || "—"}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            {teacher?.especialidad || "Área académica"}
          </p>
        </div>
      </section>

      {/* =========================================================
          MIS CURSOS
      ========================================================= */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-bold tracking-tight text-slate-900">
              Mis cursos
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Cursos asignados para tu gestión académica
            </p>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {assignedCourses.length}{" "}
            {assignedCourses.length === 1 ? "curso" : "cursos"}
          </span>
        </div>

        {assignedCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {assignedCourses.map((course) => (
              <article
                key={course.id}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                {/* Encabezado */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {course.estado}
                  </span>
                </div>

                {/* Información */}
                <div className="mt-5">
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">
                    {course.nombre}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {course.codigo}
                  </p>

                  <p className="mt-3 text-sm leading-5 text-slate-500">
                    {course.descripcion}
                  </p>
                </div>

                {/* Metadata */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                    {course.nivel}
                  </span>

                  <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                    {course.grado} grado
                  </span>

                  <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                    {course.temas.length}{" "}
                    {course.temas.length === 1 ? "tema" : "temas"}
                  </span>
                </div>

                {/* Acción */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/app/docente/cursos/${course.id}`)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Ver curso
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
              <BookOpen className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-700">
              No tienes cursos asignados
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
              Cuando un administrador te asigne un curso, aparecerá
              automáticamente en este espacio.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeacherHome;
