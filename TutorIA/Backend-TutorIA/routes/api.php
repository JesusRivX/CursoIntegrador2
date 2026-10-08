<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserController::class, 'verificarUsuario']);

Route::controller(StudentController::class)
    ->middleware('auth:sanctum')
    ->prefix('student')->group(function () {
        Route::get('/dashboard-cursos', 'dashboard_cursos');
        Route::get('/dashboard-cursos/{cursoId}', 'curso_detalle');
        Route::get('/dashboard-cursos/{cursoId}/temas/{temaId}', 'curso_temas');
        Route::patch('/dashboard-cursos/{cursoId}/temas/{temaId}', 'actualizar_progreso_tema');
    });

Route::controller(AdminController::class)
    ->middleware('auth:sanctum')
    ->prefix('admin')->group(function () {
        Route::get('/dashboard-kpi-inicio', 'dashboard_inicio_kpi');
        Route::get('/kpi-usuarios', 'kpi_usuarios');
        Route::get('/usuarios', 'usuarios');
        Route::get('/usuarios/{userId}', 'usuario_informacion');
    });
