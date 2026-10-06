<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CursoDetalleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $curso = $this->resource[0];

        return [
            'curso_id' => $curso->curso_id,
            'curso_codigo' => $curso->curso_codigo,
            'curso_nombre' => $curso->curso_nombre,
            'curso_descripcion' => $curso->curso_descripcion,
            'nivel_educativo' => $curso->nivel_educativo,
            'grado' => $curso->grado,
            'cantidad_temas' => $curso->cantidad_temas,

            'temas' => array_map(function ($tema) {
                return [
                    'tema_id' => $tema->tema_id,
                    'tema_nombre' => $tema->tema_nombre,
                    'tema_descripcion' => $tema->tema_descripcion,
                    'progreso' => $tema->progreso,
                    'estado' => $tema->estado,
                ];
            }, $this->resource),
        ];
    }
}
