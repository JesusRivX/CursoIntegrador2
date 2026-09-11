<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function verificarUsuario(
        string $codigo,
        string $password,
        string $rol
    ): ?array {
        $usuario = User::where('codigo', $codigo)
            ->where('rol', $rol)
            ->first();

        if (!$usuario || !Hash::check($password, $usuario->password)) {
            return null;
        }

        $token = $usuario->createToken('auth_token')->plainTextToken;

        return [
            'usuario' => $usuario,
            'token' => $token,
        ];
    }
}
