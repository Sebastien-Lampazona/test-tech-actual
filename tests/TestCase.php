<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;

abstract class TestCase extends BaseTestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost:8000';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require Application::inferBasePath() . '/bootstrap/app.php';
        $app->loadEnvironmentFrom('.env.testing');
        $app->make(Kernel::class)->bootstrap();


        // Create the test database in database_path if not exists
        if (!file_exists(database_path('database.sqlite'))) {
            touch(database_path('database.sqlite'));
        }
        Artisan::call('db:wipe');
        Artisan::call('migrate:refresh --seed');
        return $app;
    }
}
