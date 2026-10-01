<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Grade;
use App\Models\GradeCourse;
use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grade = Grade::where('nombre', '4to')
            ->where('nivel_educativo_id', 2)
            ->firstOrFail();

        $temasPorCurso = [
            'MAT' => [
                [
                    'nombre' => 'Números enteros',
                    'descripcion' => 'Aprende a representar, comparar y operar con números enteros positivos y negativos en diferentes situaciones matemáticas.',
                    'archivo_nombre' => 'Practica_Numeros_Enteros.pdf',
                    'archivo_url' => '/pdf/matematica/practica-numeros-enteros.pdf',
                ],
                [
                    'nombre' => 'Fracciones',
                    'descripcion' => 'Comprende cómo representar, comparar y realizar operaciones con fracciones en problemas matemáticos.',
                    'archivo_nombre' => 'Practica_Fracciones.pdf',
                    'archivo_url' => '/pdf/matematica/practica-fracciones.pdf',
                ],
                [
                    'nombre' => 'Ecuaciones',
                    'descripcion' => 'Aprende a resolver ecuaciones de primer grado utilizando operaciones equivalentes para encontrar el valor desconocido.',
                    'archivo_nombre' => 'Practica_Ecuaciones.pdf',
                    'archivo_url' => '/pdf/matematica/practica-ecuaciones.pdf',
                ],
                [
                    'nombre' => 'Geometría',
                    'descripcion' => 'Explora las principales figuras geométricas, sus propiedades, perímetros, áreas y aplicaciones en situaciones cotidianas.',
                    'archivo_nombre' => 'Practica_Geometria.pdf',
                    'archivo_url' => '/pdf/matematica/practica-geometria.pdf',
                ],
            ],

            'COMP' => [
                [
                    'nombre' => 'Fundamentos de computación',
                    'descripcion' => 'Conoce los conceptos fundamentales de la computación y sus principales componentes.',
                    'archivo_nombre' => 'Practica_Fundamentos_Computacion.pdf',
                    'archivo_url' => '/pdf/computacion/practica-fundamentos.pdf',
                ],
                [
                    'nombre' => 'Hardware',
                    'descripcion' => 'Identifica los principales componentes físicos de una computadora.',
                    'archivo_nombre' => 'Practica_Hardware.pdf',
                    'archivo_url' => '/pdf/computacion/practica-hardware.pdf',
                ],
                [
                    'nombre' => 'Software',
                    'descripcion' => 'Comprende qué es el software y conoce sus principales tipos.',
                    'archivo_nombre' => 'Practica_Software.pdf',
                    'archivo_url' => '/pdf/computacion/practica-software.pdf',
                ],
                [
                    'nombre' => 'Internet',
                    'descripcion' => 'Aprende los conceptos básicos relacionados con Internet y su uso responsable.',
                    'archivo_nombre' => 'Practica_Internet.pdf',
                    'archivo_url' => '/pdf/computacion/practica-internet.pdf',
                ],
            ],

            'COM' => [
                [
                    'nombre' => 'Comprensión lectora',
                    'descripcion' => 'Desarrolla estrategias para comprender diferentes tipos de textos.',
                    'archivo_nombre' => 'Practica_Comprension.pdf',
                    'archivo_url' => '/pdf/comunicacion/practica-comprension.pdf',
                ],
                [
                    'nombre' => 'Tipos de texto',
                    'descripcion' => 'Reconoce las características de los principales tipos de textos.',
                    'archivo_nombre' => 'Practica_Tipos_Texto.pdf',
                    'archivo_url' => '/pdf/comunicacion/practica-tipos-texto.pdf',
                ],
                [
                    'nombre' => 'Producción de textos',
                    'descripcion' => 'Desarrolla habilidades para planificar y producir textos correctamente.',
                    'archivo_nombre' => 'Practica_Produccion_Textos.pdf',
                    'archivo_url' => '/pdf/comunicacion/practica-produccion-textos.pdf',
                ],
                [
                    'nombre' => 'Comunicación oral',
                    'descripcion' => 'Fortalece las habilidades de expresión y comunicación oral.',
                    'archivo_nombre' => 'Practica_Comunicacion_Oral.pdf',
                    'archivo_url' => '/pdf/comunicacion/practica-comunicacion-oral.pdf',
                ],
            ],

            'CYT' => [
                [
                    'nombre' => 'Materia y energía',
                    'descripcion' => 'Comprende las propiedades fundamentales de la materia y la energía.',
                    'archivo_nombre' => 'Practica_Materia_Energia.pdf',
                    'archivo_url' => '/pdf/cyt/practica-materia-energia.pdf',
                ],
                [
                    'nombre' => 'Los seres vivos',
                    'descripcion' => 'Explora las características y organización de los seres vivos.',
                    'archivo_nombre' => 'Practica_Seres_Vivos.pdf',
                    'archivo_url' => '/pdf/cyt/practica-seres-vivos.pdf',
                ],
                [
                    'nombre' => 'Ecosistemas',
                    'descripcion' => 'Comprende las relaciones entre los seres vivos y su entorno.',
                    'archivo_nombre' => 'Practica_Ecosistemas.pdf',
                    'archivo_url' => '/pdf/cyt/practica-ecosistemas.pdf',
                ],
                [
                    'nombre' => 'Tecnología',
                    'descripcion' => 'Analiza el papel de la tecnología en la sociedad y en la solución de problemas.',
                    'archivo_nombre' => 'Practica_Tecnologia.pdf',
                    'archivo_url' => '/pdf/cyt/practica-tecnologia.pdf',
                ],
            ],

            'ING' => [
                [
                    'nombre' => 'Greetings and introductions',
                    'descripcion' => 'Aprende a saludar y presentarte utilizando expresiones básicas en inglés.',
                    'archivo_nombre' => 'Practice_Greetings.pdf',
                    'archivo_url' => '/pdf/ingles/practice-greetings.pdf',
                ],
                [
                    'nombre' => 'Daily routines',
                    'descripcion' => 'Aprende vocabulario y expresiones para hablar sobre actividades cotidianas.',
                    'archivo_nombre' => 'Practice_Daily_Routines.pdf',
                    'archivo_url' => '/pdf/ingles/practice-daily-routines.pdf',
                ],
                [
                    'nombre' => 'Present simple',
                    'descripcion' => 'Comprende y utiliza el presente simple para expresar hábitos y rutinas.',
                    'archivo_nombre' => 'Practice_Present_Simple.pdf',
                    'archivo_url' => '/pdf/ingles/practice-present-simple.pdf',
                ],
                [
                    'nombre' => 'Describing people',
                    'descripcion' => 'Aprende vocabulario y estructuras para describir personas.',
                    'archivo_nombre' => 'Practice_Describing_People.pdf',
                    'archivo_url' => '/pdf/ingles/practice-describing-people.pdf',
                ],
            ],
        ];

        foreach ($temasPorCurso as $codigoCurso => $temas) {

            $course = Course::where(
                'codigo',
                $codigoCurso
            )->firstOrFail();

            $gradeCourse = GradeCourse::where('grade_id', $grade->id)
                ->where('course_id', $course->id)
                ->firstOrFail();

            foreach ($temas as $tema) {

                Theme::create([
                    'grade_course_id' => $gradeCourse->id,
                    'nombre' => $tema['nombre'],
                    'descripcion' => $tema['descripcion'],
                    'archivo_nombre' => $tema['archivo_nombre'],
                    'archivo_url' => $tema['archivo_url'],
                ]);
            }
        }
    }
}
