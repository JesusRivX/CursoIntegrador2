<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThemeExample extends Model
{
    protected $fillable = [
        'theme_id',
        'titulo',
        'problema',
        'solucion',
        'respuesta',
    ];

    public function theme()
    {
        return $this->belongsTo(
            Theme::class,
            'theme_id'
        );
    }
}
