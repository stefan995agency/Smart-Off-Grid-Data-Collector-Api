<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appliance;

class ApplianceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Appliance::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required',
            'power_consumption' => 'required'
        ]);
        return Appliance::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Appliance::find($id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $appliance = Appliance::find($id);
        $appliance->update($request->all());
        return $appliance;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        return Appliance::destroy($id);
    }

    public function search(string $name)
    {
        //
        return Appliance::where('name', 'like', '%'.$name.'%')->get();
    }
}
