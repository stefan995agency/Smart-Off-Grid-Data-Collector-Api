<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inverter extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'input_voltage',
        'output_voltage',
        'output_current'
    ];
}
