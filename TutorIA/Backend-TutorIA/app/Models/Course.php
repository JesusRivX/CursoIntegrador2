<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion',
        'estado',
    ];

    public function gradeCourses()
    {
        return $this->hasMany(GradeCourse::class);
    }

    public function teacherGradeCourses()
    {
        return $this->hasMany(TeacherGradeCourse::class);
    }
}
