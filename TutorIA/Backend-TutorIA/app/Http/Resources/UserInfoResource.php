<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $filas = collect($this->resource);

        $primera = $filas->first();

        if (!$primera) {
            return [];
        }

        $data = [
            'id' => $primera->id,
            'usuario' => $primera->usuario,
            'codigo' => $primera->codigo,
            'rol' => $primera->rol,
            'estado' => $primera->estado,
            'nivel' => $primera->nivel,
            'grado' => $primera->grado,
        ];

        if ($primera->rol === 'Estudiante') {
            $data['cursos'] = $filas
                ->pluck('curso')
                ->filter()
                ->unique()
                ->values()
                ->all();
        }

        if ($primera->rol === 'Docente') {
            $data['especialidades'] = $filas
                ->pluck('especialidad')
                ->filter()
                ->unique()
                ->values()
                ->all();
        }

        return $data;
    }
}
