<?php

use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

Route::fallback(function () {
    if (request()->is('api/*')) {
        throw new NotFoundHttpException('Resource not found');
    }
    return view('app');
});
