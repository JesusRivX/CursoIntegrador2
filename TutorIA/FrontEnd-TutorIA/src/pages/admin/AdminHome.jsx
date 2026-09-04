import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    ChevronDown,
    GraduationCap,
    LayoutDashboard,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserPlus,
    Users,
    AlertTriangle,
    Target,
    Layers3,
} from "lucide-react";

import { users } from "../../data/auth/users";
import { courses } from "../../data/academic/courses";

const AdminHome = () => {
    const navigate = useNavigate();

    const [selectedLevel, setSelectedLevel] = useState("Primaria");

    // =========================================================
    // ALUMNOS
    // =========================================================

    const students = users.filter((user) => user.rol === "Estudiante");

    const gradeOrder = {
        "1ero": 1,
        "2do": 2,
        "3ero": 3,
        "4to": 4,
        "5to": 5,
        "6to": 6,
    };

    // =========================================================
    // ALUMNOS POR GRADO
    // =========================================================

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
            .sort((a, b) => {
                return (gradeOrder[a.grado] || 99) - (gradeOrder[b.grado] || 99);
            });
    }, [students, selectedLevel]);

    const maxStudents = Math.max(...studentsByGrade.map((item) => item.total), 1);

    const selectedLevelStudents = students.filter(
        (student) => student.nivel === selectedLevel,
    );

    const selectedLevelCourses = courses.filter(
        (course) => course.nivel === selectedLevel,
    );

    const selectedLevelGrades = [
        ...new Set(selectedLevelStudents.map((student) => student.grado)),
    ].sort((a, b) => {
        return (gradeOrder[a] || 99) - (gradeOrder[b] || 99);
    });

    // =========================================================
    // CURSOS POR NIVEL
    // =========================================================

    // const coursesByLevel = courses.reduce((acc, course) => {
    //   if (!acc[course.nivel]) {
    //     acc[course.nivel] = 0;
    //   }

    //   acc[course.nivel] += 1;

    //   return acc;
    // }, {});

    return (
        <div className="space-y-5 pb-8">
            {/* =========================================================
          HERO
      ========================================================= */}
            <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 shadow-xl shadow-slate-200 sm:p-8 lg:p-10">
                <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />

                <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

                <div className="absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur">
                            <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
                            ADMINISTRACIÓN
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                            Panel de control
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                            Supervisa el funcionamiento general de ESTUD-IA y gestiona
                            alumnos, docentes y cursos desde un solo lugar.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/app/admin/alumnos")}
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-blue-50"
                            >
                                <UserPlus className="h-4 w-4 text-blue-600" />
                                Nuevo alumno
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/app/admin/cursos")}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                            >
                                <BookOpen className="h-4 w-4" />
                                Gestionar cursos
                            </button>
                        </div>
                    </div>

                    <div className="hidden shrink-0 lg:block">
                        <div className="relative flex h-40 w-40 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />

                            <div className="relative flex h-32 w-32 items-center justify-center rounded-[30px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
                                <LayoutDashboard className="h-16 w-16 text-blue-300" />
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
          MÉTRICAS PRINCIPALES
      ========================================================= */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {/* Alumnos */}
                <button
                    type="button"
                    onClick={() => navigate("/app/admin/alumnos")}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Users className="h-5 w-5" />
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                            <TrendingUp className="h-3 w-3" />
                            +8.4%
                        </span>
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Alumnos registrados
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        1,248
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">+97 este mes</p>
                </button>

                {/* Docentes */}
                <button
                    type="button"
                    onClick={() => navigate("/app/admin/docentes")}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <GraduationCap className="h-5 w-5" />
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                            <TrendingUp className="h-3 w-3" />
                            +4.2%
                        </span>
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Docentes registrados
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        86
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">79 activos</p>
                </button>

                {/* Cursos */}
                <button
                    type="button"
                    onClick={() => navigate("/app/admin/cursos")}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <BookOpen className="h-5 w-5" />
                        </div>

                        <span className="text-[10px] font-bold text-emerald-500">+6</span>
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Cursos disponibles
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        42
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">6 creados este mes</p>
                </button>

                {/* Usuarios activos */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                            <TrendingUp className="h-5 w-5" />
                        </div>

                        <span className="text-[10px] font-bold text-blue-500">Hoy</span>
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Usuarios activos
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        734
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                        58.8% de los alumnos
                    </p>
                </div>
            </section>

            {/* =========================================================
          ALUMNOS POR GRADO + RESUMEN ACADÉMICO
      ========================================================= */}
            <section className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
                {/* =====================================================
            ALUMNOS POR GRADO
        ===================================================== */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <GraduationCap className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold tracking-tight text-slate-900">
                                        Alumnos por grado
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Distribución de estudiantes por nivel educativo
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Filtro */}
                        <div className="relative">
                            <select
                                value={selectedLevel}
                                onChange={(event) => setSelectedLevel(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-xs font-semibold text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-auto"
                            >
                                <option value="Primaria">Primaria</option>
                                <option value="Secundaria">Secundaria</option>
                            </select>

                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>

                    {studentsByGrade.length > 0 ? (
                        <>
                            {/* Resumen superior */}
                            <div className="mt-7 flex items-end justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-400">
                                        Alumnos de {selectedLevel.toLowerCase()}
                                    </p>

                                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                        {selectedLevelStudents.length}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs font-medium text-slate-400">
                                        Grados activos
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-slate-700">
                                        {selectedLevelGrades.length}
                                    </p>
                                </div>
                            </div>

                            {/* Barras */}
                            <div className="mt-6 h-64">
                                <div className="flex h-full items-end gap-3 sm:gap-5">
                                    {studentsByGrade.map((item) => {
                                        const height = Math.max(
                                            (item.total / maxStudents) * 100,
                                            8,
                                        );

                                        return (
                                            <div
                                                key={item.grado}
                                                className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                                            >
                                                {/* Número */}
                                                <div className="mb-2 text-[10px] font-bold text-slate-500 opacity-0 transition group-hover:opacity-100">
                                                    {item.total}
                                                </div>

                                                {/* Barra */}
                                                <div className="flex h-full w-full items-end">
                                                    <div
                                                        className={`relative w-full rounded-t-xl transition-all duration-300 ${selectedLevel === "Primaria"
                                                                ? "bg-violet-500 group-hover:bg-violet-600"
                                                                : "bg-blue-600 group-hover:bg-blue-700"
                                                            }`}
                                                        style={{
                                                            height: `${height}%`,
                                                        }}
                                                    >
                                                        {/* Tooltip */}
                                                        <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                                                            {item.total}{" "}
                                                            {item.total === 1 ? "alumno" : "alumnos"}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Grado */}
                                                <span className="mt-3 text-[10px] font-semibold text-slate-500 sm:text-xs">
                                                    {item.grado}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-2xl bg-slate-50 px-5 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-300 shadow-sm">
                                <GraduationCap className="h-6 w-6" />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-slate-600">
                                Sin alumnos registrados
                            </p>

                            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                                No existen estudiantes registrados en los grados de{" "}
                                {selectedLevel.toLowerCase()}.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/app/admin/alumnos")}
                                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                            >
                                Registrar alumno
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* =====================================================
            RESUMEN ACADÉMICO
        ===================================================== */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-bold tracking-tight text-slate-900">
                                Resumen académico
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Información de {selectedLevel.toLowerCase()}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <Layers3 className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Métricas */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-[10px] font-medium text-slate-400">Alumnos</p>

                            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                                {selectedLevelStudents.length}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-[10px] font-medium text-slate-400">Cursos</p>

                            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                                {selectedLevelCourses.length}
                            </p>
                        </div>
                    </div>

                    {/* Grados */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-slate-700">
                                Grados con estudiantes
                            </p>

                            <span className="text-[10px] font-medium text-slate-400">
                                {selectedLevelGrades.length} activos
                            </span>
                        </div>

                        {selectedLevelGrades.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedLevelGrades.map((grado) => (
                                    <span
                                        key={grado}
                                        className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${selectedLevel === "Primaria"
                                                ? "bg-violet-50 text-violet-600"
                                                : "bg-blue-50 text-blue-600"
                                            }`}
                                    >
                                        {grado}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-3 text-xs text-slate-400">
                                No hay grados con estudiantes registrados.
                            </p>
                        )}
                    </div>

                    {/* Cursos */}
                    <div className="mt-6 border-t border-slate-100 pt-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-700">
                                    Cursos disponibles
                                </p>

                                <p className="mt-1 text-[10px] text-slate-400">
                                    Oferta académica del nivel
                                </p>
                            </div>

                            <BookOpen className="h-4 w-4 text-emerald-500" />
                        </div>

                        <div className="mt-3 space-y-2">
                            {selectedLevelCourses.slice(0, 4).map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-xs font-semibold text-slate-700">
                                            {course.nombre}
                                        </p>

                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                            {course.grado}
                                        </p>
                                    </div>

                                    <span className="ml-3 shrink-0 rounded-lg bg-white px-2 py-1 text-[10px] font-semibold text-slate-500">
                                        {course.temas.length}{" "}
                                        {course.temas.length === 1 ? "tema" : "temas"}
                                    </span>
                                </div>
                            ))}

                            {selectedLevelCourses.length === 0 && (
                                <div className="rounded-xl bg-slate-50 px-4 py-5 text-center">
                                    <p className="text-xs font-medium text-slate-500">
                                        No hay cursos disponibles
                                    </p>
                                </div>
                            )}
                        </div>

                        {selectedLevelCourses.length > 4 && (
                            <button
                                type="button"
                                onClick={() => navigate("/app/admin/cursos")}
                                className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 transition hover:text-blue-700"
                            >
                                Ver todos los cursos
                                <ArrowRight className="h-3 w-3" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* =========================================================
          RENDIMIENTO ACADÉMICO
      ========================================================= */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-bold tracking-tight text-slate-900">
                            Rendimiento académico
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                            Resumen general de los alumnos
                        </p>
                    </div>

                    <button
                        type="button"
                        className="inline-flex w-fit items-center gap-1 text-xs font-bold text-blue-600 transition hover:text-blue-700"
                    >
                        Ver reportes
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Promedio */}
                    <div className="rounded-2xl bg-slate-50 p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Target className="h-5 w-5" />
                            </div>

                            <span className="text-[10px] font-bold text-emerald-500">
                                +0.8
                            </span>
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                            Promedio general
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-900">15.8</p>

                        <p className="mt-1 text-[10px] text-slate-400">Sobre 20 puntos</p>
                    </div>

                    {/* Aprobados */}
                    <div className="rounded-2xl bg-slate-50 p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>

                            <span className="text-[10px] font-bold text-emerald-500">
                                78%
                            </span>
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                            Alumnos aprobados
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-900">973</p>

                        <p className="mt-1 text-[10px] text-slate-400">De 1,248 alumnos</p>
                    </div>

                    {/* En riesgo */}
                    <div className="rounded-2xl bg-slate-50 p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                                <AlertTriangle className="h-5 w-5" />
                            </div>

                            <span className="text-[10px] font-bold text-orange-500">
                                Atención
                            </span>
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                            Alumnos en riesgo
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-900">86</p>

                        <p className="mt-1 text-[10px] text-slate-400">
                            Requieren seguimiento
                        </p>
                    </div>

                    {/* Progreso */}
                    <div className="rounded-2xl bg-slate-50 p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <TrendingUp className="h-5 w-5" />
                            </div>

                            <span className="text-[10px] font-bold text-emerald-500">
                                +12%
                            </span>
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                            Progreso promedio
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-900">78%</p>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full rounded-full bg-violet-500"
                                style={{ width: "78%" }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminHome;
