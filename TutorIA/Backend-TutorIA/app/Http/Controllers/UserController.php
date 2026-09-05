<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
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
            'user' => $resultado['usuario'],
            'token' => $resultado['token'],
        ]);
    }
}
