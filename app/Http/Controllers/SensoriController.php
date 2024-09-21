<?php

namespace App\Http\Controllers;

use App\Models\Sensori;
use Illuminate\Http\Request;

class SensoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Sensori::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        $request->validate([
            'voltage' => 'required',
            'current' => 'required',
            'power' => 'required'
            ]);
            return Sensori::create($request->all());    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Sensori $sensori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sensori $sensori)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $sensor = Sensori::find($id);
        $sensor->update($request->all());
        return $sensor;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        return Sensori::destroy($id);
    }
}
