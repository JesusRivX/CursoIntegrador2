import { useMemo, useState } from "react";
import { courses as cursosIniciales } from "../../../data/academic/courses";

const initialForm = {
  nombre: "",
  codigo: "",
  nivel: "Secundaria",
  grado: "2do",
  descripcion: "",
  estado: "Activo",
  temas: [],
};

const useAdminCourses = () => {
  const [courses, setCourses] = useState(cursosIniciales);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [form, setForm] = useState({
    ...initialForm,
    temas: [],
  });

  const [newTopic, setNewTopic] = useState("");

  const filteredCourses = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return courses.filter((course) => {
      const matchesSearch =
        course.nombre.toLowerCase().includes(searchValue) ||
        course.codigo.toLowerCase().includes(searchValue);

      const matchesLevel =
        levelFilter === "Todos" || course.nivel === levelFilter;

      const matchesStatus =
        statusFilter === "Todos" || course.estado === statusFilter;

      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [courses, search, levelFilter, statusFilter]);

  const totalCourses = courses.length;

  const activeCourses = courses.filter(
    (course) => course.estado === "Activo",
  ).length;

  const inactiveCourses = courses.filter(
    (course) => course.estado === "Inactivo",
  ).length;

  const primaryCourses = courses.filter(
    (course) => course.nivel === "Primaria",
  ).length;

  const secondaryCourses = courses.filter(
    (course) => course.nivel === "Secundaria",
  ).length;

  const openCreateModal = () => {
    setEditingCourse(null);
    setForm({
      ...initialForm,
      temas: [],
    });
    setNewTopic("");
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);

    setForm({
      nombre: course.nombre,
      codigo: course.codigo,
      nivel: course.nivel,
      grado: course.grado,
      descripcion: course.descripcion,
      estado: course.estado,
      temas: course.temas || [],
    });

    setNewTopic("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setNewTopic("");
  };

  const openDetailModal = (course) => {
    setSelectedCourse(course);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedCourse(null);
  };

  const updateForm = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleAddTopic = () => {
    const topicName = newTopic.trim();

    if (!topicName) return;

    const topic = {
      id: Date.now(),
      nombre: topicName,
    };

    setForm((currentForm) => ({
      ...currentForm,
      temas: [...currentForm.temas, topic],
    }));

    setNewTopic("");
  };

  const handleDeleteTopic = (topicId) => {
    setForm((currentForm) => ({
      ...currentForm,
      temas: currentForm.temas.filter((topic) => topic.id !== topicId),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.nombre.trim()) {
      alert("Ingresa el nombre del curso.");
      return;
    }

    if (!form.codigo.trim()) {
      alert("Ingresa el código del curso.");
      return;
    }

    if (!form.descripcion.trim()) {
      alert("Ingresa una descripción.");
      return;
    }

    if (editingCourse) {
      setCourses((currentCourses) =>
        currentCourses.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                nombre: form.nombre.trim(),
                codigo: form.codigo.trim(),
                nivel: form.nivel,
                grado: form.grado,
                descripcion: form.descripcion.trim(),
                estado: form.estado,
                temas: form.temas,
              }
            : course,
        ),
      );
    } else {
      const newCourse = {
        id: Date.now(),
        nombre: form.nombre.trim(),
        codigo: form.codigo.trim(),
        nivel: form.nivel,
        grado: form.grado,
        descripcion: form.descripcion.trim(),
        estado: form.estado,
        temas: form.temas,
      };

      setCourses((currentCourses) => [...currentCourses, newCourse]);
    }

    closeModal();
  };

  const handleDelete = (course) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar el curso "${course.nombre}"?`,
    );

    if (!confirmed) return;

    setCourses((currentCourses) =>
      currentCourses.filter((currentCourse) => currentCourse.id !== course.id),
    );

    if (selectedCourse?.id === course.id) {
      closeDetailModal();
    }
  };

  const toggleCourseStatus = (course) => {
    const newStatus = course.estado === "Activo" ? "Inactivo" : "Activo";

    setCourses((currentCourses) =>
      currentCourses.map((currentCourse) =>
        currentCourse.id === course.id
          ? {
              ...currentCourse,
              estado: newStatus,
            }
          : currentCourse,
      ),
    );

    if (selectedCourse?.id === course.id) {
      setSelectedCourse((currentCourse) => ({
        ...currentCourse,
        estado: newStatus,
      }));
    }
  };

  const showAllCourses = () => {
    setLevelFilter("Todos");
    setStatusFilter("Todos");
  };

  const showActiveCourses = () => {
    setStatusFilter("Activo");
    setLevelFilter("Todos");
  };

  const showInactiveCourses = () => {
    setStatusFilter("Inactivo");
    setLevelFilter("Todos");
  };

  const showPrimaryCourses = () => {
    setLevelFilter("Primaria");
    setStatusFilter("Todos");
  };

  const showSecondaryCourses = () => {
    setLevelFilter("Secundaria");
    setStatusFilter("Todos");
  };

  const getLevelStyles = (level) => {
    switch (level) {
      case "Primaria":
        return "bg-blue-50 text-blue-600";
      case "Secundaria":
        return "bg-violet-50 text-violet-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const getStatusStyles = (status) => {
    return status === "Activo"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-slate-100 text-slate-500";
  };

  return {
    courses,
    filteredCourses,

    search,
    setSearch,
    levelFilter,
    setLevelFilter,
    statusFilter,
    setStatusFilter,

    totalCourses,
    activeCourses,
    inactiveCourses,
    primaryCourses,
    secondaryCourses,

    isModalOpen,
    isDetailModalOpen,

    editingCourse,
    selectedCourse,

    form,
    newTopic,
    setNewTopic,
    updateForm,

    openCreateModal,
    openEditModal,
    closeModal,
    openDetailModal,
    closeDetailModal,

    handleAddTopic,
    handleDeleteTopic,

    handleSubmit,
    handleDelete,
    toggleCourseStatus,

    showAllCourses,
    showActiveCourses,
    showInactiveCourses,
    showPrimaryCourses,
    showSecondaryCourses,

    getLevelStyles,
    getStatusStyles,
  };
};

export default useAdminCourses;
