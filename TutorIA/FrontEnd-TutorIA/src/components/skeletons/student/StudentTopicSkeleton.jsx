const StudentTopicSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f7f9fc] pb-20">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200" />

        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
        <div className="h-2 animate-pulse bg-slate-200" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-7 w-32 animate-pulse rounded-full bg-slate-200" />

                <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
              </div>

              {/* Número del tema */}
              <div className="mt-6 h-3 w-20 animate-pulse rounded bg-slate-200" />

              {/* Título */}
              <div className="mt-3 space-y-2">
                <div className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200 sm:h-12" />

                <div className="h-10 w-1/2 animate-pulse rounded-lg bg-slate-200 sm:h-12" />
              </div>

              {/* Descripción */}
              <div className="mt-6 max-w-3xl space-y-2">
                <div className="h-3.5 w-full animate-pulse rounded bg-slate-200" />

                <div className="h-3.5 w-11/12 animate-pulse rounded bg-slate-200" />

                <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="h-40 w-40 animate-pulse rounded-full bg-slate-200 sm:h-48 sm:w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Contenido + Sidebar */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="space-y-6">
          {/* Idea principal */}
          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 animate-pulse rounded-2xl bg-slate-200" />

                <div>
                  <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-7 w-48 animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-3 w-64 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Descripción */}
              <div className="rounded-3xl bg-[#f7f9fc] p-5 sm:p-6">
                <div className="space-y-2">
                  <div className="h-3.5 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-3.5 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded bg-slate-200" />
                  <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>

              {/* Recuerda */}
              <div className="mt-5 flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-slate-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-full animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </section>

          {/* Ejemplos */}
          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-100 bg-white px-6 py-6 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />

                  <div>
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-6 w-40 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>

                <div className="hidden h-7 w-24 animate-pulse rounded-full bg-slate-200 sm:block" />
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-slate-100 bg-white"
                >
                  {/* Título del ejemplo */}
                  <div className="flex items-start gap-3 border-b border-slate-100 p-5">
                    <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-slate-200" />

                    <div className="flex-1">
                      <div className="h-2.5 w-20 animate-pulse rounded bg-slate-200" />

                      <div className="mt-2 h-5 w-48 animate-pulse rounded bg-slate-200" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Problema */}
                    <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6">
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-pulse rounded bg-white/10" />

                          <div className="h-2.5 w-20 animate-pulse rounded bg-white/10" />
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="h-4 w-full animate-pulse rounded bg-white/10" />

                          <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />

                          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                        </div>
                      </div>
                    </div>

                    {/* Resolución */}
                    <div className="mt-6">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />

                        <div className="h-2.5 w-36 animate-pulse rounded bg-slate-200" />
                      </div>

                      <div className="rounded-3xl border border-slate-100 bg-[#f7f9fc] p-5 sm:p-6">
                        <div className="space-y-2">
                          <div className="h-3.5 w-full animate-pulse rounded bg-slate-200" />

                          <div className="h-3.5 w-full animate-pulse rounded bg-slate-200" />

                          <div className="h-3.5 w-5/6 animate-pulse rounded bg-slate-200" />

                          <div className="h-3.5 w-3/4 animate-pulse rounded bg-slate-200" />
                        </div>
                      </div>
                    </div>

                    {/* Respuesta */}
                    <div className="mt-6 flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-5">
                      <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-200" />

                      <div className="flex-1">
                        <div className="h-2.5 w-16 animate-pulse rounded bg-slate-200" />

                        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tutor IA */}
          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />

                <div>
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-6 w-40 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 sm:p-8">
              <div className="h-20 w-3/4 animate-pulse rounded-2xl bg-slate-200" />

              <div className="ml-auto h-20 w-3/4 animate-pulse rounded-2xl bg-slate-200" />

              <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Progreso */}
          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />

                <div>
                  <div className="h-2.5 w-28 animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-slate-200" />
                </div>
              </div>

              <div className="h-9 w-14 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Barra de progreso */}
            <div className="mt-5 h-3 animate-pulse rounded-full bg-slate-200" />

            <div className="mt-2 flex items-center justify-between">
              <div className="h-2 w-10 animate-pulse rounded bg-slate-200" />

              <div className="h-2 w-24 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Estado */}
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-slate-200" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-2.5 w-32 animate-pulse rounded bg-slate-200" />

                <div className="h-2.5 w-full animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          </section>

          {/* Material */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-200" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-2.5 w-28 animate-pulse rounded bg-slate-200" />

                <div className="h-3 w-36 animate-pulse rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-slate-200" />
          </section>

          {/* Información del curso */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-slate-200" />

              <div className="h-2.5 w-32 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <div className="h-2 w-12 animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default StudentTopicSkeleton;
