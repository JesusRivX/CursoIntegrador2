<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $usuario = $this->resource;

        return [
            'id' => $usuario->id,
            'codigo' => $usuario->codigo,
            'nombre' => $usuario->nombre,
            'estado' => $usuario->estado,
            'rol' => $usuario->role?->nombre,
        ];
    }
}
