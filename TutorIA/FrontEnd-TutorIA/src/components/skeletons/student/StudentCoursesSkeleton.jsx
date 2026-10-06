const StudentCoursesSkeleton = () => {
  return (
    <div className="space-y-6 pb-12 animate-pulse">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden rounded-[30px] bg-slate-200 p-7 shadow-sm sm:p-9">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="h-7 w-44 rounded-full bg-slate-300" />

          {/* Title */}
          <div className="mt-5 h-10 w-64 rounded-xl bg-slate-300 sm:h-11" />

          {/* Description */}
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full max-w-xl rounded bg-slate-300" />
            <div className="h-3 w-4/5 max-w-lg rounded bg-slate-300" />
          </div>

          {/* Info badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-9 w-28 rounded-xl bg-slate-300" />
            <div className="h-9 w-36 rounded-xl bg-slate-300" />
            <div className="h-9 w-24 rounded-xl bg-slate-300" />
          </div>
        </div>
      </section>

      {/* Course cards skeleton */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm"
          >
            {/* Top gradient */}
            <div className="h-2 bg-slate-300" />

            <div className="p-6 pt-6">
              {/* Icon + arrow */}
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-2xl bg-slate-200" />

                <div className="h-9 w-9 rounded-xl bg-slate-100" />
              </div>

              {/* Code */}
              <div className="mt-6 h-3 w-16 rounded bg-slate-200" />

              {/* Course name */}
              <div className="mt-2 h-6 w-3/4 rounded-lg bg-slate-200" />

              {/* Description */}
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-slate-200" />
                <div className="h-3 w-5/6 rounded bg-slate-200" />
                <div className="h-3 w-2/3 rounded bg-slate-200" />
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <div>
                  <div className="h-2.5 w-16 rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-20 rounded bg-slate-200" />
                </div>

                <div className="h-4 w-12 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StudentCoursesSkeleton;
