<?php

namespace App\Http\Controllers;

use App\Http\Resources\CursoDetalleResource;
use App\Http\Resources\CursoResource;
use App\Http\Resources\CursoTemaResource;
use App\Services\StudentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Obtiene los cursos del estudiante.
     */

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

    /**
     * Obtiene el detalle de un curso específico.
     */

    public function curso_detalle(
        Request $req,
        int $cursoId,
        StudentService $misCursosService
    ): JsonResponse {

        $userId = $req->user()->id;
        $resultado = $misCursosService->mi_curso_detalle($userId, $cursoId);

        if (!$resultado) {
            return response()->json([
                'message' => 'Curso no encontrado',
            ], 404);
        }

        return response()->json([
            'message' => 'Curso obtenido correctamente',
            'data' => new CursoDetalleResource($resultado),
        ], 200);
    }

    /**
     * Obtiene los temas de un curso específico.
     */

    public function curso_temas(
        Request $req,
        int $cursoId,
        int $temaId,
        StudentService $misCursosService
    ): JsonResponse {

        $userId = $req->user()->id;
        $resultado = $misCursosService->mi_curso_temas($userId, $cursoId, $temaId);

        if (!$resultado) {
            return response()->json([
                'message' => 'Curso no encontrado',
            ], 404);
        }

        return response()->json([
            'message' => 'Tema obtenido correctamente',
            'data' => new CursoTemaResource($resultado),
        ], 200);
    }

    /**
     * Actualiza el progreso de un tema específico.
     */

    public function actualizar_progreso_tema(
        int $cursoId,
        int $temaId,
        StudentService $misCursosService
    ): JsonResponse {

        $resultado = $misCursosService->actualizar_progreso_tema($cursoId, $temaId);

        if (!$resultado) {
            return response()->json([
                'message' => 'No se encontró el progreso del tema',
            ], 404);
        }

        return response()->json([
            'message' => 'Progreso del tema actualizado correctamente',
        ], 200);
    }
}
