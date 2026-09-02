import { Menu } from "lucide-react";

const HeaderDashboard = ({
    user,
    setSidebarOpen,
    subtitle,
    progressTitle,
    progressText,
}) => {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
            <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Abrir menú"
                        className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-slate-200
              bg-white text-slate-500 shadow-sm
              transition-all duration-200
              hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500/30
              lg:hidden
            "
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="min-w-0">
                        <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            ¡Hola {`${user?.rol} ${user?.nombre}`}!
                        </h1>

                        <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <div
                        className="
              hidden items-center gap-2 rounded-xl
              border border-emerald-100 bg-emerald-50
              px-3 py-2 sm:flex
            "
                    >
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />

                        <span className="text-xs font-semibold text-emerald-700">
                            Sesión activa
                        </span>
                    </div>

                    <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                    <div className="hidden text-right md:block">
                        <p className="text-xs font-medium text-slate-400">
                            {progressTitle}
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                            {progressText}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderDashboard;