<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CursoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resultados = collect($this->resource);

        $primero = $resultados->first();

        $cursos = $resultados
            ->filter(fn($curso) => $curso->curso_id !== null)
            ->values();

        return [
            'nivel_educativo' => $primero->nivel_educativo,
            'grado' => $primero->grado,
            'cantidad_cursos' => (int) $primero->cantidad_cursos,
            'mensaje' => $cursos->isEmpty()
                ? 'No tienes cursos asignados'
                : null,
            'cursos' => $cursos->map(fn($curso) => [
                'id' => $curso->curso_id,
                'codigo' => $curso->curso_codigo,
                'nombre' => $curso->curso_nombre,
                'descripcion' => $curso->curso_descripcion,
                'cantidad_temas' => $curso->cantidad_temas,
            ])->values()->toArray(),
        ];
    }
}
