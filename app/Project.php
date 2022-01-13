<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['project_name', 'project_statements', 'project_variable'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
