<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Verifica si un usuario existe con las credenciales proporcionadas.
     *
     * @param LoginRequest $req
     * @param UserService $userService
     * @return JsonResponse
     */
    public function verificarUsuario(
        LoginRequest $req,
        UserService $userService
    ): JsonResponse {

        $resultado = $userService->verificarUsuario(
            $req->codigo,
            $req->password,
            $req->rol
        );

        if (!$resultado) {
            return response()->json([
                'message' => 'Credenciales incorrectas',
            ], 401);
        }

        return response()->json([
            'message' => 'Inicio de sesión correcto',
            'usuario' => new UserResource($resultado['usuario']),
            'token' => $resultado['token'],
        ], 200);
    }
}
