const AdminCoursesSkeleton = () => {
  return (
    <div className="space-y-5 pb-8">
      {/* Hero */}
      <section className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full">
          <div className="mb-3 h-6 w-36 animate-pulse rounded-full bg-slate-200" />

          <div className="h-8 w-32 animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-2 h-4 w-full max-w-xl animate-pulse rounded bg-slate-100" />
        </div>

        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 lg:w-36" />
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />

            <div className="mt-4 h-3 w-16 animate-pulse rounded bg-slate-100" />

            <div className="mt-2 h-8 w-14 animate-pulse rounded-lg bg-slate-200" />
          </div>
        ))}
      </section>

      {/* Table / filtros */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100 lg:max-w-md" />

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100 sm:w-44" />

              <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100 sm:w-44" />
            </div>
          </div>

          <div className="mt-4 h-3 w-28 animate-pulse rounded bg-slate-100" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                {["Curso", "Nivel", "Grado", "Temas", "Estado", "Acciones"].map(
                  (column) => (
                    <th key={column} className="px-6 py-4 text-left">
                      <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  {/* Curso */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200" />

                      <div className="min-w-0">
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                        <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-100" />
                      </div>
                    </div>
                  </td>

                  {/* Nivel */}
                  <td className="px-6 py-4">
                    <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
                  </td>

                  {/* Grado */}
                  <td className="px-6 py-4">
                    <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
                  </td>

                  {/* Temas */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />

                      <div className="h-4 w-6 animate-pulse rounded bg-slate-200" />

                      <div className="h-3 w-10 animate-pulse rounded bg-slate-100" />
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4">
                    <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-100" />
                      <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-100" />
                      <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-100" />
                      <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-100" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminCoursesSkeleton;
