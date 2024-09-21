<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;



class AuthController extends Controller{

    public function index()
    {
        //
        return User::all();
    }
    //
    public function register(Request $request){
        $fields = $request->validate([
            'name'=> 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);


        $user = User::create([
            'name' => $fields['name'],
            'email'=> $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        return response( [
            'token' => $token,
            'user' => $user] );
        // $response = [
        //     'user' => $user,
        //     'token' =>$token
        // ];
        // return response($response, 201);

        // $request->validate([
        //     'name' => 'required',
        //     'email'=> $request['email'],
        //     'password' => bcrypt($request['password'])
        // ]);
        // return User::create($request->all());

    }

    public function logout(Request $request){

        $user = $request->user();

    if ($user) {
        $user->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }

    return response()->json(['message' => 'User not authenticated'], 401);

        
        // $user = auth('sanctum')->user();

        // // Alternatively, if you're sure you're using the default guard
        // $user = auth()->user();
    
        // if ($user) {
        //     $user->tokens()->delete();
        //     return response()->json(['message' => 'Logged out'], 200);

        // }

        // auth()->user()->tokens()->delete();    
        // return response()->json(['message' => 'Logged out']);

    }

    public function login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);


        $user = User::where('email', $fields['email'])->first();
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'email or password do not exist'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' =>$token
        ];
        return response($response, 201);

    }
    public function destroy(string $id)
    {
        //
        return User::destroy($id);
    }

    public function showById(string $id)
    {
        return User::find($id);
    }

    public function update(Request $request, string $id)
    {
        //
        $appliance = User::find($id);
        $appliance->update($request->all());
        return $appliance;
    }
}
