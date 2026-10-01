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
}
