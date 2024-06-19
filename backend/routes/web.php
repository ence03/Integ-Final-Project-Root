<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentDataController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/import', function () {
    return view('import');
})->name('import.view');

Route::post('/import', [StudentController::class, 'import'])->name('import');



Route::get('/students', [StudentDataController::class, 'index']);
