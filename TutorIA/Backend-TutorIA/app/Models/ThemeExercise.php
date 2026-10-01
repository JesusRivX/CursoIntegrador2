<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThemeExercise extends Model
{
    protected $fillable = [
        'theme_id',
        'pregunta',
        'opciones',
        'respuesta_correcta',
    ];

    protected $casts = [
        'opciones' => 'array',
    ];

    public function theme()
    {
        return $this->belongsTo(
            Theme::class,
            'theme_id'
        );
    }
}
