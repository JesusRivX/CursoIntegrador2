import { useMemo, useState } from "react";
import { users as initialUsers } from "../../../data/auth/users";

const createEmptyForm = () => ({
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

const getFormFromUser = (user) => ({
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

const validateUserForm = (form) => {
  if (!form.nombre.trim()) {
    return "Ingresa el nombre del usuario.";
  }

  if (!form.codigo.trim()) {
    return "Ingresa el código del usuario.";
  }

  if (!form.password.trim()) {
    return "Ingresa una contraseña.";
  }

  if (form.rol === "Estudiante") {
    if (!form.nivel.trim()) {
      return "Selecciona el nivel del estudiante.";
    }

    if (!form.grado.trim()) {
      return "Selecciona el grado del estudiante.";
    }
  }

  if (form.rol === "Docente") {
    if (!form.nivel.trim()) {
      return "Selecciona el nivel del docente.";
    }

    if (!form.especialidad.trim()) {
      return "Ingresa la especialidad del docente.";
    }
  }

  return null;
};

const buildUserData = (form) => ({
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
});

const buildUpdatedUser = (user, form) => ({
  ...user,
  ...buildUserData(form),

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
});

const useAdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState(createEmptyForm);

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.nombre.toLowerCase().includes(searchValue) ||
        user.codigo.toLowerCase().includes(searchValue);

      const matchesRole = roleFilter === "Todos" || user.rol === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const stats = useMemo(
    () => ({
      total: users.length,
      estudiantes: users.filter((user) => user.rol === "Estudiante").length,
      docentes: users.filter((user) => user.rol === "Docente").length,
      administradores: users.filter((user) => user.rol === "Administrador")
        .length,
    }),
    [users],
  );

  const openCreateModal = () => {
    setEditingUser(null);
    setForm(createEmptyForm());
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm(getFormFromUser(user));
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

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
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

  const handleCourseToggle = (courseId) => {
    setForm((currentForm) => {
      const isSelected = currentForm.cursos.includes(courseId);

      return {
        ...currentForm,
        cursos: isSelected
          ? currentForm.cursos.filter((item) => item !== courseId)
          : [...currentForm.cursos, courseId],
      };
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((currentValue) => !currentValue);
  };

  const createUser = (formData) => {
    const newUser = {
      id: Date.now(),
      ...buildUserData(formData),
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
  };

  const updateUser = (userId, formData) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? buildUpdatedUser(user, formData) : user,
      ),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateUserForm(form);

    if (validationError) {
      alert(validationError);
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, form);
    } else {
      createUser(form);
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

  return {
    users,
    filteredUsers,
    stats,

    search,
    setSearch,

    roleFilter,
    setRoleFilter,

    isModalOpen,
    isDetailModalOpen,

    editingUser,
    selectedUser,

    form,
    showPassword,

    openCreateModal,
    openEditModal,
    closeModal,

    openDetailModal,
    closeDetailModal,

    handleFormChange,
    handleRoleChange,
    handleCourseToggle,
    togglePasswordVisibility,

    handleSubmit,
    handleDelete,
  };
};

export default useAdminUsers;
