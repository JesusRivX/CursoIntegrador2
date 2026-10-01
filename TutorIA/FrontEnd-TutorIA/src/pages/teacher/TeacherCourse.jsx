import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Edit,
  FileText,
  GraduationCap,
  Plus,
  Trash2,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";

import { users } from "../../data/auth/users";
import { courses } from "../../data/academic/courses";

const TeacherCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const numericCourseId = Number(courseId);

  // =========================================================
  // DOCENTE ACTUAL
  // =========================================================

  const teacher = useMemo(() => {
    return users.find((user) => user.rol === "Docente");
  }, []);

  // =========================================================
  // CURSO ORIGINAL
  // =========================================================

  const originalCourse = useMemo(() => {
    return courses.find((item) => item.id === numericCourseId) || null;
  }, [numericCourseId]);

  // =========================================================
  // CURSO LOCAL
  //
  // Se utiliza para trabajar temporalmente con los temas.
  // No modificamos directamente courses.js.
  // =========================================================

  const [courseData, setCourseData] = useState(() => {
    const found = courses.find((item) => item.id === numericCourseId);

    if (!found) {
      return null;
    }

    return {
      ...found,
      temas: found.temas ? [...found.temas] : [],
    };
  });

  // =========================================================
  // TEMA SELECCIONADO
  // =========================================================

  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // =========================================================
  // MODAL
  // =========================================================

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopicId, setEditingTopicId] = useState(null);

  // =========================================================
  // FORMULARIO
  // =========================================================

  const emptyForm = {
    nombre: "",
    descripcion: "",
    ejemploTitulo: "",
    problema: "",
    solucion: "",
    respuesta: "",
    archivoNombre: "",
    archivoUrl: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // =========================================================
  // CURSO ACTUAL
  //
  // Si courseData todavía corresponde al curso solicitado,
  // utilizamos sus cambios locales.
  //
  // Si la URL cambia a otro curso, mostramos temporalmente
  // el curso original correspondiente.
  // =========================================================

  const currentCourse = useMemo(() => {
    if (!originalCourse) {
      return null;
    }

    if (courseData?.id === numericCourseId) {
      return courseData;
    }

    return {
      ...originalCourse,
      temas: originalCourse.temas ? [...originalCourse.temas] : [],
    };
  }, [courseData, originalCourse, numericCourseId]);

  // =========================================================
  // VALIDAR ACCESO
  // =========================================================

  const hasAccess = useMemo(() => {
    return teacher?.cursos?.includes(numericCourseId) || false;
  }, [teacher, numericCourseId]);

  // =========================================================
  // TEMA SELECCIONADO
  //
  // No usamos useEffect.
  //
  // Si selectedTopicId existe y pertenece al curso,
  // mostramos ese tema.
  //
  // Si no existe, mostramos automáticamente el primer tema.
  // =========================================================

  const selectedTopic = useMemo(() => {
    if (!currentCourse?.temas?.length) {
      return null;
    }

    const foundTopic = currentCourse.temas.find(
      (topic) => topic.id === selectedTopicId,
    );

    return foundTopic || currentCourse.temas[0];
  }, [currentCourse, selectedTopicId]);

  // =========================================================
  // ABRIR MODAL PARA NUEVO TEMA
  // =========================================================

  const handleAddTopic = () => {
    setEditingTopicId(null);
    setFormData({ ...emptyForm });
    setIsModalOpen(true);
  };

  // =========================================================
  // ABRIR MODAL PARA EDITAR
  // =========================================================

  const handleEditTopic = () => {
    if (!selectedTopic) {
      return;
    }

    setEditingTopicId(selectedTopic.id);

    setFormData({
      nombre: selectedTopic.nombre || "",
      descripcion: selectedTopic.descripcion || "",
      ejemploTitulo: selectedTopic.ejemplo?.titulo || "",
      problema: selectedTopic.ejemplo?.problema || "",
      solucion: selectedTopic.ejemplo?.solucion || "",
      respuesta: selectedTopic.ejemplo?.respuesta || "",
      archivoNombre: selectedTopic.archivo?.nombre || "",
      archivoUrl: selectedTopic.archivo?.url || "",
    });

    setIsModalOpen(true);
  };

  // =========================================================
  // CERRAR MODAL
  // =========================================================

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTopicId(null);
    setFormData({ ...emptyForm });
  };

  // =========================================================
  // CAMBIAR INPUT
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // GUARDAR TEMA
  // =========================================================

  const handleSaveTopic = (event) => {
    event.preventDefault();

    const nombre = formData.nombre.trim();
    const descripcion = formData.descripcion.trim();

    if (!nombre || !descripcion) {
      return;
    }

    // =======================================================
    // EJEMPLO
    // =======================================================

    const hasExample =
      formData.ejemploTitulo.trim() ||
      formData.problema.trim() ||
      formData.solucion.trim() ||
      formData.respuesta.trim();

    const ejemplo = hasExample
      ? {
          titulo: formData.ejemploTitulo.trim(),
          problema: formData.problema.trim(),
          solucion: formData.solucion.trim(),
          respuesta: formData.respuesta.trim(),
        }
      : undefined;

    // =======================================================
    // ARCHIVO
    // =======================================================

    const hasFile = formData.archivoNombre.trim() || formData.archivoUrl.trim();

    const archivo = hasFile
      ? {
          nombre: formData.archivoNombre.trim() || "Material de apoyo",
          url: formData.archivoUrl.trim() || "#",
        }
      : undefined;

    // =======================================================
    // EDITAR TEMA
    // =======================================================

    if (editingTopicId !== null) {
      setCourseData((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          temas: prev.temas.map((topic) => {
            if (topic.id !== editingTopicId) {
              return topic;
            }

            return {
              ...topic,
              nombre,
              descripcion,
              ...(ejemplo ? { ejemplo } : {}),
              ...(!ejemplo ? { ejemplo: undefined } : {}),
              ...(archivo ? { archivo } : {}),
              ...(!archivo ? { archivo: undefined } : {}),
            };
          }),
        };
      });

      handleCloseModal();
      return;
    }

    // =======================================================
    // NUEVO TEMA
    // =======================================================

    const currentTopics = currentCourse?.temas || [];

    const newId =
      currentTopics.length > 0
        ? Math.max(...currentTopics.map((topic) => topic.id)) + 1
        : 1;

    const newTopic = {
      id: newId,
      nombre,
      descripcion,
      ...(ejemplo ? { ejemplo } : {}),
      ...(archivo ? { archivo } : {}),
    };

    setCourseData((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        temas: [...prev.temas, newTopic],
      };
    });

    setSelectedTopicId(newId);

    handleCloseModal();
  };

  // =========================================================
  // ELIMINAR TEMA
  // =========================================================

  const handleDeleteTopic = () => {
    if (!selectedTopic || !currentCourse) {
      return;
    }

    const confirmed = window.confirm(
      `¿Estás seguro de eliminar el tema "${selectedTopic.nombre}"?`,
    );

    if (!confirmed) {
      return;
    }

    const currentIndex = currentCourse.temas.findIndex(
      (topic) => topic.id === selectedTopic.id,
    );

    const remainingTopics = currentCourse.temas.filter(
      (topic) => topic.id !== selectedTopic.id,
    );

    setCourseData((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        temas: remainingTopics,
      };
    });

    if (remainingTopics.length > 0) {
      const nextTopic =
        remainingTopics[currentIndex] ||
        remainingTopics[currentIndex - 1] ||
        remainingTopics[0];

      setSelectedTopicId(nextTopic.id);
    } else {
      setSelectedTopicId(null);
    }
  };

  // =========================================================
  // CURSO NO ENCONTRADO
  // =========================================================

  if (!originalCourse) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
            <BookOpen className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-sm font-bold text-slate-700">
            Curso no encontrado
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            El curso que intentas consultar no existe.
          </p>

          <button
            type="button"
            onClick={() => navigate("/app/docente")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a mis cursos
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // SIN PERMISO
  // =========================================================

  if (!hasAccess) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <GraduationCap className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-sm font-bold text-slate-700">
            Curso no asignado
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            No tienes acceso a este curso porque actualmente no se encuentra
            dentro de tus cursos asignados.
          </p>

          <button
            type="button"
            onClick={() => navigate("/app/docente")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a mis cursos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-8">
      {/* =========================================================
          NAVEGACIÓN
      ========================================================= */}

      <button
        type="button"
        onClick={() => navigate("/app/docente")}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a mis cursos
      </button>

      {/* =========================================================
          INFORMACIÓN DEL CURSO
      ========================================================= */}

      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 shadow-xl shadow-slate-200 sm:p-8">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur">
              <BookOpen className="h-3.5 w-3.5" />
              CURSO ASIGNADO
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {currentCourse.nombre}
            </h1>

            <p className="mt-2 text-xs font-medium text-slate-400">
              {currentCourse.codigo}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              {currentCourse.descripcion}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                {currentCourse.nivel}
              </span>

              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                {currentCourse.grado} grado
              </span>

              <span className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                {currentCourse.estado}
              </span>
            </div>
          </div>

          <div className="hidden shrink-0 lg:flex">
            <div className="flex h-28 w-28 items-center justify-center rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-xl">
              <BookOpen className="h-12 w-12 text-blue-300" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RESUMEN DEL CURSO
      ========================================================= */}

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Temas</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {currentCourse.temas.length}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Contenidos disponibles
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <FileText className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Materiales</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {currentCourse.temas.filter((topic) => topic.archivo).length}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Archivos disponibles
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <GraduationCap className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Nivel</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {currentCourse.nivel}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            {currentCourse.grado} grado
          </p>
        </div>
      </section>

      {/* =========================================================
          CONTENIDO DEL CURSO
      ========================================================= */}

      <section className="grid gap-5 lg:grid-cols-[280px_1fr]">
        {/* =======================================================
            LISTA DE TEMAS
        ======================================================= */}

        <aside className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Contenido</h2>

              <p className="mt-1 text-[10px] text-slate-400">
                {currentCourse.temas.length}{" "}
                {currentCourse.temas.length === 1 ? "tema" : "temas"}
              </p>
            </div>

            <button
              type="button"
              title="Agregar tema"
              onClick={handleAddTopic}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-1.5">
            {currentCourse.temas.length > 0 ? (
              currentCourse.temas.map((topic, index) => {
                const isSelected = selectedTopic?.id === topic.id;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isSelected
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {index + 1}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-xs font-semibold ${
                          isSelected ? "text-blue-700" : "text-slate-700"
                        }`}
                      >
                        {topic.nombre}
                      </span>

                      <span className="mt-0.5 block text-[10px] text-slate-400">
                        {topic.archivo ? "Contenido + material" : "Contenido"}
                      </span>
                    </span>

                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 transition ${
                        isSelected
                          ? "text-blue-500"
                          : "text-slate-300 group-hover:text-slate-400"
                      }`}
                    />
                  </button>
                );
              })
            ) : (
              <div className="rounded-xl bg-slate-50 p-5 text-center">
                <BookOpen className="mx-auto h-6 w-6 text-slate-300" />

                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Sin temas
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  Agrega el primer tema de este curso.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddTopic}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar tema
          </button>
        </aside>

        {/* =======================================================
            DETALLE DEL TEMA
        ======================================================= */}

        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {selectedTopic ? (
            <div className="p-5 sm:p-6">
              {/* Encabezado */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-600">
                    <BookOpen className="h-3 w-3" />
                    TEMA
                  </div>

                  <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                    {selectedTopic.nombre}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {selectedTopic.descripcion}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={handleEditTopic}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteTopic}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    title="Eliminar tema"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="my-6 border-t border-slate-100" />

              {/* ===================================================
                  EJEMPLO
              =================================================== */}

              {selectedTopic.ejemplo && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Ejemplo práctico
                  </p>

                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {selectedTopic.ejemplo.titulo}
                  </h3>

                  <div className="mt-4 grid gap-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Problema
                      </p>

                      <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                        {selectedTopic.ejemplo.problema}
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-500">
                        Solución
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {selectedTopic.ejemplo.solucion}
                      </p>
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                        Respuesta
                      </p>

                      <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
                        {selectedTopic.ejemplo.respuesta}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ===================================================
                  ARCHIVO
              =================================================== */}

              {selectedTopic.archivo && (
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Material de apoyo
                  </p>

                  <div className="mt-3 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                        <FileText className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-700">
                          {selectedTopic.archivo.nombre}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Material PDF
                        </p>
                      </div>
                    </div>

                    <a
                      href={selectedTopic.archivo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Ver material
                    </a>
                  </div>
                </div>
              )}

              {/* ===================================================
                  SIN CONTENIDO
              =================================================== */}

              {!selectedTopic.ejemplo && !selectedTopic.archivo && (
                <div className="rounded-xl bg-slate-50 p-6 text-center">
                  <FileText className="mx-auto h-7 w-7 text-slate-300" />

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    Este tema todavía no tiene contenido
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Puedes editar el tema para agregar ejemplos y material de
                    apoyo.
                  </p>

                  <button
                    type="button"
                    onClick={handleEditTopic}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Agregar contenido
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex min-h-100 items-center justify-center p-6 text-center">
              <div>
                <BookOpen className="mx-auto h-8 w-8 text-slate-300" />

                <p className="mt-3 text-sm font-semibold text-slate-600">
                  Selecciona un tema
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Selecciona un tema para consultar su contenido.
                </p>

                <button
                  type="button"
                  onClick={handleAddTopic}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Crear primer tema
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          MODAL AGREGAR / EDITAR TEMA
      ========================================================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {editingTopicId !== null ? "Editar tema" : "Agregar tema"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {editingTopicId !== null
                    ? "Actualiza el contenido del tema."
                    : "Crea un nuevo contenido para este curso."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSaveTopic}
              className="overflow-y-auto p-5 sm:p-6"
            >
              {/* Información básica */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Información del tema
                </p>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Nombre del tema *
                    </label>

                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Números enteros"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Descripción *
                    </label>

                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe qué aprenderá el estudiante..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Ejemplo */}
              <div className="mt-7 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Ejemplo práctico
                  </p>
                </div>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Título del ejemplo
                    </label>

                    <input
                      type="text"
                      name="ejemploTitulo"
                      value={formData.ejemploTitulo}
                      onChange={handleChange}
                      placeholder="Ej. Suma de números enteros"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Problema
                    </label>

                    <textarea
                      name="problema"
                      value={formData.problema}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Ej. Calcula: -8 + 13"
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Solución
                    </label>

                    <textarea
                      name="solucion"
                      value={formData.solucion}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Explica paso a paso cómo resolverlo..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Respuesta
                    </label>

                    <input
                      type="text"
                      name="respuesta"
                      value={formData.respuesta}
                      onChange={handleChange}
                      placeholder="Ej. 5"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Material */}
              <div className="mt-7 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Material de apoyo
                  </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Nombre del archivo
                    </label>

                    <input
                      type="text"
                      name="archivoNombre"
                      value={formData.archivoNombre}
                      onChange={handleChange}
                      placeholder="Ej. Practica_Numeros_Enteros.pdf"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      URL del archivo
                    </label>

                    <input
                      type="text"
                      name="archivoUrl"
                      value={formData.archivoUrl}
                      onChange={handleChange}
                      placeholder="/pdf/matematica/material.pdf"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Aviso */}
              <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />

                <p className="text-[11px] leading-5 text-blue-700">
                  Los cambios se mantienen mientras permanezca abierta esta
                  sesión. Para guardarlos permanentemente será necesario
                  conectarlos posteriormente con una API o base de datos.
                </p>
              </div>

              {/* Acciones */}
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Save className="h-3.5 w-3.5" />

                  {editingTopicId !== null ? "Guardar cambios" : "Crear tema"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCourse;
