<?php

namespace App\Http\Controllers;

use App\Http\Resources\MissionCollection;
use App\Models\Mission;

/**
 * The MissionController class handles the logic for retrieving a list of missions.
 */
class MissionController extends Controller
{
    /**
     * Retrieve a list of missions.
     *
     * @return MissionCollection
     */
    public function list()
    {
        return new MissionCollection(Mission::all());
    }
}
