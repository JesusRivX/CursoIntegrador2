import { PanelLeft, X } from "lucide-react";

const SidebarDashboard = ({
  user,
  navigation,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  navigate,
  location,
}) => {
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(/\s+/);
    return words.map((word) => word.charAt(0).toUpperCase()).join("");
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col
        border-r border-slate-200/80 bg-white/95 backdrop-blur-xl
        shadow-xl shadow-slate-200/20
        transition-[transform,opacity,box-shadow]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          sidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }

        lg:static
        lg:z-auto
        lg:translate-x-0
        lg:opacity-100
        lg:shadow-none
        lg:transition-[width,transform,box-shadow]
        lg:duration-300
        lg:ease-out

        ${sidebarCollapsed ? "lg:w-28" : "lg:w-72"}
        w-72
      `}
    >
      {/* Encabezado */}
      <div className="flex h-20 shrink-0 items-center border-b border-slate-100 px-3">
        <div
          className={`
            flex min-w-0 flex-1 items-center
            transition-all duration-300 ease-out
            ${sidebarCollapsed ? "justify-center" : "gap-3"}
          `}
        >
          <img
            src="/logo.png"
            alt="ESTUD-IA"
            className={`
              shrink-0 object-contain
              transition-all duration-300 ease-out
              ${sidebarCollapsed ? "h-16 w-16" : "h-12 w-12"}
            `}
          />

          <div
            className={`
              min-w-0 overflow-hidden whitespace-nowrap
              transition-[max-width,opacity,transform] duration-300 ease-out
              ${
                sidebarCollapsed
                  ? "max-w-0 -translate-x-2 opacity-0"
                  : "max-w-37.5 translate-x-0 opacity-100"
              }
            `}
          >
            <h1 className="text-[17px] font-extrabold tracking-tight text-blue-600">
              ESTUD-IA
            </h1>

            <p className="mt-0.5 text-[9px] font-bold tracking-[0.18em] text-slate-400">
              TU TUTOR IA
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          title={sidebarCollapsed ? "Expandir menú" : "Contraer menú"}
          className={`
            hidden h-9 w-9 shrink-0 items-center justify-center
            rounded-xl text-slate-400
            transition-colors duration-200
            hover:bg-blue-500/10 hover:text-blue-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500/40
            focus-visible:ring-offset-2
            focus-visible:ring-offset-white
            lg:flex
            ${sidebarCollapsed ? "ml-4" : "ml-2"}
          `}
        >
          <PanelLeft
            className={`
              h-4.5 w-4.5
              transition-transform duration-300
              ${sidebarCollapsed ? "rotate-180" : ""}
            `}
          />
        </button>

        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar menú"
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl text-slate-400
            transition-colors
            hover:bg-slate-100 hover:text-slate-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-300
            lg:hidden
          "
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div
          className={`
            mb-3 overflow-hidden px-3
            transition-[max-height,opacity] duration-300
            ${sidebarCollapsed ? "max-h-0 opacity-0" : "max-h-8 opacity-100"}
          `}
        >
          <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Menú principal
          </p>
        </div>

        <div className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  navigate(item.path, {
                    state: { user },
                  });
                  setSidebarOpen(false);
                }}
                title={sidebarCollapsed ? item.label : undefined}
                className={`
                  group relative flex w-full items-center
                  rounded-xl
                  px-3 py-3
                  transition-colors duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500/40
                  focus-visible:ring-offset-1
                  ${sidebarCollapsed ? "justify-center" : "gap-3"}
                  ${
                    active
                      ? "bg-slate-700 text-white shadow-sm shadow-blue-200"
                      : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                  }
                `}
              >
                {active && !sidebarCollapsed && (
                  <span className="absolute left-0 h-5 w-1 rounded-r-full bg-blue-300" />
                )}

                <Icon
                  className={`
                    h-4.75 w-4.75 shrink-0
                    transition-colors duration-200
                    ${
                      active
                        ? "text-white"
                        : "text-slate-400 group-hover:text-blue-700"
                    }
                  `}
                />

                <span
                  className={`
                    min-w-0 overflow-hidden whitespace-nowrap
                    text-[13px] font-semibold tracking-[-0.01em]
                    transition-[max-width,opacity,transform] duration-300 ease-out
                    ${
                      sidebarCollapsed
                        ? "max-w-0 -translate-x-2 opacity-0"
                        : "max-w-37.5 translate-x-0 opacity-100"
                    }
                  `}
                >
                  {item.label}
                </span>

                {item.label === "Tutor IA" && (
                  <span
                    className={`
                      absolute right-3 rounded-md
                      bg-violet-100 px-1.5 py-0.5
                      text-[8px] font-extrabold tracking-wide text-violet-600
                      transition-[opacity,transform] duration-300
                      ${
                        sidebarCollapsed
                          ? "scale-75 opacity-0"
                          : "scale-100 opacity-100"
                      }
                    `}
                  >
                    IA
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-100 p-3">
        <div
          className={`
            rounded-xl bg-slate-50
            transition-all duration-300 ease-out
            ${
              sidebarCollapsed
                ? "flex items-center justify-center p-2"
                : "flex items-center gap-3 p-3"
            }
          `}
        >
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-blue-100
              text-xs font-bold text-blue-600
            "
          >
            {getInitials(user?.nombre)}
          </div>

          {/* Información del usuario */}
          {!sidebarCollapsed && (
            <>
              {/* Información */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-slate-800">
                  {user?.nombre}
                </p>

                <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                  {user?.rol}
                </p>
              </div>

              {/* <button
                                type="button"
                                title="Cerrar sesión"
                                onClick={handleLogout}
                                className="
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-lg text-slate-400
                  transition-colors duration-200
                  hover:bg-white hover:text-red-500
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-400/30
                "
                            >
                                <LogOut className="h-4 w-4" />
                            </button> */}
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarDashboard;
