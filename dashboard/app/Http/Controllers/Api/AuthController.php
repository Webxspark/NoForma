<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => "The provided credentials are incorrect."
            ])->setStatusCode(400);
        }

        return response()->json([
            'message' => "Welcome {$user->name}!",
            'user' => [
                "name" => $user->name,
                "email" => $user->email,
                "id" => $user->id
            ],
            "token" => $user->createToken("auth_token")->plainTextToken
        ])->setStatusCode(200);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = Auth::user();
        try {
            if (isset($request->all)) {
                $user->tokens()->delete();
            } else {
                $user->tokens()->where('token', $user->currentAccessToken()->token)->delete();
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error logging out: {$e->getMessage()}"
            ])->setStatusCode(500);
        }
        return response()->json([
            'message' => "Logged out successfully."
        ])->setStatusCode(200);
    }
}
