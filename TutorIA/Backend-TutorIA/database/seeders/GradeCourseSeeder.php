<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Grade;
use App\Models\GradeCourse;
use Illuminate\Database\Seeder;

class GradeCourseSeeder extends Seeder
{
    public function run(): void
    {
        // =========================
        // SECUNDARIA
        // =========================

        $this->asignarCursos('Secundaria', '1ro', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Inglés',
        ]);

        $this->asignarCursos('Secundaria', '2do', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Inglés',
        ]);

        $this->asignarCursos('Secundaria', '3ro', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Inglés',
            'Computación',
        ]);

        $this->asignarCursos('Secundaria', '4to', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Inglés',
            'Computación',
        ]);

        $this->asignarCursos('Secundaria', '5to', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Inglés',
            'Computación',
        ]);

        // =========================
        // PRIMARIA
        // =========================

        $this->asignarCursos('Primaria', '1ro', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
        ]);

        $this->asignarCursos('Primaria', '2do', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
        ]);

        $this->asignarCursos('Primaria', '3ro', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Computación',
        ]);

        $this->asignarCursos('Primaria', '4to', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Computación',
        ]);

        $this->asignarCursos('Primaria', '5to', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Computación',
        ]);

        $this->asignarCursos('Primaria', '6to', [
            'Matemáticas',
            'Comunicación',
            'Ciencia y Tecnología',
            'Computación',
        ]);
    }

    private function asignarCursos(
        string $nivel,
        string $nombreGrado,
        array $cursos
    ): void {
        $grade = Grade::where('nombre', $nombreGrado)
            ->whereHas('educationalLevel', function ($query) use ($nivel) {
                $query->where('nombre', $nivel);
            })
            ->firstOrFail();

        foreach ($cursos as $nombreCurso) {
            $course = Course::where('nombre', $nombreCurso)
                ->firstOrFail();

            GradeCourse::firstOrCreate([
                'grade_id' => $grade->id,
                'course_id' => $course->id,
            ]);
        }
    }
}
