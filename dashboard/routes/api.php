<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\momsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post("/login", [AuthController::class, 'login']);
Route::post("/signup", [RegisteredUserController::class, "apiStore"]);

Route::middleware('auth:sanctum')->group(function () {
   Route::post("/moms/new", [momsController::class, 'store']);
});
