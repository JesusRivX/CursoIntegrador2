<?php

namespace App\Http\Controllers;

use App\Http\Resources\CursoResource;
use App\Services\StudentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function dashboard_cursos(
        Request $req,
        StudentService $misCursosService
    ): JsonResponse {

        $userId = $req->user()->id;
        $resultado = $misCursosService->mis_cursos($userId);

        if (!$resultado) {
            return response()->json([
                'message' => 'Estudiante no encontrado',
            ], 404);
        }

        return response()->json([
            'message' => 'Cursos obtenidos correctamente',
            'data' => new CursoResource($resultado),
        ], 200);
    }
}
