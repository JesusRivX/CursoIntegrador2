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
        Schema::create('student_theme_practices', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_course_id')
                ->constrained('student_courses')
                ->cascadeOnDelete();

            $table->foreignId('theme_id')
                ->constrained('themes')
                ->cascadeOnDelete();

            $table->unsignedInteger('correctas')
                ->default(0);

            $table->unsignedInteger('incorrectas')
                ->default(0);

            $table->unsignedInteger('total_preguntas')
                ->default(0);

            $table->unsignedInteger('porcentaje')
                ->default(0);

            $table->boolean('completado')
                ->default(false);

            $table->timestamps();

            $table->unique([
                'student_course_id',
                'theme_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_theme_practices');
    }
};
