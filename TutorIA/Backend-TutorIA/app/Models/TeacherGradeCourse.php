<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherGradeCourse extends Model
{
    protected $fillable = [
        'teacher_id',
        'grade_course_id',
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function gradeCourse()
    {
        return $this->belongsTo(GradeCourse::class);
    }
}
