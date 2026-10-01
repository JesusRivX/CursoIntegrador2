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
        Schema::create('themes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('grade_course_id')
                ->constrained('grade_courses')
                ->cascadeOnDelete();

            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('archivo_nombre')->nullable();
            $table->string('archivo_url')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
