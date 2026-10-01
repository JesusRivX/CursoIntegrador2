<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            EducationalLevelSeeder::class,
            GradeSeeder::class,
            UserSeeder::class,
            TeacherSeeder::class,
            StudentSeeder::class,
            CourseSeeder::class,
            GradeCourseSeeder::class,
            TeacherGradeCourseSeeder::class,
            StudentCourseSeeder::class,
            ThemeSeeder::class,
            ThemeExampleSeeder::class,
            ThemeExerciseSeeder::class,
            StudentThemeProgressSeeder::class,
            StudentThemePracticeSeeder::class,
        ]);
    }
}
