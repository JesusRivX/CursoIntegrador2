<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $fillable = [
        'nombre',
        'nivel_educativo_id',
    ];

    public function educationalLevel()
    {
        return $this->belongsTo(EducationalLevel::class, 'nivel_educativo_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'grado_id');
    }

    public function gradeCourses()
    {
        return $this->hasMany(GradeCourse::class);
    }

    public function teacherGradeCourses()
    {
        return $this->hasMany(TeacherGradeCourse::class);
    }
}
