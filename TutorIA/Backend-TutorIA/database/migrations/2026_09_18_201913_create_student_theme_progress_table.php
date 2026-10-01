<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_theme_progress', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_course_id')
                ->constrained('student_courses')
                ->cascadeOnDelete();

            $table->foreignId('theme_id')
                ->constrained('themes')
                ->cascadeOnDelete();

            $table->unsignedTinyInteger('progreso')
                ->default(0);

            $table->timestamps();

            $table->unique([
                'student_course_id',
                'theme_id'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_theme_progress');
    }
};
