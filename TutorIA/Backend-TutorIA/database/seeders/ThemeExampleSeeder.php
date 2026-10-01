<?php

namespace Database\Seeders;

use App\Models\Theme;
use App\Models\ThemeExample;
use Illuminate\Database\Seeder;

class ThemeExampleSeeder extends Seeder
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

        ThemeExample::create([
            'theme_id' => $numerosEnteros->id,
            'titulo' => 'Suma de números enteros',
            'problema' => 'Calcula: -8 + 13',
            'solucion' => 'Primero identificamos los signos. Como los números tienen signos diferentes, restamos sus valores absolutos: 13 - 8 = 5. Tomamos el signo del número con mayor valor absoluto, que es positivo.',
            'respuesta' => '5',
        ]);

        ThemeExample::create([
            'theme_id' => $numerosEnteros->id,
            'titulo' => 'Resta de números enteros',
            'problema' => 'Calcula: 15 - 20',
            'solucion' => 'Convertimos la resta en una suma del opuesto: 15 + (-20). Como tienen signos diferentes, restamos los valores absolutos: 20 - 15 = 5 y tomamos el signo del número con mayor valor absoluto.',
            'respuesta' => '-5',
        ]);


        $fracciones = Theme::where(
            'nombre',
            'Fracciones'
        )->firstOrFail();

        ThemeExample::create([
            'theme_id' => $fracciones->id,
            'titulo' => 'Suma de fracciones',
            'problema' => 'Calcula: 1/2 + 1/4',
            'solucion' => 'Buscamos un denominador común. El mínimo común múltiplo de 2 y 4 es 4. Convertimos 1/2 en 2/4 y luego sumamos: 2/4 + 1/4 = 3/4.',
            'respuesta' => '3/4',
        ]);

        ThemeExample::create([
            'theme_id' => $fracciones->id,
            'titulo' => 'Resta de fracciones',
            'problema' => 'Calcula: 3/4 - 1/2',
            'solucion' => 'Buscamos un denominador común. El mínimo común múltiplo de 4 y 2 es 4. Convertimos 1/2 en 2/4 y restamos: 3/4 - 2/4 = 1/4.',
            'respuesta' => '1/4',
        ]);

        $ecuaciones = Theme::where(
            'nombre',
            'Ecuaciones'
        )->firstOrFail();

        ThemeExample::create([
            'theme_id' => $ecuaciones->id,
            'titulo' => 'Ecuación de primer grado',
            'problema' => 'Resuelve: x + 7 = 15',
            'solucion' => 'Restamos 7 en ambos lados de la ecuación para dejar sola la variable: x + 7 - 7 = 15 - 7. Por lo tanto, x = 8.',
            'respuesta' => '8',
        ]);

        ThemeExample::create([
            'theme_id' => $ecuaciones->id,
            'titulo' => 'Ecuación con resta',
            'problema' => 'Resuelve: x - 9 = 12',
            'solucion' => 'Sumamos 9 en ambos lados de la ecuación: x - 9 + 9 = 12 + 9. Por lo tanto, x = 21.',
            'respuesta' => '21',
        ]);

        $geometria = Theme::where(
            'nombre',
            'Geometría'
        )->firstOrFail();

        ThemeExample::create([
            'theme_id' => $geometria->id,
            'titulo' => 'Perímetro de un rectángulo',
            'problema' => 'Un rectángulo tiene 8 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?',
            'solucion' => 'El perímetro de un rectángulo se obtiene sumando todos sus lados: 8 + 5 + 8 + 5 = 26 cm.',
            'respuesta' => '26 cm',
        ]);

        ThemeExample::create([
            'theme_id' => $geometria->id,
            'titulo' => 'Área de un rectángulo',
            'problema' => 'Un rectángulo tiene 10 cm de largo y 4 cm de ancho. ¿Cuál es su área?',
            'solucion' => 'Para calcular el área de un rectángulo multiplicamos el largo por el ancho: 10 × 4 = 40 cm².',
            'respuesta' => '40 cm²',
        ]);
    }
}
