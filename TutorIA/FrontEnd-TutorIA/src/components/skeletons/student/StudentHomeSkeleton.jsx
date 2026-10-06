const StudentHomeSkeleton = () => {
  return (
    <div className="space-y-5 pb-12 animate-pulse">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-200 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-2xl">
            {/* Badge */}
            <div className="h-7 w-28 rounded-full bg-slate-300" />

            {/* Title */}
            <div className="mt-5 h-9 w-full max-w-md rounded-xl bg-slate-300 sm:h-10" />

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full max-w-xl rounded bg-slate-300" />
              <div className="h-3 w-4/5 max-w-lg rounded bg-slate-300" />
            </div>

            {/* Button */}
            <div className="mt-6 h-11 w-48 rounded-xl bg-slate-300" />
          </div>

          {/* Robot */}
          <div className="hidden shrink-0 lg:block">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <div className="h-32 w-32 rounded-4xl bg-slate-300" />

              <div className="absolute -right-3 top-4 h-8 w-12 rounded-xl bg-slate-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div className="h-10 w-10 rounded-xl bg-slate-200" />

              {/* Small badge */}
              {index === 0 && <div className="h-3 w-6 rounded bg-slate-200" />}
            </div>

            {/* Label */}
            <div className="mt-4 h-3 w-24 rounded bg-slate-200" />

            {/* Value */}
            <div className="mt-2 h-8 w-14 rounded-lg bg-slate-200" />
          </div>
        ))}
      </section>

      {/* Main content */}
      <section className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        {/* Courses */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <div className="h-4 w-36 rounded bg-slate-200" />

              <div className="mt-2 h-3 w-24 rounded bg-slate-200" />
            </div>

            <div className="h-3 w-14 rounded bg-slate-200" />
          </div>

          {/* Course list */}
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-5 py-5 sm:px-6"
              >
                {/* Course icon */}
                <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

                <div className="min-w-0 flex-1">
                  {/* Course name + percentage */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-4 w-32 rounded bg-slate-200" />

                    <div className="h-3 w-8 rounded bg-slate-200" />
                  </div>

                  {/* Progress */}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 rounded-full bg-slate-200" />
                  </div>

                  {/* Description */}
                  <div className="mt-2 h-2.5 w-44 rounded bg-slate-200" />
                </div>

                {/* Arrow */}
                <div className="hidden h-4 w-4 rounded bg-slate-200 sm:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-24 rounded bg-slate-200" />

              <div className="mt-2 h-3 w-20 rounded bg-slate-200" />
            </div>

            <div className="h-5 w-5 rounded bg-slate-200" />
          </div>

          {/* Circle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-slate-100">
              <div className="absolute inset-3 rounded-full border-10 border-slate-200" />

              <div className="relative text-center">
                <div className="mx-auto h-8 w-16 rounded-lg bg-slate-200" />

                <div className="mx-auto mt-2 h-2.5 w-14 rounded bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mt-7 rounded-xl bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 shrink-0 rounded-full bg-slate-200" />

              <div className="flex-1">
                <div className="h-3 w-20 rounded bg-slate-200" />

                <div className="mt-2 space-y-2">
                  <div className="h-2.5 w-full rounded bg-slate-200" />
                  <div className="h-2.5 w-4/5 rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentHomeSkeleton;
