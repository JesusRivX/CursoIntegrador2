<?php

namespace Database\Seeders;

use App\Models\StudentCourse;
use App\Models\StudentThemeProgress;
use App\Models\Theme;
use Illuminate\Database\Seeder;

class StudentThemeProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $studentCourses = StudentCourse::all();

        foreach ($studentCourses as $studentCourse) {

            $themes = Theme::where(
                'grade_course_id',
                $studentCourse->grade_course_id
            )->get();

            foreach ($themes as $theme) {

                StudentThemeProgress::create([
                    'student_course_id' => $studentCourse->id,
                    'theme_id' => $theme->id,
                    'progreso' => rand(0, 1) * 100,
                ]);
            }
        }
    }
}
