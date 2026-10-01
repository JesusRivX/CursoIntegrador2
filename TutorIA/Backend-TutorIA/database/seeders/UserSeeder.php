<?php

namespace Database\Seeders;

use App\Models\Role;
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
        $estudiante = Role::where(
            'nombre',
            'Estudiante'
        )->firstOrFail();

        $docente = Role::where(
            'nombre',
            'Docente'
        )->firstOrFail();

        $administrador = Role::where(
            'nombre',
            'Administrador'
        )->firstOrFail();

        User::create([
            'rol_id' => $estudiante->id,
            'codigo' => 'EST-2026-001',
            'nombre' => 'Jesus Rivera',
            'password' => Hash::make('123456'),
            'estado' => 'activo',
        ]);

        User::create([
            'rol_id' => $estudiante->id,
            'codigo' => 'EST-2026-002',
            'nombre' => 'Renato Ninatanta',
            'password' => Hash::make('123456'),
            'estado' => 'activo',
        ]);

        User::create([
            'rol_id' => $estudiante->id,
            'codigo' => 'EST-2026-003',
            'nombre' => 'Ben Alanya',
            'password' => Hash::make('123456'),
            'estado' => 'activo',
        ]);

        User::create([
            'rol_id' => $docente->id,
            'codigo' => 'DOC-2026-001',
            'nombre' => 'Renzo Barturen',
            'password' => Hash::make('123456'),
            'estado' => 'activo',
        ]);

        User::create([
            'rol_id' => $docente->id,
            'codigo' => 'DOC-2026-002',
            'nombre' => 'Jose Quispe',
            'password' => Hash::make('123456'),
            'estado' => 'activo',
        ]);

        User::create([
            'rol_id' => $docente->id,
            'codigo' => 'DOC-2026-003',
            'nombre' => 'Diana Marquez',
            'password' => Hash::make('123456'),
            'estado' => 'activo',
        ]);

        User::create([
            'rol_id' => $administrador->id,
            'codigo' => 'ADM-2026-001',
            'nombre' => 'Alonso Quispe',
            'password' => Hash::make('123456'),
            'estado' => 'activo',
        ]);
    }
}
