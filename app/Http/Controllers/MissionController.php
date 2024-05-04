<?php

namespace App\Http\Controllers;

use App\Http\Resources\MissionCollection;
use App\Http\Resources\MissionResource;
use App\Models\Mission;
use Illuminate\Http\Request;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required|max:255',
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $mission = Mission::create($validated);

        return new MissionResource($mission);
    }
}
