<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GradeCourse extends Model
{
    protected $fillable = [
        'grade_id',
        'course_id',
    ];

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function studentCourses()
    {
        return $this->hasMany(StudentCourse::class);
    }

    public function teacherGradeCourses()
    {
        return $this->hasMany(TeacherGradeCourse::class);
    }

    public function themes()
    {
        return $this->hasMany(Theme::class, 'grade_course_id');
    }
}
