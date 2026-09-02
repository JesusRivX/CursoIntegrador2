import { useNavigate, useOutletContext } from "react-router-dom";

import {
    Activity,
    ArrowRight,
    BarChart3,
    BookOpen,
    Bot,
    Calculator,
    Atom,
    CheckCircle2,
    ClipboardCheck,
    MessageCircle,
    Sparkles,
    Target,
    WandSparkles,
} from "lucide-react";

const StudentHome = () => {
    const navigate = useNavigate();
    const { user } = useOutletContext();

    return (
        <>
            <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 shadow-xl shadow-slate-200 sm:p-8 lg:p-10">
                <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />
                <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur">
                            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                            ESTUD-IA
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                            ¿Qué quieres aprender hoy?
                        </h3>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                            Tu aprendizaje continúa aquí. Pregunta, practica y recibe ayuda
                            personalizada con tu tutor inteligente.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/app/estudiante/tutor", { state: { user } })
                            }
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-blue-50"
                        >
                            <Bot className="h-4 w-4 text-blue-600" />
                            Hablar con Tutor IA
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Elemento IA */}
                    <div className="hidden shrink-0 lg:block">
                        <div className="relative flex h-40 w-40 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />

                            <div className="relative flex h-32 w-32 items-center justify-center rounded-4xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
                                <Bot className="h-16 w-16 text-blue-300" />
                            </div>

                            <div className="absolute -right-3 top-4 flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl">
                                <WandSparkles className="h-3.5 w-3.5 text-violet-300" />
                                IA
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Métricas */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {/* Cursos activos */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <BookOpen className="h-5 w-5" />
                        </div>

                        <span className="text-[10px] font-bold text-emerald-500">+2</span>
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Cursos activos
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        6
                    </p>
                </div>

                {/* Tareas pendientes */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <ClipboardCheck className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Tareas pendientes
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        4
                    </p>
                </div>

                {/* Promedio general */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Target className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Promedio general
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        17.8
                    </p>
                </div>

                {/* Días de estudio */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Activity className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Días de estudio
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        12
                    </p>
                </div>
            </section>

            {/* Paneles */}
            <section className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
                        <div>
                            <h3 className="font-bold tracking-tight text-slate-900">
                                Continúa aprendiendo
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">Tus cursos actuales</p>
                        </div>

                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
                            Ver todos
                        </button>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {[
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
                        ].map((course) => {
                            const Icon = course.icon;

                            return (
                                <div
                                    key={course.name}
                                    className="group flex items-center gap-4 px-5 py-5 transition hover:bg-slate-50 sm:px-6"
                                >
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${course.color}-50 text-${course.color}-600`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-4">
                                            <h4 className="truncate text-sm font-bold text-slate-800">
                                                {course.name}
                                            </h4>

                                            <span className="text-xs font-bold text-slate-500">
                                                {course.progress}%
                                            </span>
                                        </div>

                                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className={`h-full rounded-full bg-${course.color}-500`}
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>

                                        <p className="mt-2 text-[11px] text-slate-400">
                                            Continúa desde tu última lección
                                        </p>
                                    </div>

                                    <ArrowRight className="hidden h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500 sm:block" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progreso */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold tracking-tight text-slate-900">
                                Tu progreso
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">Esta semana</p>
                        </div>

                        <BarChart3 className="h-5 w-5 text-blue-500" />
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-blue-50">
                            <div className="absolute inset-3 rounded-full border-10 border-blue-600 border-r-violet-500 border-b-violet-500" />

                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">78%</p>

                                <p className="text-[10px] font-medium text-slate-400">
                                    completado
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 rounded-xl bg-slate-50 p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                            <div>
                                <p className="text-xs font-bold text-slate-700">
                                    ¡Vas muy bien!
                                </p>

                                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                                    Has mejorado tu rendimiento un 12% esta semana.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StudentHome;
