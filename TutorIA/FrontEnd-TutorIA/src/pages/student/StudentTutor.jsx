import { useEffect, useRef, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Lightbulb,
  MessageCircle,
  Send,
  Sparkles,
  User,
} from "lucide-react";

const StudentTutor = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // ============================================================
  // SCROLL AUTOMÁTICO DEL CHAT
  // ============================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, isTyping]);

  // ============================================================
  // SUGERENCIAS
  // ============================================================

  const suggestions = [
    {
      icon: Lightbulb,
      title: "Explícame un tema",
      text: "Aprende un concepto paso a paso.",
      message: "Explícame un tema",
    },
    {
      icon: CheckCircle2,
      title: "Ayúdame con un ejercicio",
      text: "Resolvamos un ejercicio juntos.",
      message: "Ayúdame con un ejercicio",
    },
    {
      icon: Sparkles,
      title: "Quiero practicar",
      text: "Pon a prueba tus conocimientos.",
      message: "Quiero practicar",
    },
    {
      icon: MessageCircle,
      title: "Hazme una pregunta",
      text: "Comprueba cuánto sabes.",
      message: "Hazme una pregunta",
    },
  ];

  // ============================================================
  // USAR SUGERENCIA
  // ============================================================

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
  };

  // ============================================================
  // ENVIAR MENSAJE
  // ============================================================

  const sendMessage = () => {
    const cleanMessage = message.trim();

    if (!cleanMessage || isTyping) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: cleanMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setIsTyping(true);

    // ==========================================================
    // RESPUESTA TEMPORAL
    // Aquí posteriormente conectaremos tu backend / modelo IA.
    // ==========================================================

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: "Entendido. Soy tu Tutor IA. Aquí conectaremos posteriormente el modelo de inteligencia artificial para responder tus preguntas, explicar conceptos y ayudarte a resolver ejercicios.",
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] min-h-0 w-full flex-col overflow-hidden bg-[#f7f9fc]">
      {/* ======================================================
          CONTENEDOR PRINCIPAL
      ====================================================== */}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* ====================================================
            ÁREA DE CONVERSACIÓN
        ==================================================== */}

        <main className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto overscroll-contain">
            {messages.length === 0 ? (
              /* ==================================================
                 PANTALLA INICIAL
              ================================================== */

              <div className="flex min-h-full items-center justify-center px-5 py-8 sm:px-8">
                <div className="w-full max-w-5xl">
                  {/* ==================================================
                      PRESENTACIÓN
                  ================================================== */}

                  <div className="mx-auto max-w-2xl text-center">
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-slate-950 text-white shadow-xl shadow-blue-100">
                      <div className="absolute inset-0 rounded-[26px] bg-blue-600 opacity-20 blur-xl" />

                      <Bot className="relative z-10 h-9 w-9" />
                    </div>

                    <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                      ¿En qué puedo ayudarte?
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
                      Pregunta sobre tus cursos, conceptos, ejercicios o
                      cualquier tema que quieras comprender mejor.
                    </p>
                  </div>

                  {/* ==================================================
                      SUGERENCIAS
                  ================================================== */}

                  <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {suggestions.map((suggestion) => {
                      const Icon = suggestion.icon;

                      return (
                        <button
                          key={suggestion.title}
                          type="button"
                          onClick={() => handleSuggestion(suggestion.message)}
                          className="group rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                            <Icon className="h-4 w-4" />
                          </div>

                          <p className="mt-4 text-xs font-black text-slate-800">
                            {suggestion.title}
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-slate-400">
                            {suggestion.text}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* ==================================================
                      MENSAJE INFORMATIVO
                  ================================================== */}

                  <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-center">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>

                    <p className="text-[10px] font-semibold leading-5 text-blue-700">
                      Puedes preguntarme algo con tus propias palabras. No
                      necesitas saber cómo formular la pregunta.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* ==================================================
                 MENSAJES
              ================================================== */

              <div className="mx-auto w-full max-w-5xl space-y-6 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-3 ${
                      item.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* ==================================================
                        AVATAR IA
                    ================================================== */}

                    {item.role === "assistant" && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    {/* ==================================================
                        MENSAJE
                    ================================================== */}

                    <div
                      className={`max-w-[85%] rounded-[22px] px-4 py-3.5 text-xs leading-6 sm:max-w-[75%] sm:text-sm ${
                        item.role === "user"
                          ? "rounded-br-md bg-blue-600 text-white shadow-sm shadow-blue-100"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-600 shadow-sm"
                      }`}
                    >
                      {item.text}
                    </div>

                    {/* ==================================================
                        AVATAR USUARIO
                    ================================================== */}

                    {item.role === "user" && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* ==================================================
                    ESCRIBIENDO
                ================================================== */}

                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                      <Bot className="h-4 w-4" />
                    </div>

                    <div className="rounded-[22px] rounded-bl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.3s]" />

                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />

                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </main>

        {/* ====================================================
            INPUT
        ==================================================== */}

        <footer className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 sm:px-8 sm:py-4">
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex items-end gap-2 rounded-[22px] border border-slate-200 bg-[#f7f9fc] p-2 transition-all focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe tu pregunta..."
                rows={1}
                disabled={isTyping}
                className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={!message.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                title="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-center text-[9px] text-slate-400">
              Verifica la información importante con tus materiales de estudio.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default StudentTutor;
