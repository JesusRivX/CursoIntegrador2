<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Verifica las credenciales de un usuario.
     *
     * @param string $codigo
     * @param string $password
     * @param string $rol
     * @return array|null
     */
    public function verificarUsuario(
        string $codigo,
        string $password,
        string $rol
    ): ?array {

        $resultado = DB::select(
            'CALL sp_login_usuario(?, ?)',
            [$codigo, $rol]
        );

        if (empty($resultado)) {
            return null;
        }

        $usuario = User::find($resultado[0]->id);

        if (!$usuario || !Hash::check($password, $resultado[0]->password)) {
            return null;
        }

        return [
            'usuario' => $usuario,
            'token' => $usuario->createToken('auth_token')->plainTextToken,
        ];
    }
}
