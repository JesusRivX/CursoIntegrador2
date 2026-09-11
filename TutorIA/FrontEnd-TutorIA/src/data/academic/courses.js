export const courses = [
    {
        id: 1,
        nombre: "Matemática",
        codigo: "MAT-SEC-02",
        nivel: "Secundaria",
        grado: "4to",
        descripcion:
            "Desarrollo del razonamiento matemático y resolución de problemas.",
        estado: "Activo",

        temas: [
            {
                id: 1,
                nombre: "Números enteros",
                descripcion:
                    "Aprende a representar, comparar y operar con números enteros positivos y negativos en diferentes situaciones matemáticas.",

                ejemplo: {
                    titulo: "Suma de números enteros",
                    problema: "Calcula: -8 + 13",
                    solucion:
                        "Primero identificamos los signos. Como los números tienen signos diferentes, restamos sus valores absolutos: 13 - 8 = 5. Tomamos el signo del número con mayor valor absoluto, que es positivo.",
                    respuesta: "5",
                },

                archivo: {
                    nombre: "Practica_Numeros_Enteros.pdf",
                    url: "/pdf/matematica/practica-numeros-enteros.pdf",
                },
            },

            {
                id: 2,
                nombre: "Fracciones",
                descripcion:
                    "Comprende cómo representar, comparar y realizar operaciones con fracciones en problemas matemáticos.",

                ejemplo: {
                    titulo: "Suma de fracciones",
                    problema: "Calcula: 1/2 + 1/4",
                    solucion:
                        "Buscamos un denominador común. El mínimo común múltiplo de 2 y 4 es 4. Convertimos 1/2 en 2/4 y luego sumamos: 2/4 + 1/4 = 3/4.",
                    respuesta: "3/4",
                },

                archivo: {
                    nombre: "Practica_Fracciones.pdf",
                    url: "/pdf/matematica/practica-fracciones.pdf",
                },
            },

            {
                id: 3,
                nombre: "Ecuaciones",
                descripcion:
                    "Aprende a resolver ecuaciones de primer grado utilizando operaciones equivalentes para encontrar el valor desconocido.",

                ejemplo: {
                    titulo: "Ecuación de primer grado",
                    problema: "Resuelve: 2x + 6 = 14",
                    solucion:
                        "Restamos 6 a ambos lados: 2x = 8. Luego dividimos ambos lados entre 2: x = 4.",
                    respuesta: "x = 4",
                },

                archivo: {
                    nombre: "Practica_Ecuaciones.pdf",
                    url: "/pdf/matematica/practica-ecuaciones.pdf",
                },
            },

            {
                id: 4,
                nombre: "Geometría",
                descripcion:
                    "Explora las principales figuras geométricas, sus propiedades, perímetros, áreas y aplicaciones en situaciones cotidianas.",

                ejemplo: {
                    titulo: "Área de un rectángulo",
                    problema:
                        "Calcula el área de un rectángulo que tiene 8 cm de largo y 5 cm de ancho.",
                    solucion:
                        "Utilizamos la fórmula del área del rectángulo: Área = largo × ancho. Entonces: 8 × 5 = 40.",
                    respuesta: "40 cm²",
                },

                archivo: {
                    nombre: "Practica_Geometria.pdf",
                    url: "/pdf/matematica/practica-geometria.pdf",
                },
            },
        ],
    },

    {
        id: 2,
        nombre: "Comunicación",
        codigo: "COM-SEC-02",
        nivel: "Primaria",
        grado: "2do",
        descripcion: "Comprensión lectora, expresión oral y producción de textos.",
        estado: "Activo",

        temas: [
            {
                id: 5,
                nombre: "Comprensión lectora",
                descripcion:
                    "Desarrolla estrategias para comprender textos, identificar información importante y reconocer las ideas principales.",

                ejemplo: {
                    titulo: "Identificar la idea principal",
                    problema:
                        "Lee un texto sobre los animales y determina cuál es su idea principal.",
                    solucion:
                        "La idea principal resume aquello de lo que trata principalmente el texto. Para encontrarla, identifica qué información se repite o qué concepto explica la mayor parte del contenido.",
                    respuesta:
                        "La idea principal es el mensaje central que el autor quiere comunicar.",
                },

                archivo: {
                    nombre: "Practica_Comprension_Lectora.pdf",
                    url: "/pdf/comunicacion/practica-comprension-lectora.pdf",
                },
            },

            {
                id: 6,
                nombre: "Tipos de texto",
                descripcion:
                    "Aprende a reconocer las características de diferentes tipos de textos y su intención comunicativa.",

                ejemplo: {
                    titulo: "Reconocer un texto narrativo",
                    problema:
                        "Un cuento presenta personajes, un lugar y una serie de acontecimientos. ¿Qué tipo de texto es?",
                    solucion:
                        "Los textos narrativos cuentan hechos reales o ficticios mediante personajes y acontecimientos.",
                    respuesta: "Texto narrativo",
                },

                archivo: {
                    nombre: "Practica_Tipos_de_Texto.pdf",
                    url: "/pdf/comunicacion/practica-tipos-de-texto.pdf",
                },
            },

            {
                id: 7,
                nombre: "Producción escrita",
                descripcion:
                    "Desarrolla habilidades para organizar ideas y producir textos claros, coherentes y adecuados a diferentes situaciones.",

                ejemplo: {
                    titulo: "Construcción de un párrafo",
                    problema:
                        "Escribe un párrafo breve sobre la importancia de cuidar el medio ambiente.",
                    solucion:
                        "Un buen párrafo debe presentar una idea principal y desarrollar esa idea mediante información relacionada.",
                    respuesta:
                        "Cuidar el medio ambiente es importante porque permite proteger los recursos naturales y garantizar un futuro saludable para las próximas generaciones.",
                },

                archivo: {
                    nombre: "Practica_Produccion_Escrita.pdf",
                    url: "/pdf/comunicacion/practica-produccion-escrita.pdf",
                },
            },
        ],
    },

    {
        id: 3,
        nombre: "Ciencia y Tecnología",
        codigo: "CYT-SEC-02",
        nivel: "Secundaria",
        // grado: "1ero",
        grado: "4to",
        descripcion:
            "Exploración de fenómenos naturales y desarrollo del pensamiento científico.",
        estado: "Activo",

        temas: [
            {
                id: 8,
                nombre: "La materia",
                descripcion:
                    "Comprende qué es la materia, cuáles son sus propiedades y cómo puede cambiar de un estado a otro.",

                ejemplo: {
                    titulo: "Estados de la materia",
                    problema:
                        "¿Qué ocurre con el agua cuando aumenta suficientemente su temperatura?",
                    solucion:
                        "Cuando el agua recibe suficiente energía térmica, sus moléculas se mueven más rápidamente y puede pasar del estado líquido al gaseoso.",
                    respuesta: "El agua se convierte en vapor.",
                },

                archivo: {
                    nombre: "Practica_La_Materia.pdf",
                    url: "/pdf/ciencia/practica-la-materia.pdf",
                },
            },

            {
                id: 9,
                nombre: "Energía",
                descripcion:
                    "Conoce los diferentes tipos de energía y comprende cómo se transforma y utiliza en nuestra vida cotidiana.",

                ejemplo: {
                    titulo: "Transformación de energía",
                    problema:
                        "¿Qué transformación de energía ocurre en una bombilla encendida?",
                    solucion:
                        "La energía eléctrica que recibe la bombilla se transforma principalmente en energía luminosa y también en energía térmica.",
                    respuesta: "Energía eléctrica → energía luminosa + energía térmica.",
                },

                archivo: {
                    nombre: "Practica_Energia.pdf",
                    url: "/pdf/ciencia/practica-energia.pdf",
                },
            },

            {
                id: 10,
                nombre: "Ecosistemas",
                descripcion:
                    "Comprende cómo interactúan los seres vivos entre sí y con los elementos no vivos que forman parte de un ecosistema.",

                ejemplo: {
                    titulo: "Relaciones dentro de un ecosistema",
                    problema:
                        "¿Qué relación existe entre las plantas y los animales dentro de un ecosistema?",
                    solucion:
                        "Las plantas producen materia orgánica mediante la fotosíntesis y sirven como alimento para muchos animales. A su vez, los animales participan en procesos como la polinización y dispersión de semillas.",
                    respuesta:
                        "Existe una relación de interdependencia entre los organismos.",
                },

                archivo: {
                    nombre: "Practica_Ecosistemas.pdf",
                    url: "/pdf/ciencia/practica-ecosistemas.pdf",
                },
            },
        ],
    },

    {
        id: 4,
        nombre: "Inglés",
        codigo: "ING-SEC-02",
        nivel: "Primaria",
        grado: "6to",
        descripcion:
            "Desarrollo de habilidades comunicativas básicas en el idioma inglés.",
        estado: "Activo",

        temas: [
            {
                id: 11,
                nombre: "Present Simple",
                descripcion:
                    "Aprende a utilizar el presente simple para hablar de hábitos, rutinas, hechos y situaciones habituales.",

                ejemplo: {
                    titulo: "Daily routine",
                    problema: "Completa la oración: She ___ to school every day.",
                    solucion:
                        "Con el sujeto 'She' debemos utilizar la tercera persona singular. Por eso, el verbo 'go' cambia a 'goes'.",
                    respuesta: "She goes to school every day.",
                },

                archivo: {
                    nombre: "Practice_Present_Simple.pdf",
                    url: "/pdf/ingles/practice-present-simple.pdf",
                },
            },

            {
                id: 12,
                nombre: "Past Simple",
                descripcion:
                    "Aprende a utilizar el pasado simple para expresar acciones que ocurrieron y terminaron en el pasado.",

                ejemplo: {
                    titulo: "Past Simple",
                    problema: "Completa la oración: I ___ football yesterday.",
                    solucion:
                        "La expresión 'yesterday' indica que la acción ocurrió en el pasado. El pasado de 'play' es 'played'.",
                    respuesta: "I played football yesterday.",
                },

                archivo: {
                    nombre: "Practice_Past_Simple.pdf",
                    url: "/pdf/ingles/practice-past-simple.pdf",
                },
            },

            {
                id: 13,
                nombre: "Vocabulary",
                descripcion:
                    "Amplía tu vocabulario en inglés mediante palabras y expresiones relacionadas con situaciones cotidianas.",

                ejemplo: {
                    titulo: "Vocabulary: School",
                    problema: "¿Cómo se dice 'libro' en inglés?",
                    solucion: "La palabra 'libro' se traduce como 'book'.",
                    respuesta: "Book",
                },

                archivo: {
                    nombre: "Practice_Vocabulary.pdf",
                    url: "/pdf/ingles/practice-vocabulary.pdf",
                },
            },
        ],
    },
];
