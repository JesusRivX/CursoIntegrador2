<?php

namespace Database\Seeders;

use App\Models\Theme;
use App\Models\ThemeExercise;
use Illuminate\Database\Seeder;

class ThemeExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numerosEnteros = Theme::where(
            'nombre',
            'Números enteros'
        )->firstOrFail();

        ThemeExercise::create([
            'theme_id' => $numerosEnteros->id,
            'pregunta' => '¿Cuál es el resultado de -8 + 13?',
            'opciones' => [
                '-21',
                '-5',
                '5',
                '21',
            ],
            'respuesta_correcta' => '5',
        ]);

        ThemeExercise::create([
            'theme_id' => $numerosEnteros->id,
            'pregunta' => '¿Cuál de los siguientes números es mayor?',
            'opciones' => [
                '-12',
                '-4',
                '-20',
                '-15',
            ],
            'respuesta_correcta' => '-4',
        ]);

        $fracciones = Theme::where(
            'nombre',
            'Fracciones'
        )->firstOrFail();

        ThemeExercise::create([
            'theme_id' => $fracciones->id,
            'pregunta' => '¿Cuál es el resultado de 1/2 + 1/4?',
            'opciones' => [
                '1/4',
                '2/4',
                '3/4',
                '4/4',
            ],
            'respuesta_correcta' => '3/4',
        ]);

        ThemeExercise::create([
            'theme_id' => $fracciones->id,
            'pregunta' => '¿Qué fracción representa la misma cantidad que 2/4?',
            'opciones' => [
                '1/2',
                '1/3',
                '2/3',
                '3/4',
            ],
            'respuesta_correcta' => '1/2',
        ]);
    }
}
