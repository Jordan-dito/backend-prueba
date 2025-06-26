<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API REST para usuarios
Route::apiResource('usuarios', UsuarioController::class);


use App\Http\Controllers\Api\DepartamentoController;

Route::get('departamentos', [DepartamentoController::class, 'index']);


use App\Http\Controllers\Api\CargoController;

Route::get('cargos', [CargoController::class, 'index']);

