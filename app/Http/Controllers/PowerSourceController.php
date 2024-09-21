<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PowerSource;

class PowerSourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return PowerSource::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name'  => 'required',
            'type'  => 'required',
            'max_output' => 'required'
            ]);
                
        return PowerSource::create($request->all());

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return PowerSource::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $powerSource = PowerSource::find($id);
        $powerSource->update($request->all());
        return $powerSource;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        return PowerSource::destroy($id);
    }

    public function search(string $name)
    {
        //
        return PowerSource::where('name', 'like', '%'.$name.'%')->get();
    }
}
