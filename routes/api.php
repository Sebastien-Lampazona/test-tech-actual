<?php

use App\Http\Resources\MissionCollection;
use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/missions', function (Request $request) {
    return new MissionCollection(Mission::all());
});
