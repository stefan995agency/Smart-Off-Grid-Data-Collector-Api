<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ListSensorController extends Controller{

public function listSensor(Request $request){
    $startDate = $request->input('start_date');
    $endDate = $request->input('end_date');

    
    $sensorData = DB::select('CALL get_sensor_data(?, ?)', [$startDate, $endDate]);

    
    return response()->json($sensorData);
}
}