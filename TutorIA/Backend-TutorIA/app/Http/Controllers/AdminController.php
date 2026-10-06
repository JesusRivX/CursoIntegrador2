<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserInfoResource;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
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
