<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $docentes = [
            'DOC-2026-001',
            'DOC-2026-002',
            'DOC-2026-003',
        ];

        foreach ($docentes as $codigo) {
            $user = User::where('codigo', $codigo)->firstOrFail();

            Teacher::create([
                'user_id' => $user->id,
            ]);
        }
    }
}
