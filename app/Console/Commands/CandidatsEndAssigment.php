<?php

namespace App\Console\Commands;

use App\Models\Mission;
use App\Models\User;
use DateTime;
use Illuminate\Console\Command;

class CandidatsEndAssigment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:candidats-end-assigment {date? : The date to check for mission endings (format: Y-m-d). Defaults to today}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all candidates who have reached the end of their mission to the given date';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $date = new DateTime($this->argument('date') ?? 'today');
        $candidates = User::whereHas('missions', function ($query) use ($date) {
            $query->whereDate('end_date', $date->format('Y-m-d'));
        })
            ->with(['missions' => function ($query) use ($date) {
                $query
                    ->whereDate('start_date', '>=', $date->format('Y-m-d'))
                    ->orWhereDate('end_date', '=', $date->format('Y-m-d'))
                    ->orderBy('start_date', 'asc');
            }])->get();

        if ($candidates->isEmpty()) {
            $this->info('No candidates have reached the end of their mission to the given date.');
            return;
        }

        $this->info('Candidates who have reached the end of their mission to the given date:');
        $rows = [];
        foreach ($candidates as $candidate) {
            // Getting the current mission ending
            $endingMission = $candidate->missions->first(function ($mission) use ($date) {
                $missionEndDate = new DateTime($mission->end_date);
                return $missionEndDate->format('Y-m-d') == $date->format('Y-m-d');
            });
            // Getting the next mission
            $nextMission = $candidate->missions->first(function ($mission) use ($date) {
                $missionStartDate = new DateTime($mission->start_date);
                return $missionStartDate->format('Y-m-d') > $date->format('Y-m-d');
            });

            // Adding the candidate to the list
            $rows[] = [
                $candidate->firstname . ' ' . $candidate->lastname,
                $endingMission->job_title . ' from ' .
                date('d/m/Y', strtotime($endingMission->start_date) ) . ' to ' . date('d/m/Y', strtotime($endingMission->end_date)),
                $nextMission ? $nextMission->job_title . ' (' . date('d/m/Y', strtotime($nextMission->start_date)) . ' to ' . date('d/m/Y', strtotime($nextMission->end_date)) . ')' : 'N/A'
            ];
        }

        // Displaying the list
        $this->table(['Name', 'Current Mission Title and Dates', 'Upcoming Mission Title and Dates'], $rows);
    }
}
