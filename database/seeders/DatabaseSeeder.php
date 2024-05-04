<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Mission;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Creating administrator
        User::factory()->administrator()->create();

        for ($i = 0; $i < 10; $i++) {
            User::factory()->create();
        }

        //Creating missions without candidate
        for ($i = 0; $i < 3; $i++) {
            Mission::factory()->create();
        }

        // Gettings all users
        $users = User::where('role', UserRole::CANDIDATE)->get();

        //Creating missions with candidates
        $nbMissionByCandidate = 1; // Fix to 1 for quickly prevent straddles
        for ($i = 0; $i < $nbMissionByCandidate; $i++) {
            $mission = Mission::factory()->create();
            $mission->candidates()->attach($users->random(3), [
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        //Creating missions without candidate
        for ($i = 0; $i < 3; $i++) {
            Mission::factory()->inFuture()->create();
        }
    }
}
