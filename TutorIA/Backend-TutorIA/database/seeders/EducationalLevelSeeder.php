<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use Illuminate\Database\Seeder;

class EducationalLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EducationalLevel::create([
            'nombre' => 'Primaria',
        ]);

        EducationalLevel::create([
            'nombre' => 'Secundaria',
        ]);
    }
}
