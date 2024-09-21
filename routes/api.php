<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ApplianceController;
use App\Http\Controllers\BatteryController;
use App\Http\Controllers\InverterController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\PowerSourceController;
use App\Http\Controllers\SensoriController;
use App\Http\Controllers\AuthController;
//use App\Http\Controllers\ListSensorController;


//public route
Route::post('/register', [AuthController::class, 'register']);


Route::post('/login', [AuthController::class, 'login']);



Route::get('/user', function (Request $request) {
     return $request->user();
 })->middleware('auth:sanctum');


//protected routes
Route::group(['middleware' => ['auth:sanctum']], function(){

    //Route::get('/users', [AuthController::class, 'index']);
    //Route::get('/users/{id}', [AuthController::class, 'showById']);
    


    // crud ruter za kontrolere

    Route::resource('appliance', ApplianceController::class);
    Route::resource('battery', BatteryController::class);
    Route::resource('inverter', InverterController::class );

    Route::resource('log', LogController::class );
    Route::get('/logs/latest', [LogController::class, 'getLatestLog']);


    Route::resource('powersource', PowerSourceController::class );
    Route::resource('sensor', SensoriController::class );
    Route::resource('user', AuthController::class);

    // Route::get('/sensor-data', [ListSensorController::class, 'getSensorData']);

    //pretrazivanje po imenu komponente
    // Route::get('/user/{id}', [AuthController::class, 'showById']);
    // Route::put('/user/{id}', [AuthController::class, 'update']);
    
    // Route::get('/appliance/search/{name}', [ApplianceController::class, 'search']);
    // Route::get('/battery/{name}', [BatteryController::class, 'search']);
    // Route::post('/battery/new', [BatteryController::class, 'store']);

    // Route::get('/invertor/search/{name}', [InverterController::class, 'search']);
    // Route::get('/powersource/search/{name}', [PowerSourceController::class, 'search']);
    // Route::get('/sensor/search/{name}', [SensorController::class, 'search']);

    // //pretrazivanje u logu
    // Route::get('log/search/{timestamp}', [LogController::class, 'search']);
    // Route::get('log/search/range', [LogController::class, 'searchInRange']);

    // Route::post('/logout', [AuthController::class, 'logout']);
    // Route::post('/deleteuser', [AuthController::class, 'destroy']);
    // Route::get('/getusers',[[AuthController::class, 'index']]);

});
