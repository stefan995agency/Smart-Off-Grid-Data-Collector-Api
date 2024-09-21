<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Battery;


class BatteryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Battery::all();
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
           
            'name' => 'required',
            'capacity'  => 'required',
            'current_charge' => 'required',
            'state_of_charge' => 'required'
            ]);
            return Battery::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Battery::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $battery = Battery::find($id);
        $battery->update($request->all());
        return  $battery;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        return Battery::destroy($id);
    }

    public function search(string $name)
    {
        //
        return Battery::where('name', 'like', '%'.$name.'%')->get();
    }
}
