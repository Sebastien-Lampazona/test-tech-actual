<?php

namespace App\Http\Resources;

use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MissionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($mission) {
                return [
                    'id' => $mission->id,
                    'job_title' => $mission->job_title,
                    'start_date' => $mission->start_date,
                    'end_date' => $mission->end_date,
                    'nb_candidates' => $mission->candidates->count(),
                ];
            })->toArray(),
        ];
    }
}
