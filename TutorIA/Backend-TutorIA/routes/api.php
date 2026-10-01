<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(StudentController::class)
    ->middleware('auth:sanctum')
    ->prefix('student')->group(function () {
        Route::get('/dashboard-cursos', 'dashboard_cursos');
    });

Route::post('/login', [UserController::class, 'verificarUsuario']);
