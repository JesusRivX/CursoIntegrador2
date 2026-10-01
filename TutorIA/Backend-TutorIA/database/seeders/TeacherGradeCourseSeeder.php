<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Grade;
use App\Models\GradeCourse;
use App\Models\Teacher;
use App\Models\TeacherGradeCourse;
use Illuminate\Database\Seeder;

class TeacherGradeCourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $renzo = Teacher::whereHas('user', function ($query) {
            $query->where('codigo', 'DOC-2026-001');
        })->firstOrFail();

        $jose = Teacher::whereHas('user', function ($query) {
            $query->where('codigo', 'DOC-2026-002');
        })->firstOrFail();

        $diana = Teacher::whereHas('user', function ($query) {
            $query->where('codigo', 'DOC-2026-003');
        })->firstOrFail();

        $this->asignar(
            $renzo,
            'Secundaria',
            '4to',
            'Matemáticas'
        );

        $this->asignar(
            $renzo,
            'Secundaria',
            '3ro',
            'Computación'
        );

        $this->asignar(
            $jose,
            'Primaria',
            '3ro',
            'Matemáticas'
        );

        $this->asignar(
            $jose,
            'Primaria',
            '3ro',
            'Computación'
        );

        $this->asignar(
            $diana,
            'Secundaria',
            '2do',
            'Matemáticas'
        );

        $this->asignar(
            $diana,
            'Primaria',
            '5to',
            'Computación'
        );
    }

    private function asignar(
        Teacher $teacher,
        string $nivel,
        string $grado,
        string $curso
    ): void {
        $grade = Grade::where('nombre', $grado)
            ->whereHas('educationalLevel', function ($query) use ($nivel) {
                $query->where('nombre', $nivel);
            })
            ->firstOrFail();

        $course = Course::where('nombre', $curso)
            ->firstOrFail();

        $gradeCourse = GradeCourse::firstOrCreate([
            'grade_id' => $grade->id,
            'course_id' => $course->id,
        ]);

        TeacherGradeCourse::firstOrCreate([
            'teacher_id' => $teacher->id,
            'grade_course_id' => $gradeCourse->id,
        ]);
    }
}
