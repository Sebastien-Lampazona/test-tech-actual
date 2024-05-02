<?php

use App\Http\Controllers\MissionController;
use App\Http\Controllers\UserController;
use App\Http\Resources\MissionCollection;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\Mission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::controller(MissionController::class)->prefix('/missions')->group(function () {
    Route::get('/', 'list');
});

Route::controller(UserController::class)->prefix('/users')->group(function () {
    Route::get('/', 'list');
    Route::post('/', 'store');
    Route::get('/{userId}', 'show');
    Route::patch('/{userId}', 'update');
    Route::put('/{userId}/missions/{missionId}', 'addMission');
    Route::delete('/{userId}/missions/{missionId}', 'removeMission');
});
