import {
  BookOpen,
  BookMarked,
  CheckCircle2,
  CircleOff,
  Edit3,
  Eye,
  Layers3,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import useAdminCourses from "./useAdminCourses";

const AdminCourses = () => {
  const {
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
  } = useAdminCourses();

  return (
    <div className="space-y-5 pb-8">
      <section className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
            <BookOpen className="h-3.5 w-3.5" />
            GESTIÓN ACADÉMICA
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Cursos
          </h1>

          <p className="mt-1 max-w-xl text-sm text-slate-400">
            Administra y supervisa la oferta académica disponible en ESTUD-IA.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nuevo curso
        </button>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        <button
          type="button"
          onClick={showAllCourses}
          className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
            levelFilter === "Todos" && statusFilter === "Todos"
              ? "border-blue-200 ring-2 ring-blue-50"
              : "border-slate-200/80"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <BookOpen className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Cursos</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {totalCourses}
          </p>
        </button>

        <button
          type="button"
          onClick={showActiveCourses}
          className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
            statusFilter === "Activo"
              ? "border-emerald-200 ring-2 ring-emerald-50"
              : "border-slate-200/80"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Activos</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {activeCourses}
          </p>
        </button>

        <button
          type="button"
          onClick={showInactiveCourses}
          className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
            statusFilter === "Inactivo"
              ? "border-slate-300 ring-2 ring-slate-100"
              : "border-slate-200/80"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <CircleOff className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Inactivos</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {inactiveCourses}
          </p>
        </button>

        <button
          type="button"
          onClick={showPrimaryCourses}
          className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
            levelFilter === "Primaria"
              ? "border-blue-200 ring-2 ring-blue-50"
              : "border-slate-200/80"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BookMarked className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Primaria</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {primaryCourses}
          </p>
        </button>

        <button
          type="button"
          onClick={showSecondaryCourses}
          className={`col-span-2 rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:col-span-1 ${
            levelFilter === "Secundaria"
              ? "border-violet-200 ring-2 ring-violet-50"
              : "border-slate-200/80"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Layers3 className="h-5 w-5" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">Secundaria</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {secondaryCourses}
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={levelFilter}
                onChange={(event) => setLevelFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="Todos">Todos los niveles</option>
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Activo">Activos</option>
                <option value="Inactivo">Inactivos</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-400">
              Mostrando{" "}
              <span className="font-bold text-slate-600">
                {filteredCourses.length}
              </span>{" "}
              cursos
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Curso
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Nivel
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Grado
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Temas
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
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="group transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {course.nombre}
                        </p>

                        <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                          {course.codigo}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ${getLevelStyles(
                        course.nivel,
                      )}`}
                    >
                      {course.nivel}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-600">
                      {course.grado}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Layers3 className="h-4 w-4" />
                      </div>

                      <span className="text-sm font-semibold text-slate-600">
                        {course.temas?.length || 0}
                      </span>

                      <span className="text-xs text-slate-400">temas</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${getStatusStyles(
                        course.estado,
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          course.estado === "Activo"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />

                      {course.estado}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openDetailModal(course)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        title="Ver curso"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(course)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        title="Editar curso"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCourseStatus(course)}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border bg-white transition ${
                          course.estado === "Activo"
                            ? "border-slate-200 text-slate-500 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                            : "border-emerald-200 text-emerald-500 hover:bg-emerald-50"
                        }`}
                        title={
                          course.estado === "Activo"
                            ? "Desactivar curso"
                            : "Activar curso"
                        }
                      >
                        {course.estado === "Activo" ? (
                          <CircleOff className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(course)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        title="Eliminar curso"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-700">
                      No encontramos cursos
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Intenta cambiar la búsqueda o los filtros.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  <h2 className="font-bold tracking-tight text-slate-900">
                    {editingCourse ? "Editar curso" : "Nuevo curso"}
                  </h2>
                </div>

                <p className="text-xs text-slate-400">
                  Configura la información académica del curso.
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

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Información general
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Datos principales del curso.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Nombre del curso
                    </label>

                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(event) =>
                        updateForm("nombre", event.target.value)
                      }
                      placeholder="Ej. Matemática"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Código
                    </label>

                    <input
                      type="text"
                      value={form.codigo}
                      onChange={(event) =>
                        updateForm("codigo", event.target.value)
                      }
                      placeholder="Ej. MAT-SEC-02"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Estado
                    </label>

                    <select
                      value={form.estado}
                      onChange={(event) =>
                        updateForm("estado", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Nivel educativo
                    </label>

                    <select
                      value={form.nivel}
                      onChange={(event) =>
                        updateForm("nivel", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="Primaria">Primaria</option>
                      <option value="Secundaria">Secundaria</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Grado
                    </label>

                    <select
                      value={form.grado}
                      onChange={(event) =>
                        updateForm("grado", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      {form.nivel === "Primaria" ? (
                        <>
                          <option value="1ro">1ro</option>
                          <option value="2do">2do</option>
                          <option value="3ro">3ro</option>
                          <option value="4to">4to</option>
                          <option value="5to">5to</option>
                          <option value="6to">6to</option>
                        </>
                      ) : (
                        <>
                          <option value="1ro">1ro</option>
                          <option value="2do">2do</option>
                          <option value="3ro">3ro</option>
                          <option value="4to">4to</option>
                          <option value="5to">5to</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Descripción
                    </label>

                    <textarea
                      value={form.descripcion}
                      onChange={(event) =>
                        updateForm("descripcion", event.target.value)
                      }
                      rows={3}
                      placeholder="Describe brevemente el objetivo del curso..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Temas del curso
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Agrega los temas que formarán parte del curso.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(event) => setNewTopic(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleAddTopic();
                      }
                    }}
                    placeholder="Ej. Números enteros"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={handleAddTopic}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {form.temas.length > 0 ? (
                    form.temas.map((topic, index) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
                            {index + 1}
                          </div>

                          <span className="truncate text-sm font-semibold text-slate-700">
                            {topic.nombre}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteTopic(topic.id)}
                          className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          title="Eliminar tema"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                      <Layers3 className="mx-auto h-5 w-5 text-slate-300" />

                      <p className="mt-2 text-xs font-medium text-slate-400">
                        Todavía no hay temas agregados.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  {editingCourse ? "Guardar cambios" : "Crear curso"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-slate-950 px-6 py-7">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-white">
                    {selectedCourse.nombre}
                  </h2>

                  <p className="mt-1 font-mono text-xs text-slate-400">
                    {selectedCourse.codigo}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDetailModal}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Nivel
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {selectedCourse.nivel}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Grado
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {selectedCourse.grado}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Estado
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${getStatusStyles(
                      selectedCourse.estado,
                    )}`}
                  >
                    {selectedCourse.estado}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Temas
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {selectedCourse.temas?.length || 0}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Descripción
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedCourse.descripcion}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">
                    Temas del curso
                  </h3>

                  <span className="text-xs font-medium text-slate-400">
                    {selectedCourse.temas?.length || 0} temas
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  {selectedCourse.temas?.length > 0 ? (
                    selectedCourse.temas.map((topic, index) => (
                      <div
                        key={topic.id}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[11px] font-bold text-blue-600">
                          {index + 1}
                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                          {topic.nombre}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-400">
                      Este curso todavía no tiene temas.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeDetailModal}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeDetailModal();
                    openEditModal(selectedCourse);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar curso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
