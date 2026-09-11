import {
    BarChart3,
    BookOpen,
    Bot,
    ClipboardCheck,
    LayoutDashboard,
    Users,
} from "lucide-react";

export const dashboardNavigation = {
    admin: [
        {
            label: "Inicio",
            icon: LayoutDashboard,
            path: "/app/admin",
        },
        {
            label: "Usuarios",
            icon: Users,
            path: "/app/admin/usuarios",
        },
        {
            label: "Cursos",
            icon: BookOpen,
            path: "/app/admin/cursos",
        },
    ],

    estudiante: [
        {
            label: "Inicio",
            icon: LayoutDashboard,
            path: "/app/estudiante",
        },
        {
            label: "Mis cursos",
            icon: BookOpen,
            path: "/app/estudiante/cursos",
        },
        {
            label: "Práctica",
            icon: ClipboardCheck,
            path: "/app/estudiante/practica",
        },
        {
            label: "Tutor IA",
            icon: Bot,
            path: "/app/estudiante/tutor",
        },
        // {
        //   label: "Mi progreso",
        //   icon: BarChart3,
        //   path: "/app/estudiante/progreso",
        // },
    ],

    docente: [
        {
            label: "Inicio",
            icon: LayoutDashboard,
            path: "/app/docente",
        },
        {
            label: "Mis aulas",
            icon: BarChart3,
            path: "/app/docente/aulas",
        },
    ],
};
