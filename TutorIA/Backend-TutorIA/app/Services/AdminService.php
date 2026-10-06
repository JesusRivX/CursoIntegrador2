<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class AdminService
{
    public function dashboard_inicio_kpi(): ?array
    {
        $resultado = DB::select(
            'CALL sp_kpi_dashboard'
        );

        return empty($resultado) ? null : $resultado;
    }

    public function kpi_usuarios(): ?array
    {
        $resultado = DB::select(
            'CALL sp_kpi_usuario'
        );

        return empty($resultado) ? null : $resultado;
    }

    public function usuarios(): ?array
    {
        $resultado = DB::select(
            'CALL sp_total_usuario'
        );

        return empty($resultado) ? null : $resultado;
    }

    public function usuario_informacion(int $userId): ?array
    {
        $resultado = DB::select(
            'CALL sp_usuario_info(?)',
            [$userId]
        );

        return empty($resultado) ? null : $resultado;
    }
}
