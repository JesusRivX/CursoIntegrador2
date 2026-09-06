import { useMemo } from "react";

import {
  ArrowRight,
  Atom,
  BookOpen,
  Calculator,
  ChevronRight,
  GraduationCap,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

import { courses } from "../../data/academic/courses";

const StudentCourses = () => {
  const navigate = useNavigate();

  // ============================================================
  // USUARIO
  // ============================================================
  //
  // Este user viene directamente desde:
  //
  // StudentDashboard
  //
  // <Outlet context={{ user }} />
  //
  // ============================================================

  const { user } = useOutletContext();

  // ============================================================
  // PARÁMETROS DE LA URL
  // ============================================================
  //
  // En:
  //
  // /estudiante/cursos
  //
  // courseId = undefined
  //
  // En:
  //
  // /estudiante/cursos/1
  //
  // courseId = "1"
  //
  // En:
  //
  // /estudiante/cursos/1/temas/2
  //
  // courseId = "1"
  //
  // ============================================================

  const { courseId } = useParams();

  console.log("====================================");
  console.log("StudentCourses");
  console.log("user:", user);
  console.log("courseId:", courseId);
  console.log("====================================");

  // ============================================================
  // CURSOS DEL ESTUDIANTE
  // ============================================================

  const studentCourses = useMemo(() => {
    if (!user) {
      return [];
    }

    const assignedCourseIds = Array.isArray(user.cursos) ? user.cursos : [];

    console.log("Cursos asignados:", assignedCourseIds);
    console.log("Nivel:", user.nivel);
    console.log("Grado:", user.grado);

    return courses.filter((course) => {
      return (
        assignedCourseIds.includes(course.id) &&
        course.nivel === user.nivel &&
        course.grado === user.grado
      );
    });
  }, [user]);

  // ============================================================
  // CURSO SELECCIONADO
  // ============================================================

  const selectedCourse = useMemo(() => {
    if (!courseId) {
      return null;
    }

    const id = Number(courseId);

    const foundCourse = studentCourses.find((course) => course.id === id);

    console.log("====================================");
    console.log("Buscando curso:", id);
    console.log("Curso encontrado:", foundCourse);
    console.log("====================================");

    return foundCourse || null;
  }, [courseId, studentCourses]);

  // ============================================================
  // VISUAL DE CADA CURSO
  // ============================================================

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

  // ============================================================
  // RUTA HIJA
  // ============================================================
  //
  // Si existe courseId:
  //
  // /cursos/1
  //
  // o:
  //
  // /cursos/1/temas/2
  //
  // NO mostramos la lista.
  //
  // Mostramos el componente hijo mediante Outlet.
  //
  // Y MUY IMPORTANTE:
  //
  // volvemos a pasar el user.
  //
  // ============================================================

  if (courseId) {
    console.log("====================================");
    console.log("PASANDO CONTEXT A STUDENTCOURSE");
    console.log({
      user,
      studentCourses,
      selectedCourse,
    });
    console.log("====================================");

    return (
      <Outlet
        context={{
          user,
          studentCourses,
          selectedCourse,
        }}
      />
    );
  }

  // ============================================================
  // LISTA PRINCIPAL
  // ============================================================

  return (
    <div className="space-y-6 pb-12">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-7 shadow-xl sm:p-9">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-blue-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            MI ESPACIO ACADÉMICO
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Mis cursos
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Explora tus cursos, estudia los temas y continúa avanzando a tu
            propio ritmo.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">
              <GraduationCap className="h-4 w-4 text-blue-300" />
              {user?.nivel || "—"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">
              <BookOpen className="h-4 w-4 text-violet-300" />
              {user?.grado || "—"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              {studentCourses.length} cursos
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================
          CURSOS
      ====================================================== */}

      {studentCourses.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {studentCourses.map((course) => {
            const visual = getVisual(course.nombre);

            const Icon = visual.icon;

            return (
              <button
                key={course.id}
                type="button"
                onClick={() => navigate(`/app/estudiante/cursos/${course.id}`)}
                className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* COLOR */}

                <div className={`h-2 bg-gradient-to-r ${visual.gradient}`} />

                <div className="p-6">
                  {/* ICONO */}

                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${visual.bg} ${visual.text}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-300 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* CÓDIGO */}

                  <p className="mt-6 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {course.codigo}
                  </p>

                  {/* NOMBRE */}

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    {course.nombre}
                  </h2>

                  {/* DESCRIPCIÓN */}

                  <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-500">
                    {course.descripcion}
                  </p>

                  {/* INFORMACIÓN */}

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-[10px] text-slate-400">Contenido</p>

                      <p className="mt-1 text-sm font-black text-slate-800">
                        {course.temas?.length || 0} temas
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[11px] font-black text-blue-600">
                      Entrar
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      ) : (
        /* ====================================================
           SIN CURSOS
           ==================================================== */

        <section className="rounded-[26px] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <BookOpen className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-lg font-black text-slate-900">
            No tienes cursos asignados
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-400">
            Actualmente no existen cursos que coincidan con tu nivel y grado
            académico.
          </p>
        </section>
      )}
    </div>
  );
};

export default StudentCourses;
