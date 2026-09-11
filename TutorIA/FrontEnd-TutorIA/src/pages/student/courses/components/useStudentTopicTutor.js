import { useState } from "react";

const useStudentTopicTutor = (topic) => {
  const [showTutor, setShowTutor] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const cleanMessage = message.trim();

    if (!cleanMessage || !topic) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: cleanMessage,
      },
      {
        role: "assistant",
        text: `Claro. Te ayudaré con "${topic.nombre}". Esta respuesta es una demostración; posteriormente puedes conectar este chat con tu modelo de IA.`,
      },
    ]);

    setMessage("");
  };

  return {
    showTutor,
    setShowTutor,

    message,
    setMessage,

    messages,
    sendMessage,
  };
};

export default useStudentTopicTutor;
