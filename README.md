# TutorIA Escolar

Plataforma web de tutoría escolar asistida por inteligencia artificial: ejercicios
adaptativos, pistas inteligentes y progreso visible para cada estudiante.

**Curso Integrador II: Software** — Universidad Tecnológica del Perú

---

## Tabla de contenido

- [TutorIA Escolar](#tutoria-escolar)
  - [Tabla de contenido](#tabla-de-contenido)
  - [El problema](#el-problema)
  - [La solución](#la-solución)
  - [Roles de usuario](#roles-de-usuario)
  - [Prototipo](#prototipo)
  - [Product Backlog](#product-backlog)
    - [ÉPICA-01: Autenticación de Usuarios](#épica-01-autenticación-de-usuarios)
    - [ÉPICA-02: Gestión Académica](#épica-02-gestión-académica)
    - [ÉPICA-03: Gestión de Contenido](#épica-03-gestión-de-contenido)
    - [ÉPICA-04: Práctica y Evaluación](#épica-04-práctica-y-evaluación)
    - [ÉPICA-05: Progreso Académico](#épica-05-progreso-académico)
    - [ÉPICA-06: Tutor IA](#épica-06-tutor-ia)
    - [ÉPICA-07: Paneles y Accesos](#épica-07-paneles-y-accesos)
    - [ÉPICA-08: Gestión de Usuarios](#épica-08-gestión-de-usuarios)
  - [Arquitectura](#arquitectura)
  - [Stack tecnológico](#stack-tecnológico)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Estructura del repositorio](#estructura-del-repositorio)
  - [Flujo de trabajo con Git](#flujo-de-trabajo-con-git)
    - [Convención de ramas](#convención-de-ramas)
  - [Cómo levantar el proyecto](#cómo-levantar-el-proyecto)
    - [Requisitos](#requisitos)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
    - [Modelo de IA](#modelo-de-ia)
  - [Estado del proyecto](#estado-del-proyecto)
  - [Equipo](#equipo)

---

## El problema

En un aula, un docente atiende a decenas de estudiantes al mismo tiempo. Cuando un
estudiante se traba en un ejercicio, rara vez recibe ayuda en ese momento: espera al
siguiente turno, a la próxima clase o simplemente abandona el tema. El resultado es
que las brechas de aprendizaje se acumulan sin que nadie las detecte a tiempo.

Al docente le falta visibilidad: sin datos de dónde se traban sus estudiantes, no
puede reforzar los temas correctos.

## La solución

TutorIA acompaña al estudiante fuera del horario de clase con tres piezas:

1. **Tutor conversacional.** Un asistente que responde dudas y explica temas en el
   momento en que aparecen, sin que el estudiante tenga que esperar.
2. **Práctica con pistas.** Ejercicios donde el tutor entrega pistas graduales en
   lugar de la respuesta, para que el estudiante llegue solo al resultado.
3. **Progreso visible.** Avance por materia, racha de días, porcentaje de aciertos y
   logros, tanto para el estudiante como para el docente.

## Roles de usuario

| Rol | Qué puede hacer |
| --- | --- |
| **Estudiante** | Consultar sus cursos y contenidos, resolver ejercicios, pedir ayuda y pistas al Tutor IA, revisar resultados y su avance. |
| **Docente** | Consultar los cursos que tiene asignados y las métricas de desempeño de sus aulas. |
| **Administrador** | Gestionar usuarios y cursos, y consultar el panel administrativo de la plataforma. |

## Prototipo

Prototipo de interfaz construido en Figma:
[TutorIA Escolar — UI/UX Brief](https://www.figma.com/make/t1DSBAAx1dcnDfEv4YV5Y3/TutorIA-Escolar-UI-UX-Brief)

| Pantalla | Descripción |
| --- | --- |
| Inicio de sesión | Acceso diferenciado por rol (Estudiante, Docente, Admin) y opción de SSO con Google. |
| Panel del estudiante | Continuidad de la sesión anterior, nivel y XP, racha, aciertos y progreso por materia. |
| Tutor IA | Chat con el tutor "Búho", con modos Explicar, Practicar y Pistas. |
| Practicar | Ejercicios de opción múltiple con avance por serie e indicador de materia. |
| Mi perfil | Progreso detallado por materia y logros desbloqueados. |

![Inicio de sesión](docs/img/01-login.png)
![Panel del estudiante](docs/img/02-panel-estudiante.png)
![Tutor IA](docs/img/03-tutor-ia.png)
![Practicar](docs/img/04-practicar.png)
![Mi perfil](docs/img/05-mi-perfil.png)


## Product Backlog

19 historias de usuario agrupadas en 8 épicas. La priorización sigue el valor para el
estudiante: primero el acceso, el contenido y el tutor; después la gestión
administrativa.

### ÉPICA-01: Autenticación de Usuarios

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 1 | Autenticar usuario en la plataforma | Alta | 5 |
| 9 | Finalizar sesión de usuario | Media | 2 |

### ÉPICA-02: Gestión Académica

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 2 | Consultar cursos disponibles | Alta | 3 |
| 17 | Consultar catálogo de cursos | Baja | 3 |
| 18 | Registrar nuevo curso | Baja | 5 |
| 19 | Actualizar información de curso | Baja | 3 |

### ÉPICA-03: Gestión de Contenido

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 3 | Consultar contenidos del curso | Alta | 5 |

### ÉPICA-04: Práctica y Evaluación

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 4 | Resolver ejercicios prácticos del curso | Alta | 5 |
| 7 | Consultar resultados de ejercicios | Alta | 3 |

### ÉPICA-05: Progreso Académico

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 8 | Consultar avance de aprendizaje | Alta | 3 |

### ÉPICA-06: Tutor IA

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 5 | Realizar consultas al Tutor IA | Alta | 8 |
| 6 | Solicitar pistas al Tutor IA durante los ejercicios | Alta | 8 |

### ÉPICA-07: Paneles y Accesos

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 10 | Consultar información del panel principal | Media | 3 |
| 14 | Consultar cursos asignados | Baja | 3 |
| 15 | Consultar métricas de sus aulas | Baja | 5 |
| 16 | Consultar información del panel administrativo | Baja | 3 |

### ÉPICA-08: Gestión de Usuarios

| ID | Historia de usuario | Prioridad | Puntos |
| --- | --- | --- | --- |
| 11 | Consultar listado de usuarios | Baja | 3 |
| 12 | Registrar nuevo usuario | Baja | 3 |
| 13 | Actualizar información de usuario | Baja | 3 |

**Resumen de la priorización**

| Prioridad | Historias | Puntos |
| --- | --- | --- |
| Alta | 8 | 40 |
| Media | 2 | 5 |
| Baja | 9 | 31 |
| **Total** | **19** | **76** |

## Arquitectura

![Arquitectura de TutorIA](docs/img/arquitectura.png)

La solución se separa en tres capas:

**Capa cliente.** Aplicación de una sola página (SPA) construida con React y servida
por Vite. Consume la API mediante peticiones HTTP con respuestas en JSON. El
enrutamiento distingue rutas públicas (inicio de sesión) de rutas privadas, y la
interfaz se adapta según el rol del usuario.

**Capa servidor.** API REST en Laravel que concentra la lógica de negocio. Laravel
Sanctum resuelve la autenticación mediante tokens, y Scramble genera la documentación
OpenAPI a partir de las propias rutas, de modo que la documentación no se desactualiza
respecto del código.

**Capa de datos e inteligencia.** MySQL persiste usuarios, cursos, contenidos,
ejercicios y progreso, con acceso mediante el ORM Eloquent. Las consultas al Tutor IA
se envían a Ollama, que ejecuta el modelo llama3.2 de forma local; la integración se
hace con el paquete `cloudstudio/ollama-laravel`.

Ejecutar el modelo en local, y no contra un servicio externo de pago, mantiene el
costo operativo en cero y evita que los datos de los estudiantes salgan de la
infraestructura propia.

## Stack tecnológico

### Frontend

| Tecnología | Versión | Por qué |
| --- | --- | --- |
| React | 19 | Componentes reutilizables y ecosistema amplio; el equipo ya lo conoce. |
| Vite | 8 | Arranque y recarga en caliente muy rápidos durante el desarrollo. |
| Tailwind CSS | 4 | Estilos consistentes sin mantener hojas de estilo separadas. |
| React Router | 7 | Separación de rutas públicas y privadas. |
| Axios | 1.19 | Cliente HTTP con interceptores para adjuntar el token de sesión. |
| Lucide React | 1.33 | Íconos ligeros y coherentes con el prototipo. |

### Backend

| Tecnología | Versión | Por qué |
| --- | --- | --- |
| Laravel | 13 | Framework maduro con ORM, migraciones y autenticación integrados. |
| PHP | 8.3 | Requisito del framework. |
| Laravel Sanctum | 4 | Autenticación por tokens pensada para SPA, sin montar OAuth completo. |
| MySQL | — | Modelo relacional adecuado para usuarios, cursos y progreso. |
| Scramble | 0.13 | Documentación OpenAPI generada automáticamente desde las rutas. |
| Ollama (llama3.2) | — | Modelo ejecutado en local: sin costo por consulta y sin enviar datos afuera. |
| Pest | 5 | Pruebas con sintaxis legible. |
| Laravel Pint | 1.27 | Formato de código uniforme en todo el equipo. |

## Estructura del repositorio

```
TutorIA/
├── Backend-TutorIA/          API REST en Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   └── tests/
├── FrontEnd-TutorIA/         SPA en React
│   ├── src/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── assets/
│   └── public/
└── docs/                     Documentación y recursos de la expo
    └── img/
```

## Flujo de trabajo con Git

El equipo trabaja con **GitHub Flow**: una rama `main` siempre estable y ramas cortas
por cada cambio.

```
main ──────●────────────●─────────────●──────▶
            \          /  \          /
             ●────────●    ●────────●
          feature/login   feature/tutor-ia
```

1. **Issue.** Cada historia de usuario del backlog se registra como issue.
2. **Rama.** Se crea una rama desde `main` con nombre descriptivo:
   `feature/hu-05-consultas-tutor-ia`, `fix/validacion-login`.
3. **Commits.** Mensajes en imperativo y en español, describiendo el cambio:
   `Agregar endpoint de consulta al tutor`.
4. **Pull Request.** Al terminar, se abre un PR hacia `main` describiendo qué
   resuelve y a qué issue corresponde.
5. **Revisión.** Otro integrante revisa el PR. No se aprueba el propio trabajo.
6. **Merge.** Aprobado el PR, se integra a `main` y se cierra el issue.

`main` está protegida: no se hace push directo, todo entra por Pull Request.

### Convención de ramas

| Prefijo | Uso |
| --- | --- |
| `feature/` | Nueva funcionalidad del backlog. |
| `fix/` | Corrección de un error. |
| `docs/` | Cambios de documentación. |
| `refactor/` | Reorganización de código sin cambiar comportamiento. |

## Cómo levantar el proyecto

### Requisitos

- PHP 8.3 o superior, con Composer
- Node.js 20 o superior, con npm
- MySQL
- [Ollama](https://ollama.com) instalado, con el modelo `llama3.2` descargado

### Backend

```bash
cd Backend-TutorIA
composer install
cp .env.example .env
php artisan key:generate
```

Configura la conexión a la base de datos en `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=backend_tutoria
DB_USERNAME=root
DB_PASSWORD=
```

Luego ejecuta las migraciones y levanta el servidor:

```bash
php artisan migrate
php artisan serve
```

La API queda disponible en `http://localhost:8000`.

### Frontend

```bash
cd FrontEnd-TutorIA
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

### Modelo de IA

```bash
ollama pull llama3.2
ollama serve
```

## Estado del proyecto

El proyecto se encuentra en la **Unidad 1** del curso: análisis, diseño y montaje del
entorno.

| Entregable | Estado |
| --- | --- |
| Análisis del problema y requerimientos | Completado |
| Product Backlog con historias de usuario | Completado |
| Prototipo de interfaz en Figma | Completado |
| Selección tecnológica y arquitectura | Completado |
| Estructura de repositorio y GitHub Flow | Completado |
| Estructura base del Backend (Laravel) | En curso |
| Estructura base del Frontend (React) | En curso |
| Endpoints de la API | Pendiente |
| Integración con Ollama | Pendiente |
| Interfaces del prototipo llevadas a código | Pendiente |

## Equipo

| Integrante | Rol |
| --- | --- |
| Jesús Rivera | Desarrollo |
| Alonso Quispe | Desarrollo |
| Renato Ninatanta | Desarrollo |
| Ben Alanya | Desarrollo |

---

Proyecto académico desarrollado para el curso Curso Integrador II: Software de la
Universidad Tecnológica del Perú.
