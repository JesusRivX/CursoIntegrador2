import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Lightbulb, MessageCircle, Sparkles } from "lucide-react";

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

const useStudentTutor = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, isTyping]);

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
  };

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return {
    message,
    setMessage,
    messages,
    isTyping,
    messagesEndRef,
    suggestions,
    handleSuggestion,
    sendMessage,
    handleKeyDown,
  };
};

export default useStudentTutor;
