<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\Mission;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class UserController extends Controller
{
    /**
     * Get a collection of all users.
     *
     * @return UserCollection
     */
    public function list()
    {
        return new UserCollection(User::all());
    }

    /**
     * Get the user with the specified ID.
     *
     * @param int $id The ID of the user.
     * @return UserResource
     */
    public function show($id)
    {
        return new UserResource(User::find($id));
    }

    /**
     * Create a new user.
     *
     * @param Request $request The HTTP request object.
     * @return UserResource
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'birthday' => 'required|date|date_format:Y-m-d|before:18 years ago',
        ]);

        $user = User::create([
            ...$validated,
            'role' => UserRole::CANDIDATE,
        ]);
        return new UserResource($user);
    }

    /**
     * Update the user with the specified ID.
     *
     * @param Request $request The HTTP request object.
     * @param int $id The ID of the user.
     * @return UserResource
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'firstname' => 'max:255',
            'lastname' => 'max:255',
            'email' => 'email|unique:users,email,' . $id,
            'birthday' => 'date|date_format:Y-m-d|before:18 years ago',
        ]);
        $user = User::find($id);
        $user->update($validated);
        return new UserResource($user);
    }

    /**
     * Delete the user with the specified ID.
     *
     * @param int $id The ID of the user.
     * @return UserResource
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(['data' => ['message' => 'User deleted']]);
    }

    /**
     * Add a mission to the user with the specified ID.
     *
     * @param int $userId The ID of the user.
     * @param int $missionId The ID of the mission.
     * @return UserResource
     */
    public function addMission($userId, $missionId)
    {
        $user = User::find($userId);
        if (!$user) {
            throw new UnprocessableEntityHttpException('User not found');
        }
        // Check if the mission exists
        if (!Mission::find($missionId)) {
            throw new UnprocessableEntityHttpException('Mission not found');
        }
        // Check if the user already has the mission
        if ($user->missions()->where('missions.id', $missionId)->exists()) {
            throw new BadRequestHttpException('User already has the mission');
        }

        $user->missions()->attach($missionId);
        return new UserResource($user);
    }

    /**
     * Remove a mission from the user with the specified ID.
     *
     * @param int $userId The ID of the user.
     * @param int $missionId The ID of the mission.
     * @return UserResource
     */
    public function removeMission($userId, $missionId)
    {
        $user = User::find($userId);
        if (!$user) {
            throw new UnprocessableEntityHttpException('User not found');
        }
        // Check if the mission exists
        if (!Mission::find($missionId)) {
            throw new UnprocessableEntityHttpException('Mission not found');
        }
        // Check if the user has the mission
        if (!$user->missions()->where('missions.id', $missionId)->exists()) {
            throw new BadRequestHttpException('User does not have the mission');
        }

        $user->missions()->detach($missionId);
        return new UserResource($user);
    }
}
