const StudentDashboardSkeleton = () => {
  return (
    <div className="space-y-5">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-200 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="animate-pulse">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-2xl">
              <div className="mb-4 h-7 w-28 rounded-full bg-slate-300" />

              <div className="h-9 w-3/4 rounded-lg bg-slate-300 sm:h-10 lg:h-12" />

              <div className="mt-4 space-y-2">
                <div className="h-4 w-full max-w-xl rounded bg-slate-300" />
                <div className="h-4 w-5/6 max-w-lg rounded bg-slate-300" />
              </div>

              <div className="mt-6 h-11 w-44 rounded-xl bg-slate-300" />
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <div className="h-32 w-32 rounded-4xl bg-slate-300" />

                <div className="absolute -right-3 top-4 h-8 w-12 rounded-xl bg-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="animate-pulse">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-xl bg-slate-200" />

                {item === 1 && <div className="h-3 w-6 rounded bg-slate-200" />}
              </div>

              <div className="mt-4 h-3 w-24 rounded bg-slate-200" />

              <div className="mt-2 h-8 w-14 rounded-lg bg-slate-200" />
            </div>
          </div>
        ))}
      </section>

      {/* Courses + Progress */}
      <section className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        {/* Courses */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="animate-pulse">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <div className="h-5 w-40 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-28 rounded bg-slate-200" />
              </div>

              <div className="h-4 w-14 rounded bg-slate-200" />
            </div>

            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 px-5 py-5 sm:px-6"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-4 w-40 max-w-[60%] rounded bg-slate-200" />

                      <div className="h-3 w-8 rounded bg-slate-200" />
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-300"
                        style={{
                          width: `${[65, 42, 80, 55][item - 1]}%`,
                        }}
                      />
                    </div>

                    <div className="mt-2 h-3 w-44 rounded bg-slate-200" />
                  </div>

                  <div className="hidden h-4 w-4 rounded bg-slate-200 sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-5 w-28 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-20 rounded bg-slate-200" />
              </div>

              <div className="h-5 w-5 rounded bg-slate-200" />
            </div>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-slate-100">
                <div className="absolute inset-3 rounded-full border-10 border-slate-200" />

                <div className="text-center">
                  <div className="mx-auto h-9 w-16 rounded-lg bg-slate-200" />

                  <div className="mx-auto mt-2 h-3 w-16 rounded bg-slate-200" />
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-xl bg-slate-100 p-4">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 shrink-0 rounded-full bg-slate-200" />

                <div className="flex-1">
                  <div className="h-3 w-20 rounded bg-slate-200" />

                  <div className="mt-2 space-y-2">
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-4/5 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboardSkeleton;
