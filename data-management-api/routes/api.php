<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\EmployeeController;

Route::get('/provinces', [ProvinceController::class, 'index']);

Route::get('/cities/{province}', [CityController::class, 'index']);

Route::get('/districts/{city}', [DistrictController::class, 'index']);

Route::get('/employees', [EmployeeController::class, 'index']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);

Route::post('/employees/bulk-edit', [EmployeeController::class, 'bulkEdit']);
Route::post('/employees/bulk-delete', [EmployeeController::class, 'bulkDelete']);
