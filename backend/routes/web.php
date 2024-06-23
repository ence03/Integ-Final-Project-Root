<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentDataController;
use App\Http\Controllers\AdminEnrollmentController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/import', function () {
    return view('import');
})->name('import.view');

Route::post('/import', [StudentController::class, 'import'])->name('import');



Route::get('/students', [StudentDataController::class, 'index']);



Route::get('/enrollments/create', [AdminEnrollmentController::class, 'create'])->name('enrollments.create');
Route::post('/enrollments', [AdminEnrollmentController::class, 'store'])->name('enrollments.store');
