import { useMemo, useState } from "react";
import { users as usuarios } from "../../data/auth/users";
import { courses } from "../../data/academic/courses";
import {
    Edit3,
    Search,
    Trash2,
    UserPlus,
    Users,
    ShieldCheck,
    GraduationCap,
    X,
    Eye,
    EyeOff,
    BookOpen,
} from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers] = useState(usuarios);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Todos");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        nombre: "",
        rol: "Estudiante",
        codigo: "",
        password: "",
        nivel: "",
        grado: "",
        especialidad: "",
        cursos: [],
        estado: "Activo",
    });

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                user.nombre.toLowerCase().includes(searchValue) ||
                user.codigo.toLowerCase().includes(searchValue);

            const matchesRole = roleFilter === "Todos" || user.rol === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const totalUsers = users.length;

    const totalStudents = users.filter(
        (user) => user.rol === "Estudiante",
    ).length;

    const totalTeachers = users.filter((user) => user.rol === "Docente").length;

    const totalAdmins = users.filter(
        (user) => user.rol === "Administrador",
    ).length;

    const openCreateModal = () => {
        setEditingUser(null);

        setForm({
            nombre: "",
            rol: "Estudiante",
            codigo: "",
            password: "",
            nivel: "",
            grado: "",
            especialidad: "",
            cursos: [],
            estado: "Activo",
        });

        setShowPassword(false);
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);

        setForm({
            nombre: user.nombre || "",
            rol: user.rol || "Estudiante",
            codigo: user.codigo || "",
            password: user.password || "",
            nivel: user.nivel || "",
            grado: user.grado || "",
            especialidad: user.especialidad || "",
            cursos: user.cursos || [],
            estado: user.estado || "Activo",
        });

        setShowPassword(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setShowPassword(false);
    };

    const openDetailModal = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedUser(null);
        setIsDetailModalOpen(false);
    };

    const handleRoleChange = (event) => {
        const newRole = event.target.value;

        setForm((currentForm) => ({
            ...currentForm,
            rol: newRole,
            nivel: "",
            grado: "",
            especialidad: "",
            cursos: [],
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.nombre.trim()) {
            alert("Ingresa el nombre del usuario.");
            return;
        }

        if (!form.codigo.trim()) {
            alert("Ingresa el código del usuario.");
            return;
        }

        if (!form.password.trim()) {
            alert("Ingresa una contraseña.");
            return;
        }

        if (form.rol === "Estudiante") {
            if (!form.nivel.trim()) {
                alert("Selecciona el nivel del estudiante.");
                return;
            }

            if (!form.grado.trim()) {
                alert("Selecciona el grado del estudiante.");
                return;
            }
        }

        if (form.rol === "Docente") {
            if (!form.nivel.trim()) {
                alert("Selecciona el nivel del docente.");
                return;
            }

            if (!form.especialidad.trim()) {
                alert("Ingresa la especialidad del docente.");
                return;
            }
        }

        if (editingUser) {
            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === editingUser.id
                        ? {
                            ...user,
                            nombre: form.nombre,
                            rol: form.rol,
                            codigo: form.codigo,
                            password: form.password,
                            estado: form.estado,

                            ...(form.rol === "Estudiante"
                                ? {
                                    nivel: form.nivel,
                                    grado: form.grado,
                                    cursos: form.cursos,
                                    especialidad: undefined,
                                }
                                : {}),

                            ...(form.rol === "Docente"
                                ? {
                                    nivel: form.nivel,
                                    especialidad: form.especialidad,
                                    grado: undefined,
                                    cursos: undefined,
                                }
                                : {}),

                            ...(form.rol === "Administrador"
                                ? {
                                    nivel: undefined,
                                    grado: undefined,
                                    especialidad: undefined,
                                    cursos: undefined,
                                }
                                : {}),
                        }
                        : user,
                ),
            );
        } else {
            const newUser = {
                id: Date.now(),
                nombre: form.nombre,
                rol: form.rol,
                codigo: form.codigo,
                password: form.password,
                estado: form.estado,

                ...(form.rol === "Estudiante" && {
                    nivel: form.nivel,
                    grado: form.grado,
                    cursos: form.cursos,
                }),

                ...(form.rol === "Docente" && {
                    nivel: form.nivel,
                    especialidad: form.especialidad,
                }),
            };

            setUsers((currentUsers) => [...currentUsers, newUser]);
        }

        closeModal();
    };

    const handleDelete = (user) => {
        const confirmed = window.confirm(
            `¿Seguro que deseas eliminar a ${user.nombre}?`,
        );

        if (!confirmed) return;

        setUsers((currentUsers) =>
            currentUsers.filter((currentUser) => currentUser.id !== user.id),
        );
    };

    const getRoleStyles = (role) => {
        switch (role) {
            case "Estudiante":
                return "bg-blue-50 text-blue-600";

            case "Docente":
                return "bg-violet-50 text-violet-600";

            case "Administrador":
                return "bg-emerald-50 text-emerald-600";

            default:
                return "bg-slate-50 text-slate-600";
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case "Estudiante":
                return Users;

            case "Docente":
                return GraduationCap;

            case "Administrador":
                return ShieldCheck;

            default:
                return Users;
        }
    };

    const getStatusStyles = (estado) => {
        if (estado === "Activo") {
            return "bg-emerald-50 text-emerald-600";
        }

        return "bg-red-100 text-red-500";
    };

    const getCourseName = (courseId) => {
        const course = courses.find((course) => course.id === courseId);
        return course?.nombre || "Curso no encontrado";
    };

    return (
        <div className="space-y-5 pb-8">
            <section className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                        <Users className="h-3.5 w-3.5" />
                        GESTIÓN DE USUARIOS
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Usuarios
                    </h1>

                    <p className="mt-1 max-w-xl text-sm text-slate-400">
                        Administra estudiantes, docentes y administradores de la plataforma.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
                >
                    <UserPlus className="h-4 w-4" />
                    Nuevo usuario
                </button>
            </section>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                <button
                    type="button"
                    onClick={() => setRoleFilter("Todos")}
                    className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${roleFilter === "Todos"
                            ? "border-blue-200 ring-2 ring-blue-50"
                            : "border-slate-200/80"
                        }`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Users className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">Todos</p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">{totalUsers}</p>
                </button>

                <button
                    type="button"
                    onClick={() => setRoleFilter("Estudiante")}
                    className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${roleFilter === "Estudiante"
                            ? "border-blue-200 ring-2 ring-blue-50"
                            : "border-slate-200/80"
                        }`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Users className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">Estudiantes</p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {totalStudents}
                    </p>
                </button>

                <button
                    type="button"
                    onClick={() => setRoleFilter("Docente")}
                    className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${roleFilter === "Docente"
                            ? "border-violet-200 ring-2 ring-violet-50"
                            : "border-slate-200/80"
                        }`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <GraduationCap className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">Docentes</p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {totalTeachers}
                    </p>
                </button>

                <button
                    type="button"
                    onClick={() => setRoleFilter("Administrador")}
                    className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${roleFilter === "Administrador"
                            ? "border-emerald-200 ring-2 ring-emerald-50"
                            : "border-slate-200/80"
                        }`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ShieldCheck className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Administradores
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {totalAdmins}
                    </p>
                </button>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full lg:max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar por nombre o código..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                            />
                        </div>

                        <select
                            value={roleFilter}
                            onChange={(event) => setRoleFilter(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                        >
                            <option value="Todos">Todos los roles</option>

                            <option value="Estudiante">Estudiantes</option>

                            <option value="Docente">Docentes</option>

                            <option value="Administrador">Administradores</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <p className="text-xs text-slate-400">
                            Mostrando{" "}
                            <span className="font-bold text-slate-600">
                                {filteredUsers.length}
                            </span>{" "}
                            usuarios
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Usuario
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Código
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Rol
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Estado
                                </th>

                                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map((user) => {
                                const RoleIcon = getRoleIcon(user.rol);

                                return (
                                    <tr
                                        key={user.id}
                                        className="group transition hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                                                    {user.nombre.charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">
                                                        {user.nombre}
                                                    </p>

                                                    <p className="mt-0.5 text-[11px] text-slate-400">
                                                        ID #{user.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-xs font-semibold text-slate-600">
                                                {user.codigo}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${getRoleStyles(
                                                    user.rol,
                                                )}`}
                                            >
                                                <RoleIcon className="h-3.5 w-3.5" />
                                                {user.rol}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${getStatusStyles(
                                                    user.estado,
                                                )}`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${user.estado === "Activo"
                                                            ? "bg-emerald-500"
                                                            : "bg-red-500"
                                                        }`}
                                                />

                                                {user.estado || "Inactivo"}
                                            </span>
                                        </td>

                                        {/* ACCIONES */}

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                {/* VER */}

                                                <button
                                                    type="button"
                                                    onClick={() => openDetailModal(user)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                                    title="Ver detalles"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>

                                                {/* EDITAR */}

                                                {/* <button
                                                    type="button"
                                                    onClick={() => openEditModal(user)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                                    title="Editar usuario"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </button> */}

                                                {/* ELIMINAR */}

                                                {/* <button
                                                    type="button"
                                                    onClick={() => handleDelete(user)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                                                    title="Eliminar usuario"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {/* SIN RESULTADOS */}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                            <Users className="h-5 w-5" />
                                        </div>

                                        <p className="mt-4 text-sm font-bold text-slate-700">
                                            No encontramos usuarios
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Intenta cambiar la búsqueda o el filtro.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* =====================================================
          MODAL CREAR / EDITAR
      ===================================================== */}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        {/* HEADER */}

                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                            <div>
                                <h2 className="font-bold tracking-tight text-slate-900">
                                    {editingUser ? "Editar usuario" : "Nuevo usuario"}
                                </h2>

                                <p className="mt-1 text-xs text-slate-400">
                                    Completa la información del usuario.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* FORMULARIO */}

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            {/* NOMBRE */}

                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-600">
                                    Nombre completo
                                </label>

                                <input
                                    type="text"
                                    value={form.nombre}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            nombre: event.target.value,
                                        })
                                    }
                                    placeholder="Ej. Jesus Rivera"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            {/* ROL */}

                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-600">
                                    Rol
                                </label>

                                <select
                                    value={form.rol}
                                    onChange={handleRoleChange}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                >
                                    <option value="Estudiante">Estudiante</option>

                                    <option value="Docente">Docente</option>

                                    <option value="Administrador">Administrador</option>
                                </select>
                            </div>

                            {/* CODIGO */}

                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-600">
                                    Código de usuario
                                </label>

                                <input
                                    type="text"
                                    value={form.codigo}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            codigo: event.target.value,
                                        })
                                    }
                                    placeholder={
                                        form.rol === "Estudiante"
                                            ? "Ej. EST-2026-002"
                                            : form.rol === "Docente"
                                                ? "Ej. DOC-2026-002"
                                                : "Ej. ADM-2026-002"
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            {/* =================================================
                  CAMPOS ESTUDIANTE
              ================================================= */}

                            {form.rol === "Estudiante" && (
                                <div className="space-y-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                            <GraduationCap className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Información académica
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                Datos específicos del estudiante.
                                            </p>
                                        </div>
                                    </div>

                                    {/* NIVEL */}

                                    <div>
                                        <label className="mb-2 block text-xs font-bold text-slate-600">
                                            Nivel
                                        </label>

                                        <select
                                            value={form.nivel}
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    nivel: event.target.value,
                                                })
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                                        >
                                            <option value="">Selecciona un nivel</option>

                                            <option value="Primaria">Primaria</option>

                                            <option value="Secundaria">Secundaria</option>
                                        </select>
                                    </div>

                                    {/* GRADO */}

                                    <div>
                                        <label className="mb-2 block text-xs font-bold text-slate-600">
                                            Grado
                                        </label>

                                        <select
                                            value={form.grado}
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    grado: event.target.value,
                                                })
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                                        >
                                            <option value="">Selecciona un grado</option>

                                            <option value="1ro">1ro</option>

                                            <option value="2do">2do</option>

                                            <option value="3ro">3ro</option>

                                            <option value="4to">4to</option>

                                            <option value="5to">5to</option>

                                            <option value="6to">6to</option>
                                        </select>
                                    </div>

                                    {/* CURSOS */}

                                    <div>
                                        <label className="mb-2 block text-xs font-bold text-slate-600">
                                            Cursos asignados
                                        </label>

                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {courses
                                                .filter(
                                                    (curso) =>
                                                        curso.estado === "Activo" &&
                                                        curso.nivel === form.nivel,
                                                )
                                                .map((curso) => {
                                                    const isSelected = form.cursos.includes(curso.id);

                                                    return (
                                                        <label
                                                            key={curso.id}
                                                            className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition ${isSelected
                                                                    ? "border-blue-200 bg-blue-50 text-blue-700"
                                                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                                }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={() => {
                                                                    setForm((currentForm) => ({
                                                                        ...currentForm,

                                                                        cursos: isSelected
                                                                            ? currentForm.cursos.filter(
                                                                                (item) => item !== curso.id,
                                                                            )
                                                                            : [...currentForm.cursos, curso.id],
                                                                    }));
                                                                }}
                                                                className="h-4 w-4 accent-blue-600"
                                                            />

                                                            <div>
                                                                <p className="font-medium">{curso.nombre}</p>

                                                                <p className="text-[10px] text-slate-400">
                                                                    ID #{curso.id}
                                                                </p>
                                                            </div>
                                                        </label>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                  CAMPOS DOCENTE
              ================================================= */}

                            {form.rol === "Docente" && (
                                <div className="space-y-5 rounded-2xl border border-violet-100 bg-violet-50/50 p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                            <GraduationCap className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Información docente
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                Datos específicos del docente.
                                            </p>
                                        </div>
                                    </div>

                                    {/* NIVEL */}

                                    <div>
                                        <label className="mb-2 block text-xs font-bold text-slate-600">
                                            Nivel
                                        </label>

                                        <select
                                            value={form.nivel}
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    nivel: event.target.value,
                                                })
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
                                        >
                                            <option value="">Selecciona un nivel</option>

                                            <option value="Primaria">Primaria</option>

                                            <option value="Secundaria">Secundaria</option>
                                        </select>
                                    </div>

                                    {/* ESPECIALIDAD */}

                                    <div>
                                        <label className="mb-2 block text-xs font-bold text-slate-600">
                                            Especialidad
                                        </label>

                                        <input
                                            type="text"
                                            value={form.especialidad}
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    especialidad: event.target.value,
                                                })
                                            }
                                            placeholder="Ej. Matemática"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                  ESTADO
              ================================================= */}

                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-600">
                                    Estado
                                </label>

                                <select
                                    value={form.estado}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            estado: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                >
                                    <option value="Activo">Activo</option>

                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>

                            {/* CONTRASEÑA */}

                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-600">
                                    Contraseña
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                password: event.target.value,
                                            })
                                        }
                                        placeholder="Ingresa una contraseña"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* BOTONES */}

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
                                >
                                    {editingUser ? "Guardar cambios" : "Crear usuario"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =====================================================
          MODAL DETALLES
      ===================================================== */}

            {isDetailModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        {/* HEADER */}

                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Eye className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-bold tracking-tight text-slate-900">
                                            Detalles del usuario
                                        </h2>

                                        <p className="text-xs text-slate-400">
                                            Información completa
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeDetailModal}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* CONTENIDO */}

                        <div className="space-y-5 p-6">
                            {/* PERFIL */}

                            <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-600 shadow-sm">
                                    {selectedUser.nombre.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <p className="font-bold text-slate-900">
                                        {selectedUser.nombre}
                                    </p>

                                    <p className="mt-1 font-mono text-xs text-slate-400">
                                        {selectedUser.codigo}
                                    </p>
                                </div>
                            </div>

                            {/* INFORMACIÓN GENERAL */}

                            <div>
                                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Información general
                                </p>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-slate-100 p-4">
                                        <p className="text-[11px] font-medium text-slate-400">
                                            Rol
                                        </p>

                                        <div className="mt-2">
                                            {(() => {
                                                const RoleIcon = getRoleIcon(selectedUser.rol);

                                                return (
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${getRoleStyles(
                                                            selectedUser.rol,
                                                        )}`}
                                                    >
                                                        <RoleIcon className="h-3.5 w-3.5" />

                                                        {selectedUser.rol}
                                                    </span>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-slate-100 p-4">
                                        <p className="text-[11px] font-medium text-slate-400">
                                            Estado
                                        </p>

                                        <div className="mt-2">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${getStatusStyles(
                                                    selectedUser.estado,
                                                )}`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${selectedUser.estado === "Activo"
                                                            ? "bg-emerald-500"
                                                            : "bg-slate-400"
                                                        }`}
                                                />

                                                {selectedUser.estado || "Inactivo"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* INFORMACIÓN ESPECÍFICA */}

                            {selectedUser.rol === "Estudiante" && (
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-blue-600" />

                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Información académica
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-slate-100 p-4">
                                            <p className="text-[11px] text-slate-400">Nivel</p>

                                            <p className="mt-1 text-sm font-bold text-slate-800">
                                                {selectedUser.nivel || "No registrado"}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-slate-100 p-4">
                                            <p className="text-[11px] text-slate-400">Grado</p>

                                            <p className="mt-1 text-sm font-bold text-slate-800">
                                                {selectedUser.grado || "No registrado"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 rounded-xl border border-slate-100 p-4">
                                        <p className="text-[11px] text-slate-400">
                                            Cursos asignados
                                        </p>

                                        {selectedUser.cursos?.length > 0 ? (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {selectedUser.cursos.map((cursoId) => (
                                                    <span
                                                        key={cursoId}
                                                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600"
                                                    >
                                                        {getCourseName(cursoId)}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="mt-2 text-xs text-slate-400">
                                                No tiene cursos asignados.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* DOCENTE */}

                            {selectedUser.rol === "Docente" && (
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4 text-violet-600" />

                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Información docente
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-slate-100 p-4">
                                            <p className="text-[11px] text-slate-400">Nivel</p>

                                            <p className="mt-1 text-sm font-bold text-slate-800">
                                                {selectedUser.nivel || "No registrado"}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-slate-100 p-4">
                                            <p className="text-[11px] text-slate-400">Especialidad</p>

                                            <p className="mt-1 text-sm font-bold text-slate-800">
                                                {selectedUser.especialidad || "No registrada"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ADMINISTRADOR */}

                            {selectedUser.rol === "Administrador" && (
                                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Cuenta administrativa
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Este usuario tiene permisos de administración.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CERRAR */}

                            <div className="border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={closeDetailModal}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
