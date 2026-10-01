<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\GradeCourse;
use App\Models\Student;
use App\Models\StudentCourse;
use App\Models\StudentThemePractice;
use App\Models\Theme;
use Illuminate\Database\Seeder;

class StudentThemePracticeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $student = Student::firstOrFail();

        $grade = Grade::where('nombre', '4to')
            ->where('nivel_educativo_id', 2)
            ->firstOrFail();

        $gradeCourse = GradeCourse::where('grade_id', $grade->id)
            ->whereHas('course', function ($query) {
                $query->where('codigo', 'MAT');
            })
            ->firstOrFail();

        $studentCourse = StudentCourse::where(
            'student_id',
            $student->id
        )
            ->where(
                'grade_course_id',
                $gradeCourse->id
            )
            ->firstOrFail();

        $numerosEnteros = Theme::where(
            'nombre',
            'Números enteros'
        )
            ->where(
                'grade_course_id',
                $gradeCourse->id
            )
            ->firstOrFail();

        StudentThemePractice::create([
            'student_course_id' => $studentCourse->id,
            'theme_id' => $numerosEnteros->id,
            'correctas' => 2,
            'incorrectas' => 0,
            'total_preguntas' => 2,
            'porcentaje' => 100,
            'completado' => true,
        ]);

        $fracciones = Theme::where(
            'nombre',
            'Fracciones'
        )
            ->where(
                'grade_course_id',
                $gradeCourse->id
            )
            ->firstOrFail();

        StudentThemePractice::create([
            'student_course_id' => $studentCourse->id,
            'theme_id' => $fracciones->id,
            'correctas' => 1,
            'incorrectas' => 1,
            'total_preguntas' => 2,
            'porcentaje' => 50,
            'completado' => false,
        ]);

        $ecuaciones = Theme::where(
            'nombre',
            'Ecuaciones'
        )
            ->where(
                'grade_course_id',
                $gradeCourse->id
            )
            ->firstOrFail();

        StudentThemePractice::create([
            'student_course_id' => $studentCourse->id,
            'theme_id' => $ecuaciones->id,
            'correctas' => 0,
            'incorrectas' => 2,
            'total_preguntas' => 2,
            'porcentaje' => 0,
            'completado' => false,
        ]);

        $geometria = Theme::where(
            'nombre',
            'Geometría'
        )
            ->where(
                'grade_course_id',
                $gradeCourse->id
            )
            ->firstOrFail();

        StudentThemePractice::create([
            'student_course_id' => $studentCourse->id,
            'theme_id' => $geometria->id,
            'correctas' => 0,
            'incorrectas' => 0,
            'total_preguntas' => 2,
            'porcentaje' => 0,
            'completado' => false,
        ]);
    }
}
