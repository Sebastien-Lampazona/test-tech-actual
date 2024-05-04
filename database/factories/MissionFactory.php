<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mission>
 */
class MissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'job_title' => fake()->sentence(3),
            'start_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'end_date' => fake()->dateTimeBetween('now', '+1 year'),
        ];
    }

        /**
     * Indicate that the model is an administrator.
     */
    public function inFuture(): static
    {
        return $this->state(fn (array $attributes) => [
            'job_title' => 'In future : ' . fake()->sentence(2),
            'start_date' => fake()->dateTimeBetween('+1 year', '+2 year'),
            'end_date' => fake()->dateTimeBetween('+2 year', '+3 year'),
        ]);
    }
}
