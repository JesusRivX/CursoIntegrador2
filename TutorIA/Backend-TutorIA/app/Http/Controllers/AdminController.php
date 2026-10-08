<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserInfoResource;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{

    /**
     * Obtiene los KPI de inicio del dashboard del administrador.
     */

    public function dashboard_inicio_kpi(AdminService $adminService): JsonResponse
    {
        $resultado = $adminService->dashboard_inicio_kpi();

        if (!$resultado) {
            return response()->json([
                'message' => 'No se encontraron resultados',
            ], 404);
        }

        return response()->json([
            'message' => 'KPI obtenidos correctamente',
            'data' => $resultado,
        ], 200);
    }

    /**
     * Obtiene los KPI de usuarios.
     */

    public function kpi_usuarios(AdminService $adminService): JsonResponse
    {
        $resultado = $adminService->kpi_usuarios();

        if (!$resultado) {
            return response()->json([
                'message' => 'No se encontraron resultados',
            ], 404);
        }

        return response()->json([
            'message' => 'KPI de usuarios obtenidos correctamente',
            'data' => $resultado,
        ], 200);
    }

    /**
     * Obtiene la lista de usuarios.
     */

    public function usuarios(AdminService $adminService): JsonResponse
    {
        $resultado = $adminService->usuarios();

        if (!$resultado) {
            return response()->json([
                'message' => 'No se encontraron resultados',
            ], 404);
        }

        return response()->json([
            'message' => 'Usuarios obtenidos correctamente',
            'data' => $resultado,
        ], 200);
    }

    /**
     * Obtiene la información de un usuario específico.
     */

    public function usuario_informacion(int $userId, AdminService $adminService): JsonResponse
    {
        $resultado = $adminService->usuario_informacion($userId);

        if (!$resultado) {
            return response()->json([
                'message' => 'No se encontraron resultados',
            ], 404);
        }

        return response()->json([
            'message' => 'Información de usuarios obtenida correctamente',
            'data' => new UserInfoResource($resultado),
        ], 200);
    }
}
