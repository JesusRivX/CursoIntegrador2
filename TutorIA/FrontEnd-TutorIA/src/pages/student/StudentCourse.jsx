import { useMemo } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react";

import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { courses } from "../../data/academic/courses";

const StudentCourse = () => {
  const navigate = useNavigate();

  const { user, selectedCourse } = useOutletContext();

  const { courseId } = useParams();

  // ============================================================
  // CURSO
  // ============================================================

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

  // ============================================================
  // PROGRESO
  // ============================================================

  const courseProgress = 72;

  const topicProgress = {
    1: 88,
    2: 62,
    3: 48,
    4: 25,
  };

  // ============================================================
  // SI NO EXISTE EL CURSO
  // ============================================================

  if (!course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <BookOpen className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Curso no disponible
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Este curso no está asignado a tu perfil académico o no existe.
          </p>

          <button
            type="button"
            onClick={() => navigate("/app/estudiante/cursos")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a mis cursos
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // ESTADÍSTICAS
  // ============================================================

  const completedTopics = course.temas.filter(
    (topic) => (topicProgress[topic.id] || 0) >= 80,
  ).length;

  const inProgressTopics = course.temas.filter((topic) => {
    const progress = topicProgress[topic.id] || 0;

    return progress > 0 && progress < 80;
  }).length;

  const materialCount = course.temas.filter((topic) => topic.pdf).length;

  return (
    <div className="space-y-6 pb-12">
      {/* ======================================================
          BOTÓN VOLVER
      ====================================================== */}

      <div>
        <button
          type="button"
          onClick={() => navigate("/app/estudiante/cursos")}
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Volver a mis cursos
        </button>
      </div>

      {/* ======================================================
          HEADER DEL CURSO
      ====================================================== */}

      <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-6 shadow-xl sm:p-8 lg:p-9">
        {/* DECORACIÓN */}

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            {/* ==================================================
          INFORMACIÓN DEL CURSO
      ================================================== */}

            <div className="max-w-4xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wide text-blue-200 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                CURSO DE APRENDIZAJE
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {course.nombre}
              </h1>

              <p className="mt-2 text-sm font-medium text-blue-300">
                {course.codigo}
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                {course.descripcion}
              </p>

              {/* INFORMACIÓN */}

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  <GraduationCap className="h-4 w-4 text-blue-300" />

                  {course.nivel}
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  <BookOpen className="h-4 w-4 text-violet-300" />

                  {course.grado}
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  <Target className="h-4 w-4 text-emerald-300" />
                  {course.temas.length} temas
                </span>
              </div>
            </div>

            {/* ==================================================
          PROGRESO
      ================================================== */}

            <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-5 shadow-lg backdrop-blur-xl sm:p-6">
              {/* CABECERA */}

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-200">
                    Mi progreso
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Avance del curso
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <Target className="h-5 w-5" />
                </div>
              </div>

              {/* PORCENTAJE */}

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-5xl font-black leading-none tracking-tight text-white">
                    {courseProgress}%
                  </p>

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Completado
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-blue-300">
                    {courseProgress} / 100
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">progreso</p>
                </div>
              </div>

              {/* BARRA */}

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-violet-400 shadow-lg shadow-blue-500/20 transition-all duration-500"
                  style={{ width: `${courseProgress}%` }}
                />
              </div>

              {/* MENSAJE */}

              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <p className="text-[10px] font-medium text-slate-400">
                  Sigue avanzando para completar el curso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          RESUMEN
      ====================================================== */}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* TEMAS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs text-slate-400">Temas</p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {course.temas.length}
          </p>
        </div>

        {/* COMPLETADOS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs text-slate-400">Completados</p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {completedTopics}
          </p>
        </div>

        {/* EN PROGRESO */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Clock3 className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs text-slate-400">En progreso</p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {inProgressTopics}
          </p>
        </div>

        {/* MATERIALES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <FileText className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs text-slate-400">Materiales</p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {materialCount}
          </p>
        </div>
      </section>

      {/* ======================================================
          TEMAS
      ====================================================== */}

      <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}

        <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen className="h-4 w-4" />
                </div>

                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Ruta de aprendizaje
                </h2>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Selecciona un tema para estudiar, practicar y consultar al Tutor
                IA.
              </p>
            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
              {course.temas.length} unidades
            </span>
          </div>
        </div>

        {/* LISTA */}

        <div className="p-4 sm:p-7">
          <div className="relative">
            {/* Línea vertical */}

            <div className="absolute bottom-8 left-[22px] top-8 hidden w-px bg-slate-200 sm:block" />

            <div className="space-y-4">
              {course.temas.map((topic, index) => {
                const progress = topicProgress[topic.id] || 0;

                const completed = progress >= 80;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() =>
                      navigate(
                        `/app/estudiante/cursos/${course.id}/temas/${topic.id}`,
                      )
                    }
                    className="group relative flex w-full gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md sm:p-5"
                  >
                    {/* NÚMERO */}

                    <div
                      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        completed
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span className="text-xs font-black">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    {/* CONTENIDO */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-black text-slate-800">
                            {topic.nombre}
                          </p>

                          <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-slate-400">
                            {topic.descripcion}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            completed
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {progress}% completado
                        </span>
                      </div>

                      {/* PROGRESO DEL TEMA */}

                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all ${
                            completed
                              ? "bg-emerald-500"
                              : "bg-gradient-to-r from-blue-500 to-violet-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* FOOTER */}

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        {topic.pdf && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                            <FileText className="h-3 w-3" />
                            Material PDF
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600">
                          Estudiar tema
                          <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>

                    {/* FLECHA */}

                    <ChevronRight className="mt-1 hidden h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500 sm:block" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentCourse;
