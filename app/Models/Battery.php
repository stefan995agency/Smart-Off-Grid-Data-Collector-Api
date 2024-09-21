<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battery extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'capacity',
        'current_charge',
        'state_of_charge'
    ];
}
