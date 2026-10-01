<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grado4toSecundaria = Grade::where('nombre', '4to')
            ->whereHas('educationalLevel', function ($query) {
                $query->where('nombre', 'Secundaria');
            })
            ->firstOrFail();

        $grado2doSecundaria = Grade::where('nombre', '2do')
            ->whereHas('educationalLevel', function ($query) {
                $query->where('nombre', 'Secundaria');
            })
            ->firstOrFail();

        Student::create([
            'user_id' => User::where('codigo', 'EST-2026-001')
                ->firstOrFail()
                ->id,
            'grado_id' => $grado4toSecundaria->id,
        ]);

        Student::create([
            'user_id' => User::where('codigo', 'EST-2026-002')
                ->firstOrFail()
                ->id,
            'grado_id' => $grado2doSecundaria->id,
        ]);

        Student::create([
            'user_id' => User::where('codigo', 'EST-2026-003')
                ->firstOrFail()
                ->id,
            'grado_id' => $grado4toSecundaria->id,
        ]);
    }
}
