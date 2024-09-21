<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inverter;

class InverterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inverter::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
           
        'name'  => 'required',
        'input_voltage'  => 'required',
        'output_voltage'  => 'required',
        'output_current' => 'required'
            ]);
            return Inverter::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Inverter::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $inverter = Inverter::find($id);
        $inverter->update($request->all());
        return $inverter;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        return Inverter::destroy($id);
    }

    public function search(string $name)
    {
        //
        return Inverter::where('name', 'like', '%'.$name.'%')->get();
    }
}
