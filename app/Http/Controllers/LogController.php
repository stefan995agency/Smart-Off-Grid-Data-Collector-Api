<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Log::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        
        $request->validate([
            'total_production' => 'required',
            'total_load' => 'required',
            
            ]);
                
        return Log::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Log::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $log = Log::find($id);
        $log->update($request->all());
        return $log;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        return Log::destroy($id);
    }

    public function search(Request $request){
        $request->validate([
            'timestamp' => 'required|date',
        ]);
        $timestamp = $request->input('timestamp');

        $log = Log::where('timestamp', '=', $timestamp)->get();
        return $log;
    }
    public function searchInRange(Request $request){

        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);
    
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
    
        
        $log = Log::whereBetween('timestamp', [$startDate, $endDate])->get();
        return $log;
    }

    public function getLatestLog(){
        $latestLog = Log::latest('created_at')->first();

        if ($latestLog) {
            return response()->json([
                'success' => true,
                'data' => $latestLog
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No log data found'
        ], 404);
    }

    
}
