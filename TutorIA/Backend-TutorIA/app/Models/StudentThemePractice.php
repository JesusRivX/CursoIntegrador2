<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentThemePractice extends Model
{
    protected $fillable = [
        'student_course_id',
        'theme_id',
        'correctas',
        'incorrectas',
        'total_preguntas',
        'porcentaje',
        'completado',
    ];

    protected $casts = [
        'correctas' => 'integer',
        'incorrectas' => 'integer',
        'total_preguntas' => 'integer',
        'porcentaje' => 'integer',
        'completado' => 'boolean',
    ];

    public function studentCourse()
    {
        return $this->belongsTo(
            StudentCourse::class,
            'student_course_id'
        );
    }

    public function theme()
    {
        return $this->belongsTo(
            Theme::class,
            'theme_id'
        );
    }
}
