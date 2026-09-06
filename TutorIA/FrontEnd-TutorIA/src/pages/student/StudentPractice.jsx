import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

import { users } from "../../data/auth/users";
import { courses } from "../../data/academic/courses";
import { questionBank } from "../../data/academic/questionBank";

const StudentPractice = () => {
  const navigate = useNavigate();
  // =========================================================
  // ALUMNO ACTUAL
  // =========================================================

  const currentUser = useMemo(() => {
    const possibleKeys = [
      "user",
      "currentUser",
      "usuario",
      "authUser",
      "loggedUser",
    ];

    for (const key of possibleKeys) {
      try {
        const storedUser = localStorage.getItem(key);

        if (!storedUser) {
          continue;
        }

        const parsedUser = JSON.parse(storedUser);

        if (parsedUser) {
          return parsedUser;
        }
      } catch {
        console.warn(`No se pudo leer ${key} desde localStorage`);
      }
    }

    // Fallback para desarrollo
    return (
      users.find(
        (user) =>
          user.rol === "Estudiante" &&
          Array.isArray(user.cursos) &&
          user.cursos.length > 0,
      ) || null
    );
  }, []);

  // =========================================================
  // CURSOS DEL ALUMNO
  // =========================================================
  //
  // IMPORTANTE:
  //
  // El alumno puede tener:
  //
  // cursos: [1, 2, 3, 4]
  //
  // Pero eso NO significa que todos esos cursos sean visibles.
  //
  // Primero verificamos que el curso:
  //
  // 1. Esté asignado al alumno
  // 2. Tenga el mismo nivel
  // 3. Tenga el mismo grado
  //
  // Ejemplo:
  //
  // Alumno:
  // nivel: "Secundaria"
  // grado: "4to"
  //
  // Curso:
  // nivel: "Secundaria"
  // grado: "4to"
  //
  // => SE MUESTRA
  //
  // Curso:
  // nivel: "Secundaria"
  // grado: "1ero"
  //
  // => NO SE MUESTRA
  // =========================================================

  const assignedCourses = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    const studentCourses =
      currentUser.cursos ||
      currentUser.courses ||
      currentUser.cursosAsignados ||
      currentUser.coursesAssigned ||
      [];

    if (!Array.isArray(studentCourses)) {
      return [];
    }

    return courses.filter((course) => {
      // -------------------------------------------------------
      // 1. Verificar que el curso esté asignado
      // -------------------------------------------------------

      const isAssigned = studentCourses.some((studentCourse) => {
        if (typeof studentCourse === "number") {
          return course.id === studentCourse;
        }

        if (typeof studentCourse === "string") {
          return (
            String(course.id) === studentCourse ||
            course.codigo === studentCourse
          );
        }

        if (typeof studentCourse === "object" && studentCourse !== null) {
          return (
            studentCourse.id === course.id ||
            studentCourse.codigo === course.codigo ||
            studentCourse.courseId === course.id ||
            studentCourse.courseCode === course.codigo
          );
        }

        return false;
      });

      if (!isAssigned) {
        return false;
      }

      // -------------------------------------------------------
      // 2. Verificar nivel
      // -------------------------------------------------------

      const sameNivel =
        String(course.nivel || "")
          .trim()
          .toLowerCase() ===
        String(currentUser.nivel || "")
          .trim()
          .toLowerCase();

      if (!sameNivel) {
        return false;
      }

      // -------------------------------------------------------
      // 3. Verificar grado
      // -------------------------------------------------------

      const sameGrado =
        String(course.grado || "")
          .trim()
          .toLowerCase() ===
        String(currentUser.grado || "")
          .trim()
          .toLowerCase();

      if (!sameGrado) {
        return false;
      }

      return true;
    });
  }, [currentUser]);

  // =========================================================
  // ESTADOS
  // =========================================================

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(120);

  const [startedAt, setStartedAt] = useState(null);

  const [finishedAt, setFinishedAt] = useState(null);

  // =========================================================
  // PRÁCTICAS COMPLETADAS
  // =========================================================
  //
  // Se guardan así:
  //
  // localStorage:
  //
  // studentPracticeProgress
  //
  // [
  //   {
  //      studentId: 1,
  //      courseId: 1,
  //      topicId: 1,
  //      completed: true,
  //      percentage: 100,
  //      correct: 2,
  //      incorrect: 0,
  //      completedAt: "..."
  //   }
  // ]
  //
  // De esta manera cada alumno tiene su propio progreso.
  // =========================================================

  const progressStorageKey = "studentPracticeProgress";

  // =========================================================
  // CARGAR PROGRESO
  // =========================================================

  const [completedPractices, setCompletedPractices] = useState(() => {
    if (!currentUser?.id) {
      return [];
    }

    try {
      const storedProgress = localStorage.getItem(progressStorageKey);

      if (!storedProgress) {
        return [];
      }

      const parsedProgress = JSON.parse(storedProgress);

      if (!Array.isArray(parsedProgress)) {
        return [];
      }

      return parsedProgress.filter((item) => item.studentId === currentUser.id);
    } catch {
      console.error("No se pudo cargar el progreso de prácticas.");

      return [];
    }
  });

  // =========================================================
  // CURSO SELECCIONADO
  // =========================================================

  const selectedCourse = useMemo(() => {
    return (
      assignedCourses.find((course) => course.id === selectedCourseId) || null
    );
  }, [assignedCourses, selectedCourseId]);

  // =========================================================
  // TEMA SELECCIONADO
  // =========================================================

  const selectedTopic = useMemo(() => {
    if (!selectedCourse?.temas?.length) {
      return null;
    }

    return (
      selectedCourse.temas.find((topic) => topic.id === selectedTopicId) ||
      selectedCourse.temas[0]
    );
  }, [selectedCourse, selectedTopicId]);

  // =========================================================
  // BANCO DE PREGUNTAS
  // =========================================================

  // =========================================================
  // PREGUNTAS
  // =========================================================

  const questions = useMemo(() => {
    if (!selectedTopic) {
      return [];
    }

    return questionBank[selectedTopic.id] || [];
  }, [selectedTopic]);

  // =========================================================
  // VERIFICAR SI UN TEMA ESTÁ COMPLETADO
  // =========================================================

  const isTopicCompleted = (courseId, topicId) => {
    return completedPractices.some(
      (practice) =>
        practice.studentId === currentUser?.id &&
        practice.courseId === courseId &&
        practice.topicId === topicId &&
        practice.completed === true,
    );
  };

  // =========================================================
  // TIMER
  // =========================================================

  useEffect(() => {
    if (!isQuizStarted || isQuizFinished) {
      return undefined;
    }

    if (timeLeft <= 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizStarted, isQuizFinished, timeLeft]);

  // =========================================================
  // FORMATEAR TIEMPO
  // =========================================================

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  // =========================================================
  // TIEMPO UTILIZADO
  // =========================================================

  const elapsedTime = useMemo(() => {
    if (!startedAt || !finishedAt) {
      return 0;
    }

    return Math.max(0, Math.round((finishedAt - startedAt) / 1000));
  }, [startedAt, finishedAt]);

  // =========================================================
  // RESULTADOS
  // =========================================================

  const result = useMemo(() => {
    if (!questions.length) {
      return {
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        percentage: 0,
      };
    }

    const correct = answers.filter((answer) => answer.isCorrect).length;

    const incorrect = answers.filter((answer) => !answer.isCorrect).length;

    const unanswered = Math.max(0, questions.length - answers.length);

    const percentage = Math.round((correct / questions.length) * 100);

    return {
      correct,
      incorrect,
      unanswered,
      percentage,
    };
  }, [answers, questions]);

  // =========================================================
  // SELECCIONAR CURSO
  // =========================================================

  const handleSelectCourse = (course) => {
    setSelectedCourseId(course.id);

    setSelectedTopicId(course.temas?.[0]?.id || null);

    resetQuiz();
  };

  // =========================================================
  // SELECCIONAR TEMA
  // =========================================================

  const handleSelectTopic = (topic) => {
    setSelectedTopicId(topic.id);

    resetQuiz();
  };

  // =========================================================
  // INICIAR QUIZ
  // =========================================================

  const handleStartQuiz = () => {
    if (!questions.length) {
      return;
    }

    setAnswers([]);

    setCurrentQuestion(0);

    setSelectedAnswer(null);

    setTimeLeft(120);

    setStartedAt(Date.now());

    setFinishedAt(null);

    setIsQuizFinished(false);

    setIsQuizStarted(true);
  };

  // =========================================================
  // SELECCIONAR RESPUESTA
  // =========================================================

  const handleSelectAnswer = (answer) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answer);
  };

  // =========================================================
  // SIGUIENTE PREGUNTA
  // =========================================================
  const getCurrentTimestamp = () => new Date().getTime();
  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      return;
    }

    const question = questions[currentQuestion];

    const newAnswer = {
      questionId: question.id,
      answer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: selectedAnswer === question.correctAnswer,
    };

    const updatedAnswers = [
      ...answers.filter((item) => item.questionId !== question.id),
      newAnswer,
    ];

    setAnswers(updatedAnswers);

    // =======================================================
    // ÚLTIMA PREGUNTA
    // =======================================================

    if (currentQuestion >= questions.length - 1) {
      const finalFinishedAt = getCurrentTimestamp();

      setFinishedAt(finalFinishedAt);

      setIsQuizStarted(false);

      setIsQuizFinished(true);

      // -----------------------------------------------------
      // Calcular resultado usando las respuestas actualizadas
      // -----------------------------------------------------

      const correct = updatedAnswers.filter(
        (answer) => answer.isCorrect,
      ).length;

      const incorrect = updatedAnswers.filter(
        (answer) => !answer.isCorrect,
      ).length;

      const unanswered = Math.max(0, questions.length - updatedAnswers.length);

      const percentage =
        questions.length > 0
          ? Math.round((correct / questions.length) * 100)
          : 0;

      // -----------------------------------------------------
      // Guardar práctica completada
      // -----------------------------------------------------

      saveCompletedPracticeWithResult({
        correct,
        incorrect,
        unanswered,
        percentage,
        finalFinishedAt,
      });

      return;
    }

    // =======================================================
    // SIGUIENTE PREGUNTA
    // =======================================================

    setCurrentQuestion((previous) => previous + 1);

    setSelectedAnswer(null);
  };

  // =========================================================
  // GUARDAR RESULTADO FINAL
  // =========================================================
  //
  // Esta función existe porque cuando hacemos:
  //
  // setAnswers(updatedAnswers)
  //
  // React todavía puede no haber actualizado "answers".
  //
  // Por eso guardamos directamente usando los valores finales.
  // =========================================================

  const saveCompletedPracticeWithResult = ({
    correct,
    incorrect,
    unanswered,
    percentage,
    finalFinishedAt,
  }) => {
    if (!currentUser?.id || !selectedCourse || !selectedTopic) {
      return;
    }

    const practiceData = {
      studentId: currentUser.id,

      courseId: selectedCourse.id,

      courseCode: selectedCourse.codigo,

      topicId: selectedTopic.id,

      topicName: selectedTopic.nombre,

      completed: true,

      correct,

      incorrect,

      unanswered,

      percentage,

      startedAt: startedAt ? new Date(startedAt).toISOString() : null,

      completedAt: new Date(finalFinishedAt).toISOString(),
    };

    try {
      const storedProgress = localStorage.getItem(progressStorageKey);

      let allProgress = [];

      if (storedProgress) {
        const parsedProgress = JSON.parse(storedProgress);

        if (Array.isArray(parsedProgress)) {
          allProgress = parsedProgress;
        }
      }

      // -----------------------------------------------------
      // Eliminar resultado anterior del mismo tema
      // -----------------------------------------------------

      const filteredProgress = allProgress.filter(
        (item) =>
          !(
            item.studentId === currentUser.id &&
            item.courseId === selectedCourse.id &&
            item.topicId === selectedTopic.id
          ),
      );

      const newProgress = [...filteredProgress, practiceData];

      localStorage.setItem(progressStorageKey, JSON.stringify(newProgress));

      setCompletedPractices((previous) => {
        const filtered = previous.filter(
          (item) =>
            !(
              item.courseId === selectedCourse.id &&
              item.topicId === selectedTopic.id
            ),
        );

        return [...filtered, practiceData];
      });
    } catch (error) {
      console.error("Error guardando práctica:", error);
    }
  };

  // =========================================================
  // REINICIAR
  // =========================================================

  const resetQuiz = () => {
    setIsQuizStarted(false);

    setIsQuizFinished(false);

    setCurrentQuestion(0);

    setSelectedAnswer(null);

    setAnswers([]);

    setTimeLeft(120);

    setStartedAt(null);

    setFinishedAt(null);
  };

  // =========================================================
  // VOLVER A CURSOS
  // =========================================================

  const handleBackToCourses = () => {
    setSelectedCourseId(null);

    setSelectedTopicId(null);

    resetQuiz();
  };

  // =========================================================
  // SIN ALUMNO
  // =========================================================

  if (!currentUser) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <GraduationCap className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-800">
            No se encontró el alumno
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            No se pudo identificar al estudiante actual. Verifica que el usuario
            esté guardado en la sesión.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // SIN CURSOS COMPATIBLES
  // =========================================================

  if (!assignedCourses.length) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
            <BookOpen className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-800">
            No tienes cursos disponibles
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            No encontramos cursos asignados que correspondan a tu nivel y grado:
          </p>

          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600">
            <span>{currentUser.nivel}</span>
            <span className="text-slate-300">·</span>
            <span>{currentUser.grado}</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // VISTA DEL QUIZ
  // =========================================================

  if (isQuizStarted && questions.length > 0) {
    const question = questions[currentQuestion];

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="space-y-5 pb-10">
        <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 shadow-xl shadow-slate-200 sm:p-8">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
                  <Zap className="h-3.5 w-3.5" />
                  PRÁCTICA EN CURSO
                </div>

                <h1 className="mt-4 text-2xl font-bold text-white">
                  {selectedTopic?.nombre}
                </h1>

                <p className="mt-1 text-xs text-slate-400">
                  {selectedCourse?.nombre} · {selectedCourse?.grado}
                </p>
              </div>

              <div
                className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
                  timeLeft <= 30
                    ? "bg-red-500/20 text-red-300"
                    : "bg-white/10 text-white"
                }`}
              >
                <Clock3 className="h-5 w-5" />

                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-600">
              Pregunta {currentQuestion + 1} de {questions.length}
            </p>

            <span className="text-[10px] font-bold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Target className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Pregunta {currentQuestion + 1}
              </p>

              <h2 className="mt-2 text-lg font-bold leading-7 text-slate-900 sm:text-xl">
                {question.question}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectAnswer(option)}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="text-sm font-semibold">{option}</span>

                  {isSelected && (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {currentQuestion === questions.length - 1
                ? "Finalizar práctica"
                : "Siguiente pregunta"}

              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  // =========================================================
  // RESULTADO
  // =========================================================

  if (isQuizFinished) {
    const passed = result.percentage >= 70;

    const suggestion =
      result.percentage === 100
        ? "¡Excelente! Dominas muy bien este tema. Puedes continuar con el siguiente contenido."
        : result.percentage >= 70
          ? "Buen trabajo. Repasa las preguntas que fallaste para reforzar tus conocimientos."
          : "Te recomendamos revisar nuevamente el contenido del tema y volver a intentar la práctica.";

    return (
      <div className="space-y-5 pb-10">
        <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-7 text-center shadow-xl shadow-slate-200 sm:p-10">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                passed
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-orange-500/20 text-orange-300"
              }`}
            >
              {passed ? (
                <Trophy className="h-8 w-8" />
              ) : (
                <Target className="h-8 w-8" />
              )}
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-300">
              Práctica completada
            </p>

            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {passed ? "¡Muy buen trabajo!" : "Sigue practicando"}
            </h1>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400">
              {selectedTopic?.nombre} · {selectedCourse?.nombre}
            </p>

            {/* INDICADOR DE COMPLETADO */}
            <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Práctica registrada como completada
            </div>

            <div className="mx-auto mt-7 flex h-28 w-28 items-center justify-center rounded-full border-8 border-blue-500/20 bg-white/5">
              <div>
                <p className="text-3xl font-bold text-white">
                  {result.percentage}%
                </p>

                <p className="text-[9px] font-semibold uppercase text-slate-400">
                  Resultado
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 className="h-5 w-5" />
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase text-slate-400">
              Tiempo
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {formatTime(elapsedTime || 120 - timeLeft)}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">Tiempo utilizado</p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase text-emerald-600">
              Correctas
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {result.correct}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Respuestas acertadas
            </p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
              <XCircle className="h-5 w-5" />
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase text-red-500">
              Incorrectas
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {result.incorrect}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Respuestas por reforzar
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Lightbulb className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Retroalimentación
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {suggestion}
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleBackToCourses}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver cursos
          </button>

          <button
            type="button"
            onClick={handleStartQuiz}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            <RotateCcw className="h-4 w-4" />
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // SELECCIÓN DE CURSO
  // =========================================================

  if (!selectedCourse) {
    return (
      <div className="space-y-6 pb-10">
        <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 shadow-xl shadow-slate-200 sm:p-8">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              PRÁCTICA ACADÉMICA
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Pon a prueba tus conocimientos
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Selecciona uno de tus cursos y practica los temas que has
              aprendido.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-slate-300">
              <GraduationCap className="h-4 w-4 text-blue-300" />
              {currentUser.nivel} · {currentUser.grado}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Mis cursos</h2>

              <p className="mt-1 text-xs text-slate-400">
                Cursos correspondientes a tu nivel y grado
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-600">
              {assignedCourses.length} cursos
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {assignedCourses.map((course) => {
              const completedTopics =
                course.temas?.filter((topic) =>
                  isTopicCompleted(course.id, topic.id),
                ).length || 0;

              const totalTopics = course.temas?.length || 0;

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleSelectCourse(course)}
                  className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 transition group-hover:bg-blue-100" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
                    </div>

                    <p className="mt-5 text-lg font-bold text-slate-900">
                      {course.nombre}
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      {course.codigo}
                    </p>

                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                      {course.descripcion}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                        {course.nivel}
                      </span>

                      <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                        {course.grado} grado
                      </span>

                      <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-600">
                        {totalTopics} temas
                      </span>
                    </div>

                    {/* PROGRESO DEL CURSO */}

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400">
                          Progreso
                        </span>

                        <span className="text-[10px] font-bold text-blue-600">
                          {completedTopics}/{totalTopics}
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{
                            width:
                              totalTopics > 0
                                ? `${(completedTopics / totalTopics) * 100}%`
                                : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-bold text-blue-800">¿Cómo funciona?</p>

              <p className="mt-1 text-xs leading-5 text-blue-700/70">
                Elige un curso, selecciona un tema y responde las preguntas. Al
                finalizar, el tema quedará registrado como completado.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // =========================================================
  // SELECCIÓN DE TEMA
  // =========================================================

  return (
    <div className="space-y-5 pb-10">
      {/* ======================================================
            BOTÓN VOLVER
        ====================================================== */}

      <div>
        <button
          type="button"
          onClick={() => navigate("/app/estudiante/cursos")}
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Volver a mis cursos
        </button>
      </div>

      <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-6 shadow-xl sm:p-8 lg:p-9">
        {/* DECORACIÓN */}

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            {/* ==================================================
          INFORMACIÓN DEL CURSO
      ================================================== */}

            <div>
              {/* Curso */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-blue-200">
                <BookOpen className="h-3.5 w-3.5" />
                {selectedCourse.nombre}
              </div>

              {/* Título */}
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Elige un tema para practicar
              </h1>

              {/* Información */}
              <p className="mt-2 text-sm text-slate-400">
                {selectedCourse.nivel} · {selectedCourse.grado} grado
              </p>

              {/* Descripción */}
              {selectedCourse.descripcion && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                  {selectedCourse.descripcion}
                </p>
              )}
            </div>

            {/* ==================================================
          ICONO / ILUSTRACIÓN
      ================================================== */}

            <div className="hidden lg:flex lg:justify-end">
              <div className="flex h-32 w-32 items-center justify-center rounded-[28px] border border-white/10 bg-white/10">
                <Award className="h-14 w-14 text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="px-1">
            <h2 className="text-sm font-bold text-slate-900">
              Temas del curso
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Selecciona un tema
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {selectedCourse.temas?.map((topic, index) => {
              const isSelected = selectedTopic?.id === topic.id;

              const completed = isTopicCompleted(selectedCourse.id, topic.id);

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                    isSelected ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                      completed
                        ? "bg-emerald-500 text-white"
                        : isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-xs font-bold ${
                        completed
                          ? "text-emerald-700"
                          : isSelected
                            ? "text-blue-700"
                            : "text-slate-700"
                      }`}
                    >
                      {topic.nombre}
                    </p>

                    <p
                      className={`mt-0.5 text-[10px] ${
                        completed ? "text-emerald-500" : "text-slate-400"
                      }`}
                    >
                      {completed ? "Completado" : "2 preguntas · 2 min"}
                    </p>
                  </div>

                  {completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ChevronRight
                      className={`h-4 w-4 ${
                        isSelected ? "text-blue-500" : "text-slate-300"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {selectedTopic ? (
            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <span
                    className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-bold ${
                      isTopicCompleted(selectedCourse.id, selectedTopic.id)
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {isTopicCompleted(selectedCourse.id, selectedTopic.id) ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        COMPLETADO
                      </>
                    ) : (
                      <>
                        <Target className="h-3 w-3" />
                        PRÁCTICA
                      </>
                    )}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold text-slate-900">
                    {selectedTopic.nombre}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {selectedTopic.descripcion}
                  </p>
                </div>

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                    isTopicCompleted(selectedCourse.id, selectedTopic.id)
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-violet-50 text-violet-600"
                  }`}
                >
                  {isTopicCompleted(selectedCourse.id, selectedTopic.id) ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <Sparkles className="h-6 w-6" />
                  )}
                </div>
              </div>

              <div className="my-7 border-t border-slate-100" />

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <BookOpen className="h-5 w-5 text-blue-500" />

                  <p className="mt-3 text-[10px] font-semibold text-slate-400">
                    PREGUNTAS
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {questions.length}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Clock3 className="h-5 w-5 text-violet-500" />

                  <p className="mt-3 text-[10px] font-semibold text-slate-400">
                    TIEMPO
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-800">2 min</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <BarChart3 className="h-5 w-5 text-emerald-500" />

                  <p className="mt-3 text-[10px] font-semibold text-slate-400">
                    OBJETIVO
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-800">70%</p>
                </div>
              </div>

              {/* RESULTADO ANTERIOR */}

              {isTopicCompleted(selectedCourse.id, selectedTopic.id) && (
                <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-xs font-bold text-emerald-800">
                        Tema completado
                      </p>

                      <p className="mt-1 text-xs leading-5 text-emerald-700/70">
                        Ya realizaste la práctica de este tema. Puedes volver a
                        practicar si deseas mejorar tu resultado.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTopic.ejemplo && (
                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                    <div>
                      <p className="text-xs font-bold text-blue-800">
                        Antes de comenzar
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700/70">
                        Puedes revisar el ejemplo práctico de este tema antes de
                        iniciar tu evaluación.
                      </p>

                      <div className="mt-3 rounded-xl bg-white/70 p-3">
                        <p className="text-xs font-bold text-slate-700">
                          {selectedTopic.ejemplo.titulo}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {selectedTopic.ejemplo.problema}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 rounded-2xl bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-white">
                    {isTopicCompleted(selectedCourse.id, selectedTopic.id)
                      ? "¿Quieres practicar nuevamente?"
                      : "¿Listo para comenzar?"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {isTopicCompleted(selectedCourse.id, selectedTopic.id)
                      ? "Tu nuevo resultado reemplazará el anterior."
                      : "Tendrás 2 minutos para responder las preguntas."}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!questions.length}
                  onClick={handleStartQuiz}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
                >
                  {isTopicCompleted(selectedCourse.id, selectedTopic.id) ? (
                    <RotateCcw className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}

                  {isTopicCompleted(selectedCourse.id, selectedTopic.id)
                    ? "Practicar nuevamente"
                    : "Comenzar práctica"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center p-6 text-center">
              <div>
                <Target className="mx-auto h-8 w-8 text-slate-300" />

                <p className="mt-3 text-sm font-semibold text-slate-600">
                  Selecciona un tema
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Selecciona un tema para comenzar una práctica.
                </p>
              </div>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default StudentPractice;
