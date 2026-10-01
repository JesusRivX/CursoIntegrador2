<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cursos = [
            [
                'codigo' => 'MAT',
                'nombre' => 'Matemáticas',
                'descripcion' => 'Desarrollo del razonamiento matemático y resolución de problemas.',
                'estado' => 'Activo',
            ],
            [
                'codigo' => 'COMP',
                'nombre' => 'Computación',
                'descripcion' => 'Desarrollo de competencias digitales y fundamentos de computación.',
                'estado' => 'Activo',
            ],
            [
                'codigo' => 'COM',
                'nombre' => 'Comunicación',
                'descripcion' => 'Desarrollo de habilidades de comprensión y producción de textos.',
                'estado' => 'Activo',
            ],
            [
                'codigo' => 'CYT',
                'nombre' => 'Ciencia y Tecnología',
                'descripcion' => 'Desarrollo del pensamiento científico y tecnológico.',
                'estado' => 'Activo',
            ],
            [
                'codigo' => 'ING',
                'nombre' => 'Inglés',
                'descripcion' => 'Desarrollo de competencias comunicativas en el idioma inglés.',
                'estado' => 'Activo',
            ],
        ];

        foreach ($cursos as $curso) {
            Course::create($curso);
        }
    }
}
