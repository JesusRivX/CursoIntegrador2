<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'codigo' => 'EST-2026-001',
            'password' => Hash::make('123456'),
            'name' => 'Jesus Rivera',
            'rol' => 'Estudiante',
            'estado' => 'Activo',
            'nivel' => 'Secundaria',
            'grado' => '4to',
        ]);

        User::create([
            'codigo' => 'DOC-2026-001',
            'password' => Hash::make('123456'),
            'name' => 'Renzo Barturen',
            'rol' => 'Docente',
            'estado' => 'Activo',
            'nivel' => 'Secundaria',
            'especialidad' => 'Matemática',
        ]);

        User::create([
            'codigo' => 'ADM-2026-001',
            'password' => Hash::make('123456'),
            'name' => 'Alonso Quispe',
            'rol' => 'Administrador',
            'estado' => 'Activo',
        ]);

        User::create([
            'codigo' => 'EST-2026-002',
            'password' => Hash::make('123456'),
            'name' => 'María López',
            'rol' => 'Estudiante',
            'estado' => 'Activo',
            'nivel' => 'Secundaria',
            'grado' => '2do',
        ]);

        User::create([
            'codigo' => 'EST-2026-003',
            'password' => Hash::make('123456'),
            'name' => 'Carlos Pérez',
            'rol' => 'Estudiante',
            'estado' => 'Activo',
            'nivel' => 'Secundaria',
            'grado' => '4to',
        ]);
    }
}
