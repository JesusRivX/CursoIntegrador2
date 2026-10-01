<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentThemeProgress extends Model
{
    // protected $table = 'student_theme_progress';

    protected $fillable = [
        'student_course_id',
        'theme_id',
        'progreso',
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
