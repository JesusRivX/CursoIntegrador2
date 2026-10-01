<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EducationalLevel extends Model
{
    protected $fillable = [
        'nombre',
    ];

    public function grades()
    {
        return $this->hasMany(Grade::class, 'nivel_educativo_id');
    }
}
