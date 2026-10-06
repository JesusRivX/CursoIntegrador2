const AdminUsersSkeleton = () => {
  return (
    <div className="space-y-5 pb-8 animate-pulse">
      {/* Header */}
      <section className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="h-7 w-32 rounded-lg bg-slate-200" />

          <div className="h-3 w-72 max-w-full rounded bg-slate-100" />
          <div className="h-3 w-56 max-w-full rounded bg-slate-100" />
        </div>

        <div className="h-11 w-40 rounded-xl bg-slate-200" />
      </section>

      {/* Estadísticas */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-200" />

            <div className="mt-4 h-3 w-24 rounded bg-slate-100" />

            <div className="mt-2 h-8 w-14 rounded-lg bg-slate-200" />
          </div>
        ))}
      </section>

      {/* Tabla */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Filtros */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="h-11 w-full rounded-xl bg-slate-100 lg:max-w-md" />

            <div className="h-11 w-full rounded-xl bg-slate-100 lg:w-48" />
          </div>

          <div className="mt-4 h-3 w-32 rounded bg-slate-100" />
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                {Array.from({ length: 5 }).map((_, index) => (
                  <th key={index} className="px-6 py-4 text-left">
                    <div className="h-3 w-20 rounded bg-slate-200" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 7 }).map((_, index) => (
                <tr key={index}>
                  {/* Usuario */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />

                      <div className="space-y-2">
                        <div className="h-3.5 w-32 rounded bg-slate-200" />
                        <div className="h-2.5 w-16 rounded bg-slate-100" />
                      </div>
                    </div>
                  </td>

                  {/* Código */}
                  <td className="px-6 py-4">
                    <div className="h-7 w-24 rounded-lg bg-slate-100" />
                  </td>

                  {/* Rol */}
                  <td className="px-6 py-4">
                    <div className="h-7 w-24 rounded-full bg-slate-100" />
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4">
                    <div className="h-7 w-20 rounded-full bg-slate-100" />
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <div className="h-9 w-9 rounded-lg bg-slate-100" />
                      <div className="h-9 w-9 rounded-lg bg-slate-100" />
                      <div className="h-9 w-9 rounded-lg bg-slate-100" />
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

export default AdminUsersSkeleton;
