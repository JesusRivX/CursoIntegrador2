<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class StudentService
{
    public function mis_cursos(int $userId): ?array
    {
        $resultado = DB::select(
            'CALL sp_dashboard_cursos(?)',
            [$userId]
        );

        return empty($resultado) ? null : $resultado;
    }

    public function mi_curso_detalle(int $userId, int $cursoId): ?array
    {
        $resultado = DB::select(
            'CALL sp_detalle_curso(?, ?)',
            [$userId, $cursoId]
        );

        return empty($resultado) ? null : $resultado;
    }

    public function mi_curso_temas(int $userId, int $cursoId, int $temaId): ?array
    {
        $resultado = DB::select(
            'CALL sp_detalle_tema(?, ?, ?)',
            [$userId, $cursoId, $temaId]
        );

        return empty($resultado) ? null : $resultado;
    }

    public function actualizar_progreso_tema(
        int $studentCourseId,
        int $temaId
    ): bool {

        $resultado = DB::table('student_theme_progress')
            ->where('student_course_id', $studentCourseId)
            ->where('theme_id', $temaId)
            ->update([
                'progreso' => 100,
                'updated_at' => now(),
            ]);

        return $resultado > 0;
    }
}
