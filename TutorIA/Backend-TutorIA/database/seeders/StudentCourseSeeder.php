<?php

namespace Database\Seeders;

use App\Models\GradeCourse;
use App\Models\Student;
use App\Models\StudentCourse;
use Illuminate\Database\Seeder;

class StudentCourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jesus = Student::whereHas('user', function ($query) {
            $query->where('codigo', 'EST-2026-001');
        })->firstOrFail();

        $renato = Student::whereHas('user', function ($query) {
            $query->where('codigo', 'EST-2026-002');
        })->firstOrFail();

        $ben = Student::whereHas('user', function ($query) {
            $query->where('codigo', 'EST-2026-003');
        })->firstOrFail();

        // Jesus: todos los cursos de 4to Secundaria
        $this->asignarTodosLosCursos($jesus);

        // Renato: todos los cursos de 2do Secundaria
        $this->asignarTodosLosCursos($renato);

        // Ben: algunos cursos de 4to Secundaria
        $this->asignarCursos(
            $ben,
            [
                'Matemáticas',
                'Comunicación',
                'Inglés',
            ]
        );
    }

    private function asignarTodosLosCursos(Student $student): void
    {
        $gradeCourses = GradeCourse::where(
            'grade_id',
            $student->grado_id
        )->get();

        foreach ($gradeCourses as $gradeCourse) {
            StudentCourse::create([
                'student_id' => $student->id,
                'grade_course_id' => $gradeCourse->id,
            ]);
        }
    }

    private function asignarCursos(
        Student $student,
        array $nombresCursos
    ): void {
        foreach ($nombresCursos as $nombreCurso) {
            $gradeCourse = GradeCourse::where(
                'grade_id',
                $student->grado_id
            )
                ->whereHas('course', function ($query) use ($nombreCurso) {
                    $query->where('nombre', $nombreCurso);
                })
                ->firstOrFail();

            StudentCourse::create([
                'student_id' => $student->id,
                'grade_course_id' => $gradeCourse->id,
            ]);
        }
    }
}
