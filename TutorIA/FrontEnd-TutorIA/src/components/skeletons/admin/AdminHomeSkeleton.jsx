const AdminHomeSkeleton = () => {
  return (
    <div className="space-y-5 pb-8 animate-pulse">
      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-200 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-2xl">
            {/* Badge */}
            <div className="h-7 w-32 rounded-full bg-slate-300" />

            {/* Title */}
            <div className="mt-5 h-10 w-full max-w-md rounded-xl bg-slate-300" />

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full max-w-xl rounded bg-slate-300" />
              <div className="h-3 w-4/5 max-w-lg rounded bg-slate-300" />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="h-11 w-36 rounded-xl bg-slate-300" />
              <div className="h-11 w-40 rounded-xl bg-slate-300" />
            </div>
          </div>

          {/* Dashboard icon */}
          <div className="hidden shrink-0 lg:block">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <div className="h-32 w-32 rounded-[30px] bg-slate-300" />

              <div className="absolute -right-6 top-4 h-8 w-20 rounded-xl bg-slate-300" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          KPIs
      ========================== */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            {/* Icon */}
            <div className="h-10 w-10 rounded-xl bg-slate-200" />

            {/* Label */}
            <div className="mt-4 h-3 w-28 rounded bg-slate-200" />

            {/* Number */}
            <div className="mt-2 h-8 w-16 rounded-lg bg-slate-200" />
          </div>
        ))}
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <section className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        {/* =========================
            STUDENTS BY GRADE
        ========================== */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-200" />

                <div>
                  <div className="h-4 w-36 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-56 rounded bg-slate-200" />
                </div>
              </div>
            </div>

            {/* Select */}
            <div className="h-10 w-28 rounded-xl bg-slate-200" />
          </div>

          {/* Summary */}
          <div className="mt-7 flex items-end justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="h-3 w-32 rounded bg-slate-200" />
              <div className="mt-2 h-8 w-14 rounded-lg bg-slate-200" />
            </div>

            <div className="text-right">
              <div className="ml-auto h-3 w-20 rounded bg-slate-200" />
              <div className="mt-2 ml-auto h-5 w-8 rounded bg-slate-200" />
            </div>
          </div>

          {/* Chart */}
          <div className="mt-6 h-64">
            <div className="flex h-full items-end gap-3 sm:gap-5">
              {[
                "h-[38%]",
                "h-[55%]",
                "h-[72%]",
                "h-[48%]",
                "h-[85%]",
                "h-[62%]",
              ].map((height, index) => (
                <div
                  key={index}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  {/* Tooltip placeholder */}
                  <div className="mb-2 h-3 w-6 rounded bg-slate-100" />

                  {/* Bar */}
                  <div className="flex h-full w-full items-end">
                    <div
                      className={`w-full rounded-t-xl bg-slate-200 ${height}`}
                    />
                  </div>

                  {/* Label */}
                  <div className="mt-3 h-3 w-10 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================
            ACADEMIC SUMMARY
        ========================== */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-36 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-28 rounded bg-slate-200" />
            </div>

            <div className="h-10 w-10 rounded-xl bg-slate-200" />
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="h-2.5 w-12 rounded bg-slate-200" />
              <div className="mt-2 h-7 w-12 rounded bg-slate-200" />
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="h-2.5 w-12 rounded bg-slate-200" />
              <div className="mt-2 h-7 w-12 rounded bg-slate-200" />
            </div>
          </div>

          {/* Grades */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="h-3 w-32 rounded bg-slate-200" />
              <div className="h-3 w-16 rounded bg-slate-200" />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-7 w-14 rounded-lg bg-slate-200" />
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-3 w-32 rounded bg-slate-200" />
                <div className="mt-2 h-2.5 w-40 rounded bg-slate-200" />
              </div>

              <div className="h-4 w-4 rounded bg-slate-200" />
            </div>

            <div className="mt-3 space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="h-3 w-32 rounded bg-slate-200" />
                    <div className="mt-1.5 h-2.5 w-20 rounded bg-slate-200" />
                  </div>

                  <div className="ml-3 h-6 w-14 rounded-lg bg-slate-200" />
                </div>
              ))}
            </div>

            <div className="mt-3 h-3 w-28 rounded bg-slate-200" />
          </div>
        </div>
      </section>

      {/* =========================
          ACADEMIC PERFORMANCE
      ========================== */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-48 rounded bg-slate-200" />
          </div>

          <div className="h-3 w-24 rounded bg-slate-200" />
        </div>

        {/* Performance cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-slate-50 p-5">
              {/* Icon + badge */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-slate-200" />

                <div className="h-3 w-10 rounded bg-slate-200" />
              </div>

              {/* Label */}
              <div className="mt-4 h-3 w-28 rounded bg-slate-200" />

              {/* Value */}
              <div className="mt-2 h-8 w-16 rounded-lg bg-slate-200" />

              {/* Description */}
              <div className="mt-2 h-2.5 w-32 rounded bg-slate-200" />

              {/* Progress bar only for last card */}
              {index === 3 && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-3/4 rounded-full bg-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminHomeSkeleton;
