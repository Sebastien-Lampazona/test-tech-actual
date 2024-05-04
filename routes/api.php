<?php
/**
 * This file contains the API routes for the application.
 *
 * It defines the routes for managing missions and users.
 * The routes are grouped by controllers and prefixed with '/missions' and '/users' respectively.
 * Each route corresponds to a specific action in the controller.
 * The routes also support nested routes for managing missions associated with a specific user.
 *
 * @package     App\Http\Controllers
 * @subpackage  API
 */
use App\Http\Controllers\MissionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Missions routes
Route::controller(MissionController::class)->prefix('/missions')->group(function () {
    Route::get('/', 'list');
    Route::post('/', 'store');
});

// Users routes
Route::controller(UserController::class)->prefix('/users')->group(function () {
    Route::get('/', 'list');
    Route::post('/', 'store');

    Route::prefix('/{userId}')->group(function () {
        Route::get('/', 'show');
        Route::patch('/', 'update');
        Route::delete('/', 'destroy');

        Route::prefix('/missions')->group(function () {
            Route::put('/{missionId}', 'addMission');
            Route::delete('/{missionId}', 'removeMission');
        });
    });
});
