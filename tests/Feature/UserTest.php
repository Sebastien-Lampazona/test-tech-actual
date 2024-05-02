<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * Test case for testing the users list endpoint.
     */
    public function test_users_list(): void
    {
        $response = $this->get('/api/users');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'firstname',
                    'lastname',
                    'email',
                    'nb_missions',
                ],
            ]
        ]);

        $data = $response->json('data');
        foreach ($data as $user) {
            $this->assertIsInt($user['nb_missions']);
        }
    }

    /**
     * Test case for testing the user show endpoint.
     */
    public function test_user_show(): void
    {
        $response = $this->get('/api/users/1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'firstname',
                'lastname',
                'email',
                'birthday',
                'missions',
            ]
        ]);

        $data = $response->json('data');
        $this->assertIsArray($data['missions']);
    }

    /**
     * Test case for testing the user store endpoint.
     */
    public function test_user_store(): void
    {
        $userTest = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john.doe@example.fr',
            'birthday' => '1990-01-01',
        ];

        $response = $this->post('/api/users', $userTest);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'firstname',
                'lastname',
                'email',
                'birthday',
                'missions',
            ]
        ]);

        $data = $response->json('data');
        $this->assertIsArray($data['missions']);

        $this->assertDatabaseHas('users', [
            'id' => $data['id'],
            ...$userTest,
        ]);
    }

    /**
     * Test case for testing the user update endpoint.
     * In case of validation error
     */

    public function test_user_update_validation_error(): void
    {
        $userTest = [
            'firstname' => 'Jane',
            'lastname' => 'Tre',
            'email' => 'notanemailaddress',
            'birthday' => date('Y') . '-01-01',
        ];

        $response = $this->patch('/api/users/1', $userTest);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['birthday', 'email']);
    }

    /**
     * Test case for testing the user update endpoint.
     */
    public function test_user_update(): void
    {
        $userTest = [
            'firstname' => 'Jane',
            'lastname' => 'Tre',
            'email' => 'jane.tre@example.fr',
            'birthday' => '1991-01-01',
        ];

        $userBeforeUpdate = $this->get('/api/users/1')->json('data');

        $response = $this->patch('/api/users/1', $userTest);

        $response->assertStatus(200);

        $data = $response->json('data');
        $this->assertIsArray($data['missions']);

        $this->assertDatabaseMissing('users', [
            'id' => 1,
            ...$userBeforeUpdate,
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $data['id'],
            ...$userTest,
        ]);
    }

    /**
     * Test case for testing the user add mission endpoint.
     */
    public function test_user_add_mission(): void
    {
        $response = $this->put('/api/users/1/missions/1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'firstname',
                'lastname',
                'email',
                'birthday',
                'missions',
            ]
        ]);

        $data = $response->json('data');
        $this->assertIsArray($data['missions']);

        $this->assertDatabaseHas('mission_user', [
            'user_id' => 1,
            'mission_id' => 1,
        ]);

        $this->assertContains(1, array_column($data['missions'], 'id'));
    }

    /**
     * Test case for testing the user remove mission endpoint.
     */
    public function test_user_remove_mission(): void
    {
        // Adding a mission to the user before testing the remove mission endpoint
        $this->put('/api/users/1/missions/1');

        $response = $this->delete('/api/users/1/missions/1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'firstname',
                'lastname',
                'email',
                'birthday',
                'missions',
            ]
        ]);

        $data = $response->json('data');
        $this->assertIsArray($data['missions']);

        $this->assertDatabaseMissing('mission_user', [
            'user_id' => 1,
            'mission_id' => 1,
        ]);

        $this->assertNotContains(1, array_column($data['missions'], 'id'));
    }

    /**
     * Test case for testing the user delete endpoint.
     */
    public function test_user_delete(): void
    {
        $response = $this->delete('/api/users/1');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => 1]);
    }
}
