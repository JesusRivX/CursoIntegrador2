<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CursoTemaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $tema = $this->resource[0];

        return [
            'curso_id' => $tema->curso_id,
            'curso_codigo' => $tema->curso_codigo,
            'curso_nombre' => $tema->curso_nombre,
            'curso_descripcion' => $tema->curso_descripcion,

            'nivel_educativo_id' => $tema->nivel_educativo_id,
            'nivel_educativo' => $tema->nivel_educativo,

            'grado_id' => $tema->grado_id,
            'grado' => $tema->grado,

            'student_id' => $tema->student_id,
            'student_course_id' => $tema->student_course_id,
            'grade_course_id' => $tema->grade_course_id,

            'tema_id' => $tema->tema_id,
            'tema_nombre' => $tema->tema_nombre,
            'tema_descripcion' => $tema->tema_descripcion,

            'archivo_nombre' => $tema->archivo_nombre,
            // 'archivo_url' => $tema->archivo_url,
            'tiene_material' => $tema->tiene_material,

            'progreso' => $tema->progreso,
            'estado' => $tema->estado,

            'ejemplos' => array_map(function ($ejemplo) {
                return [
                    'ejemplo_id' => $ejemplo->ejemplo_id,
                    'ejemplo_titulo' => $ejemplo->ejemplo_titulo,
                    'ejemplo_problema' => $ejemplo->ejemplo_problema,
                    'ejemplo_solucion' => $ejemplo->ejemplo_solucion,
                    'ejemplo_respuesta' => $ejemplo->ejemplo_respuesta,
                ];
            }, $this->resource),
        ];
    }
}
