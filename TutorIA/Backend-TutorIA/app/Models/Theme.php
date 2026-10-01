<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    protected $fillable = [
        'grade_course_id',
        'nombre',
        'descripcion',
        'archivo_nombre',
        'archivo_url',
    ];

    public function gradeCourse()
    {
        return $this->belongsTo(
            GradeCourse::class,
            'grade_course_id'
        );
    }

    public function examples()
    {
        return $this->hasMany(
            ThemeExample::class,
            'theme_id'
        );
    }

    public function exercises()
    {
        return $this->hasMany(
            ThemeExercise::class,
            'theme_id'
        );
    }

    public function progress()
    {
        return $this->hasMany(
            StudentThemeProgress::class,
            'theme_id'
        );
    }

    public function studentThemePractices()
    {
        return $this->hasMany(
            StudentThemePractice::class,
            'theme_id'
        );
    }
}
