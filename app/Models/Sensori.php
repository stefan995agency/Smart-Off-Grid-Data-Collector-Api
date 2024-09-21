<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensori extends Model
{
    use HasFactory;
    protected $fillable = [
        
        'voltage',
        'current',
        'power'
    ];
}
