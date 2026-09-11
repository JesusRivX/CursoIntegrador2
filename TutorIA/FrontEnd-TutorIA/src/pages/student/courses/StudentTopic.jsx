import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Download,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import useStudentTopic from "./useStudentTopic";
import StudentTopicTutor from "./components/StudentTopicTutor";

const StudentTopic = () => {
  const {
    course,
    topic,
    currentTopicIndex,
    nextTopic,
    previousTopic,
    topicProgress,
    progressLabel,
    goToTopic,
    goBackToCourse,
  } = useStudentTopic();

  if (!course || !topic) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileText className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-xl font-black text-slate-900">
            Tema no encontrado
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No pudimos encontrar este tema dentro del curso seleccionado.
          </p>

          <button
            type="button"
            onClick={goBackToCourse}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al curso
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] pb-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBackToCourse}
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Volver al curso
        </button>

        <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-400 sm:text-base">
          <span>Mis cursos</span>
          <span className="text-slate-300">›</span>
          <span>{course.nombre}</span>
          <span className="text-slate-300">›</span>
          <span className="font-black text-blue-600">{topic.nombre}</span>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
        <div className="h-2 bg-linear-to-r from-blue-500 via-blue-600 to-slate-950" />

        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-blue-700">
                  <BookOpen className="h-3.5 w-3.5" />
                  Tema de estudio
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-500">
                  {course.codigo}
                </span>
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Unidad {String(currentTopicIndex + 1).padStart(2, "0")}
              </p>

              <h1 className="mt-2 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {topic.nombre}
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                {topic.descripcion}
              </p>

              <div className="mt-8 max-w-xl">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />

                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Progreso del tema
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-bold text-slate-600">
                      {progressLabel}
                    </p>
                  </div>

                  <span className="text-2xl font-black text-blue-600">
                    {topicProgress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-600 transition-[width] duration-500 ease-out"
                    style={{ width: `${topicProgress}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-[9px] font-bold text-slate-400">
                  <span>Inicio</span>
                  <span>Aprendiendo</span>
                  <span>Completado</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <img
                src="/logo.png"
                alt="Logo de la plataforma educativa"
                className="h-40 w-40 object-contain sm:h-48 sm:w-48"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="space-y-6">
          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-blue-50/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    01 · Comprender
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    La idea principal
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Primero entendemos, luego practicamos.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-3xl bg-[#f7f9fc] p-5 sm:p-6">
                <p className="text-sm leading-7 text-slate-600">
                  {topic.descripcion}
                </p>
              </div>

              <div className="mt-5 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                <div>
                  <p className="text-xs font-black text-blue-800">Recuerda</p>

                  <p className="mt-1 text-xs leading-6 text-blue-700/80">
                    No memorices solamente el procedimiento. Intenta comprender
                    por qué se utiliza y en qué situaciones puedes aplicarlo.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {topic.ejemplo && (
            <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-white px-6 py-6 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                        02 · Aplicar
                      </p>

                      <h2 className="mt-1 text-xl font-black text-slate-900">
                        {topic.ejemplo.titulo}
                      </h2>
                    </div>
                  </div>

                  <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-500 sm:block">
                    Ejemplo práctico
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white">
                  <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-blue-600/10 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-blue-400" />

                      <p className="text-[10px] font-black uppercase tracking-wider text-blue-300">
                        Problema
                      </p>
                    </div>

                    <p className="mt-3 text-base font-bold leading-7 sm:text-lg">
                      {topic.ejemplo.problema}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />

                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Resolución paso a paso
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-[#f7f9fc] p-5 sm:p-6">
                    <p className="text-sm leading-7 text-slate-600">
                      {topic.ejemplo.solucion}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                      ¡Respuesta correcta!
                    </p>

                    <p className="mt-1 text-sm font-black text-emerald-800">
                      {topic.ejemplo.respuesta}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {Array.isArray(topic.recomendaciones) &&
            topic.recomendaciones.length > 0 && (
              <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <Lightbulb className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                      03 · Recomendaciones
                    </p>

                    <h2 className="mt-1 text-xl font-black text-slate-900">
                      Consejos para estudiar
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {topic.recomendaciones.map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-amber-100 hover:bg-amber-50/30"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[10px] font-black text-amber-600">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <p className="text-xs leading-6 text-slate-600">
                        {recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
        </main>

        <aside className="space-y-5">
          <section className="overflow-hidden rounded-[28px] border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Trophy className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Progreso del tema
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-slate-500">
                    {progressLabel}
                  </p>
                </div>
              </div>

              <span className="text-3xl font-black tracking-tight text-slate-900">
                {topicProgress}%
              </span>
            </div>

            <div className="mt-5">
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-500 via-blue-600 to-cyan-500 transition-[width] duration-500 ease-out"
                  style={{ width: `${topicProgress}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[9px] font-bold text-slate-400">
                <span>Inicio</span>

                <span>
                  {topicProgress >= 100
                    ? "¡Tema completado!"
                    : `${100 - topicProgress}% para completar`}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                {topicProgress >= 100 ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <GraduationCap className="h-4 w-4" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                  {topicProgress >= 100
                    ? "Completado"
                    : "Aprendizaje en progreso"}
                </p>

                <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                  {topicProgress >= 100
                    ? "Has recorrido todo el contenido de este tema."
                    : "Avanza por el contenido para aumentar tu progreso."}
                </p>
              </div>
            </div>
          </section>

          {topic.archivo && (
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <FileText className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Material de estudio
                  </p>

                  <p className="mt-1 truncate text-xs font-black text-slate-700">
                    {topic.archivo.nombre}
                  </p>
                </div>
              </div>

              <a
                href={topic.archivo.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-600"
              >
                <Download className="h-4 w-4" />
                Abrir material
              </a>
            </section>
          )}

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />

              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Ruta de aprendizaje
              </p>
            </div>

            <p className="mt-2 text-sm font-black text-slate-900">
              Tema {currentTopicIndex + 1} de {course.temas.length}
            </p>

            <div className="mt-4 space-y-2">
              {previousTopic && (
                <button
                  type="button"
                  onClick={() => goToTopic(previousTopic.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-blue-100 hover:bg-blue-50"
                >
                  <ChevronLeft className="h-4 w-4 text-slate-400" />

                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Anterior
                    </p>

                    <p className="truncate text-xs font-bold text-slate-700">
                      {previousTopic.nombre}
                    </p>
                  </div>
                </button>
              )}

              {nextTopic && (
                <button
                  type="button"
                  onClick={() => goToTopic(nextTopic.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3 text-left transition hover:bg-blue-100"
                >
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase text-blue-600">
                      Siguiente
                    </p>

                    <p className="truncate text-xs font-black text-blue-800">
                      {nextTopic.nombre}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-blue-600" />
                </button>
              )}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-6 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
            <GraduationCap className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Sigue aprendiendo
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {nextTopic
                ? `Continúa con ${nextTopic.nombre}`
                : "¡Has completado todos los temas!"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={goBackToCourse}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-black text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Ver temas
          </button>

          {nextTopic && (
            <button
              type="button"
              onClick={() => goToTopic(nextTopic.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white shadow-sm transition hover:bg-blue-700"
            >
              Siguiente tema
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </section>

      <StudentTopicTutor topic={topic} />
    </div>
  );
};

export default StudentTopic;
