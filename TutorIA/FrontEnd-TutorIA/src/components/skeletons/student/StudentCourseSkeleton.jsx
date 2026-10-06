import { ArrowLeft } from "lucide-react";

const StudentCourseSkeleton = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Botón volver */}
      <div>
        <div className="inline-flex h-10 w-40 animate-pulse items-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5">
          <ArrowLeft className="h-4 w-4 text-slate-300" />
          <div className="h-3 w-24 rounded bg-slate-300" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-6 shadow-xl sm:p-8 lg:p-9">
        <div className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            {/* Información del curso */}
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="h-7 w-44 animate-pulse rounded-full bg-white/10" />

              {/* Título */}
              <div className="mt-5 h-9 w-3/4 animate-pulse rounded-lg bg-white/10 sm:h-11" />

              {/* Código */}
              <div className="mt-3 h-4 w-24 animate-pulse rounded bg-blue-400/20" />

              {/* Descripción */}
              <div className="mt-6 space-y-2">
                <div className="h-3.5 w-full max-w-3xl animate-pulse rounded bg-white/10" />
                <div className="h-3.5 w-5/6 max-w-2xl animate-pulse rounded bg-white/10" />
                <div className="h-3.5 w-2/3 max-w-xl animate-pulse rounded bg-white/10" />
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="h-9 w-28 animate-pulse rounded-xl bg-white/10" />
                <div className="h-9 w-28 animate-pulse rounded-xl bg-white/10" />
                <div className="h-9 w-24 animate-pulse rounded-xl bg-white/10" />
              </div>
            </div>

            {/* Progreso */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-2.5 w-24 animate-pulse rounded bg-blue-200/20" />
                  <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
                </div>

                <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="h-12 w-24 animate-pulse rounded-lg bg-white/10" />

                  <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-white/10" />
                </div>

                <div className="text-right">
                  <div className="h-3 w-16 animate-pulse rounded bg-blue-200/20" />

                  <div className="mt-2 h-2.5 w-12 animate-pulse rounded bg-white/10" />
                </div>
              </div>

              {/* Barra */}
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/5 animate-pulse rounded-full bg-blue-500/30" />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/50" />

                <div className="h-2.5 w-52 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />

            <div className="mt-4 h-3 w-16 animate-pulse rounded bg-slate-200" />

            <div className="mt-2 h-7 w-12 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </section>

      {/* Ruta de aprendizaje */}
      <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200" />

                <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
              </div>

              <div className="mt-3 h-3 w-full max-w-md animate-pulse rounded bg-slate-200" />
            </div>

            <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>

        {/* Temas */}
        <div className="p-4 sm:p-7">
          <div className="relative">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
                >
                  {/* Número */}
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-200" />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        {/* Nombre */}
                        <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />

                        {/* Descripción */}
                        <div className="mt-2 space-y-1.5">
                          <div className="h-2.5 w-full max-w-md animate-pulse rounded bg-slate-200" />
                          <div className="h-2.5 w-3/4 max-w-sm animate-pulse rounded bg-slate-200" />
                        </div>
                      </div>

                      {/* Badge progreso */}
                      <div className="h-6 w-28 animate-pulse rounded-full bg-slate-200" />
                    </div>

                    {/* Barra progreso */}
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-1/3 animate-pulse rounded-full bg-slate-200" />
                    </div>

                    {/* Footer */}
                    <div className="mt-3 flex gap-4">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />

                      <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className="hidden h-5 w-5 shrink-0 animate-pulse rounded bg-slate-200 sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentCourseSkeleton;
