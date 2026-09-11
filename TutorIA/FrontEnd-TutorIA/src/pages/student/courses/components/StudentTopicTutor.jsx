import { Bot, Send, X } from "lucide-react";

import useStudentTopicTutor from "./useStudentTopicTutor";

const StudentTopicTutor = ({ topic }) => {
  const {
    showTutor,
    setShowTutor,
    message,
    setMessage,
    messages,
    sendMessage,
  } = useStudentTopicTutor(topic);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTutor && (
        <div className="absolute bottom-16 right-0 mb-3 flex h-130 w-87.5 max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
          <div className="bg-slate-950 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <Bot className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-black">Tutor IA</p>

                  <p className="text-[10px] text-slate-400">{topic?.nombre}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTutor(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f9fc] p-4">
            {messages.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Bot className="h-6 w-6" />
                </div>

                <p className="mt-4 text-sm font-black text-slate-800">
                  ¡Hola! 👋
                </p>

                <p className="mx-auto mt-2 max-w-62.5 text-xs leading-5 text-slate-400">
                  Estoy aquí para ayudarte a comprender este tema.
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    "Explícame este tema",
                    "Dame otro ejemplo",
                    "Hazme una pregunta",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setMessage(suggestion)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-[11px] font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    item.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-3 text-xs leading-5 ${
                      item.role === "user"
                        ? "rounded-br-md bg-blue-600 text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f7f9fc] p-1.5">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder={`Pregunta sobre ${topic?.nombre}...`}
                className="min-w-0 flex-1 bg-transparent px-2 text-xs text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={sendMessage}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowTutor((current) => !current)}
        className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl transition-all ${
          showTutor
            ? "bg-slate-950 text-white"
            : "bg-blue-600 text-white hover:-translate-y-1 hover:bg-blue-700"
        }`}
        title="Tutor IA"
      >
        {showTutor ? <X className="h-5 w-5" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default StudentTopicTutor;
