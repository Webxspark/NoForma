<?php

use App\Http\Controllers\clientController;
use App\Http\Controllers\momsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('clients', clientController::class);
    Route::resource('moms', momsController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
