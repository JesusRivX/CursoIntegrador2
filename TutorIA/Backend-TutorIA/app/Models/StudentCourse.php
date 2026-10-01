<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentCourse extends Model
{
    protected $fillable = [
        'student_id',
        'grade_course_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function gradeCourse()
    {
        return $this->belongsTo(GradeCourse::class);
    }

    public function themePractices()
    {
        return $this->hasMany(StudentThemePractice::class, 'student_course_id');
    }
}
