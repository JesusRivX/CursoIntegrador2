<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use App\Models\Grade;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $primaria = EducationalLevel::where('nombre', 'Primaria')->first();

        $secundaria = EducationalLevel::where('nombre', 'Secundaria')->first();

        foreach (['1ro', '2do', '3ro', '4to', '5to', '6to'] as $grado) {
            Grade::create([
                'nivel_educativo_id' => $primaria->id,
                'nombre' => $grado,
            ]);
        }

        foreach (['1ro', '2do', '3ro', '4to', '5to'] as $grado) {
            Grade::create([
                'nivel_educativo_id' => $secundaria->id,
                'nombre' => $grado,
            ]);
        }
    }
}
